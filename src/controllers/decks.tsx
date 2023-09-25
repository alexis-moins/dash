import { Elysia, t } from "elysia";
import { auth } from "~lucia";

import { createDeck, findDeckById, findDecksByOwnerId } from "@database/decks";

import Main from "@components/Main";
import DeckList from "@components/decks/DeckList";
import NavBar from "@components/NavBar";
import DeckForm from "@components/decks/DeckForm";
import DeckItem from "@components/decks/DeckItem";
import CardForm from "@components/cards/CardForm";
import { createCard } from "@database/cards";

const plugin = new Elysia({ prefix: "/decks" })

	.get("/", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const decks = await findDecksByOwnerId(session.user.userId);

			return (
				<Main>
					<NavBar username={session.user.username} />
					<DeckList decks={decks} />
				</Main>
			);
		}

		context.set.redirect = "/login";
	})

	.get("/add", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {

			return (
				<Main>
					<NavBar username={session.user.username} />
					<DeckForm />
				</Main>
			);
		}

		context.set.redirect = "/login";
	})

	.post("/add", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			await createDeck(context.body.name, session.user.userId)

			return (
				<>
					<p>Congrats! <span class="text-blue-500">{context.body.name}</span> has been added to your collection!</p>
					<a href="/decks">Go back</a>
				</>
			)
		}

		context.set.redirect = "/login";
	}, {
		body: t.Object({
			name: t.String({ minLength: 1, maxLength: 24 })
		})
	})

	.get("/:id", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const deck = await findDeckById(context.params.id)

			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				)
			}

			if (deck.owner_id === session.user.userId) {
				return (
					<Main>
						<NavBar username={session.user.username} />
						<DeckItem id={deck.id} name={deck.name} cards={deck.cards} />
					</Main>
				)
			}

			return (
				<Main>
					<NavBar username={session.user.username} />

					<h1>Oh no! You're not allowed to see this deck :(</h1>
				</Main>

			)
		}
	}, {
		params: t.Object({
			id: t.Numeric()
		})
	})

	.get("/:id/add", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const deck = await findDeckById(context.params.id)

			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				)
			}

			if (deck.owner_id === session.user.userId) {
				return (
					<Main>
						<NavBar username={session.user.username} />

						<CardForm deckId={deck.id} />
					</Main>
				)
			}

			return (
				<Main>
					<NavBar username={session.user.username} />

					<h1>Oh no! You're not allowed to see this deck :(</h1>
				</Main>

			)
		}
	}
		, {
			params: t.Object({
				id: t.Numeric()
			})
		})

	.post("/:id/add", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const deck = await findDeckById(context.params.id)

			if (!deck) {
				context.set.status = 404
				return <p>The card could not be added. Has the deck been removed?</p>
			}

			if (deck.owner_id !== session.user.userId) {
				context.set.status = 401
				return <p>The deck you're trying to add to does not belong to you!</p>
			}

			await createCard(context.body.front, context.body.back, deck.id)

			return (
				<>
					<p>Your card was added to <span class="text-blue-500">{deck.name}</span></p>
					<a href={`/decks/${deck.id}`}>Back to the deck</a>
					<a href={`/decks/${deck.id}/add`}>Keep adding cards</a>
				</>
			)
		}
	}
		, {
			body: t.Object({
				front: t.String(),
				back: t.String()
			}),

			params: t.Object({
				id: t.Numeric()
			})
		});

export default plugin;
