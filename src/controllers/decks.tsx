import { Elysia, t } from "elysia";
import { auth } from "~lucia";

import { createDeck, findDeckById, findDecksByOwnerId } from "@database/decks";
import { createCard, getNumberOfDue, findDueCardsByDeckId, } from "@database/cards";

import isAuthenticated from "@plugins/isAuthenticated";

import Main from "@components/Main";
import DeckList from "@components/decks/DeckList";
import NavBar from "@components/NavBar";
import DeckAddForm from "@components/decks/DeckAddForm";
import DeckItem from "@components/decks/DeckItem";
import CardAddForm from "@components/cards/CardAddForm";
import DeckEditForm from "@components/decks/DeckEditForm";
import CardReview from "@components/cards/CardReview";
import Layout from "@components/Layout";

const plugin = new Elysia({ prefix: "/decks" })
	.use(isAuthenticated)

	.get("/", async ({ session }) => {
		const decks = await findDecksByOwnerId(session.user.userId);
		const due = await getNumberOfDue(session.user.userId)

		return (
			<Layout username={session.user.username} due={due}>
				<DeckList decks={decks} />
			</Layout>
		);
	})

	.get("/add", async ({ session }) => {
		const due = await getNumberOfDue(session.user.userId);

		return (
			<Layout username={session.user.username} due={due}>
				<DeckAddForm />
			</Layout>
		);
	})

	.get(
		"/:id/edit",
		async ({ session, params }) => {
			const deck = await findDeckById(params.id);
			const due = await getNumberOfDue(session.user.userId);

			if (!deck) {
				return (
					<Layout username={session.user.username} due={due}>
						<h1>Oh no! This deck does not exist :(</h1>
					</Layout>
				);
			}

			if (deck.owner_id === session.user.userId) {
				return (
					<Layout username={session.user.username} due={due}>
						<DeckEditForm
							id={deck.id}
							name={deck.name}
							visibility={deck.visibility}
						/>
					</Layout>
				);
			}

			return (
				<Layout username={session.user.username} due={due}>
					<h1>Oh no! You're not allowed to see this deck :(</h1>
				</Layout>
			);
		},
		{
			params: t.Object({
				id: t.Numeric(),
			}),
		},
	)

	.post(
		"/add",
		async ({ session, body }) => {
			await createDeck(body.name, session.user.userId);

			return (
				<>
					<p>
						Congrats! <span class="text-blue-500">{body.name}</span> has been
						added to your collection!
					</p>
					<a href="/decks">Go back</a>
				</>
			);
		},
		{
			body: t.Object({
				name: t.String({ minLength: 1, maxLength: 24 }),
			}),
		},
	)

	.get(
		"/:id",
		async ({ session, params }) => {
			const deck = await findDeckById(params.id);
			const due = await getNumberOfDue(session.user.userId);

			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				);
			}

			if (deck.owner_id === session.user.userId) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<DeckItem id={deck.id} name={deck.name} cards={deck.cards} />
					</Main>
				);
			}

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />
					<h1>Oh no! You're not allowed to see this deck :(</h1>
				</Main>
			);
		},
		{
			params: t.Object({
				id: t.Numeric(),
			}),
		},
	)

	.get(
		"/:id/add",
		async (context) => {
			const handler = auth.handleRequest(context);
			const session = await handler.validate();

			if (session) {
				const deck = await findDeckById(context.params.id);
				const due = await getNumberOfDue(session.user.userId);

				if (!deck) {
					return (
						<Main>
							<NavBar username={session.user.username} due={due} />
							<h1>Oh no! This deck does not exist :(</h1>
						</Main>
					);
				}

				if (deck.owner_id === session.user.userId) {
					return (
						<Main>
							<NavBar username={session.user.username} due={due} />

							<CardAddForm deckId={deck.id} />
						</Main>
					);
				}

				return (
					<Main>
						<NavBar username={session.user.username} due={due} />

						<h1>Oh no! You're not allowed to see this deck :(</h1>
					</Main>
				);
			}
		},
		{
			params: t.Object({
				id: t.Numeric(),
			}),
		},
	)

	.post(
		"/:id/add",
		async (context) => {
			const handler = auth.handleRequest(context);
			const session = await handler.validate();

			if (session) {
				const deck = await findDeckById(context.params.id);

				if (!deck) {
					context.set.status = 404;
					return <p>The card could not be added. Has the deck been removed?</p>;
				}

				if (deck.owner_id !== session.user.userId) {
					context.set.status = 401;
					return (
						<p>The deck you're trying to add to does not belong to you!</p>
					);
				}

				await createCard(context.body.front, context.body.back, deck.id);

				return (
					<>
						<p>
							Your card was added to{" "}
							<span class="text-blue-500">{deck.name}</span>
						</p>
						<a href={`/decks/${deck.id}`}>Back to the deck</a>
						<a href={`/decks/${deck.id}/add`}>Keep adding cards</a>
					</>
				);
			}
		},
		{
			body: t.Object({
				front: t.String(),
				back: t.String(),
			}),

			params: t.Object({
				id: t.Numeric(),
			}),
		},
	)

	.get(
		"/:id/review",
		async ({ session, params }) => {
			const deck = await findDeckById(params.id);
			const due = await getNumberOfDue(session.user.userId);

			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				);
			}

			if (deck.owner_id === session.user.userId) {
				const dueCards = await findDueCardsByDeckId(deck.id, 1);

				console.log(dueCards)

				if (dueCards.length === 0) {
					return (
						<Layout username={session.user.username} due={due}>
							<h1>Congratulations!</h1>

							<p>
								You reviewed all due cards from{" "}
								<span class="text-blue-500">{deck.name}</span> for today.
							</p>
						</Layout>
					);
				}

				const card = dueCards[0];

				return (
					<Layout username={session.user.username} due={due}>
						<CardReview
							id={card.id}
							front={card.front}
							deckId={card.deck.id}
							deckName={card.deck.name}
						/>
					</Layout>
				);
			}

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />

					<h1>Oh no! You're not allowed to review this deck :(</h1>
				</Main>
			);
		},
		{
			params: t.Object({
				id: t.Numeric(),
			}),
		},
	);

export default plugin;
