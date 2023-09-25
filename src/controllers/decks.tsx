import { Elysia, t } from "elysia";
import { auth } from "~lucia";

import { createCard, getNumberOfDue, findDueCardsByDeckId, findCardById } from "@database/cards";
import { createDeck, findDeckById, findDecksByOwnerId } from "@database/decks";

import Main from "@components/Main";
import DeckList from "@components/decks/DeckList";
import NavBar from "@components/NavBar";
import DeckAddForm from "@components/decks/DeckAddForm";
import DeckItem from "@components/decks/DeckItem";
import CardAddForm from "@components/cards/CardAddForm";
import DeckEditForm from "@components/decks/DeckEditForm";
import CardReviewFront from "@components/cards/CardReviewFront";
import Layout from "@components/Layout";
import { Optional } from "@sinclair/typebox";
import CardReviewBack from "@components/cards/CardReviewBack";

const plugin = new Elysia({ prefix: "/decks" })

	.get("/", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const decks = await findDecksByOwnerId(session.user.userId);
			const due = decks.map((deck) => deck._count.cards).reduce((a, b) => a + b)

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />
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
			const due = await getNumberOfDue(session.user.userId)

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />
					<DeckAddForm />
				</Main>
			);
		}

		context.set.redirect = "/login";
	})

	.get("/:id/edit", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const deck = await findDeckById(context.params.id)
			const due = await getNumberOfDue(session.user.userId)

			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				)
			}

			if (deck.owner_id === session.user.userId) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<DeckEditForm id={deck.id} name={deck.name} visibility={deck.visibility} />
					</Main>
				)
			}

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />
					<h1>Oh no! You're not allowed to see this deck :(</h1>
				</Main>
			)
		}

		context.set.redirect = "/login";
	}, {
		params: t.Object({
			id: t.Numeric()
		})
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
			const due = await getNumberOfDue(session.user.userId)

			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				)
			}

			if (deck.owner_id === session.user.userId) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<DeckItem id={deck.id} name={deck.name} cards={deck.cards} />
					</Main>
				)
			}

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />
					<h1>Oh no! You're not allowed to see this deck :(</h1>
				</Main>
			)
		}

		context.set.redirect = '/login'
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
			const due = await getNumberOfDue(session.user.userId)

			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				)
			}

			if (deck.owner_id === session.user.userId) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />

						<CardAddForm deckId={deck.id} />
					</Main>
				)
			}

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />

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
		})

	.get("/:id/review", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const deck = await findDeckById(context.params.id)
			const due = await getNumberOfDue(session.user.userId)

			if (context.query.card) {
				const card = await findCardById(context.query.card)

				if (!card) {
					return (
						<Main>
							<NavBar username={session.user.username} due={due} />
							<h1>Oh no! This deck does not exist :(</h1>
						</Main>
					)
				}

				if (card.deck.owner_id === session.user.userId) {
					return (
						<Layout username={session.user.username} due={due} >
							<CardReviewBack id={card.id} front={card.front} back={card.back} deckId={card.deck.id} deckName={card.deck.name} />
						</Layout>
					)
				}
			}



			if (!deck) {
				return (
					<Main>
						<NavBar username={session.user.username} due={due} />
						<h1>Oh no! This deck does not exist :(</h1>
					</Main>
				)
			}

			if (deck.owner_id === session.user.userId) {
				const dueCards = await findDueCardsByDeckId(deck.id)

				if (dueCards.length === 0) {
					return (
						<Layout username={session.user.username} due={due}>
							<h1>Congratulations!</h1>

							<p>You reviewed all due cards from <span class="text-blue-500">{deck.name}</span> for today.</p>
						</Layout>
					)
				}

				const card = dueCards[0]

				return (
					<Layout username={session.user.username} due={due} >
						<CardReviewFront id={card.id} front={card.front} back={card.back} deckId={card.deck.id} deckName={card.deck.name} />
					</Layout>
				)
			}

			return (
				<Main>
					<NavBar username={session.user.username} due={due} />

					<h1>Oh no! You're not allowed to review this deck :(</h1>
				</Main>

			)
		}
	}
		, {
			params: t.Object({
				id: t.Numeric()
			}),

			query: t.Object({
				card: t.Optional(t.Numeric({ minimum: 0 }))
			})
		})

export default plugin;
