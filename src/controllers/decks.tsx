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
		async ({ session, params, query }) => {
			const deck = await findDeckById(params.id, query.page);
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
						<DeckItem id={deck.id} name={deck.name} cards={deck.cards} page={query.page ?? 1} />
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

			query: t.Object({
				page: t.Optional(t.Numeric({ minimum: 1 }))
			})
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
						<Layout username={session.user.username} due={due}>
							<CardAddForm deckId={deck.id} />
						</Layout>
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

				const card = await createCard(context.body.front, context.body.back, deck.id);

				return (
					<>
						<h1 class="font-semibold text-center">
							Congratulations! You did it!
						</h1>
						<p class="font-normal">Your card was succesfully added to{" "}
							<a href={`/decks/${card.deck.id}`} class="text-blue-500 border-b-2 border-blue-200 hover:border-blue-500">{card.deck.name}</a>.
						</p>

						<div class="m-auto mt-4 flex w-full justify-center gap-6">
							<a
								href={`/decks/${card.deck.id}`}
								class="border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
							>
								To the deck
							</a>

							<a
								href={`/decks/${deck.id}/add`}
								class="border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
							>
								Keep adding
							</a>
						</div>
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
							<h1 class="font-semibold text-center">
								Nice job!
							</h1>
							<p class="font-normal">You reviewed all due cards from{" "}
								<a href={`/decks/${deck.id}`} class="text-blue-500 border-b-2 border-blue-200 hover:border-blue-500">{deck.name}</a>{" "}for today.
							</p>

							<div class="m-auto mt-4 flex w-full justify-center gap-6">
								<a
									href={`/decks`}
									class="border-2 border-stone-500 rounded-md text-stone-500 px-1 hover:bg-stone-500 hover:text-white transition"
								>
									Take me back
								</a>
							</div>
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
