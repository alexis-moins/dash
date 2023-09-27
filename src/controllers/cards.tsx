import { Elysia, t } from "elysia";

import isAuthenticated from "@plugins/isAuthenticated";
import { findCardById, removeCard, reviewCard } from "@database/cards";
import CardReveal from "@components/cards/CardReveal";

const plugin = new Elysia({ prefix: "/cards" })
	.use(isAuthenticated)

	.delete(
		"/:id/confirm",
		async ({ session, params }) => {
			const card = await findCardById(params.id);

			if (!card) {
				return <strong>This card does not exist</strong>;
			}

			if (card.deck.owner_id !== session.user.userId) {
				return <strong>You are not the owner of the card</strong>;
			}

			return (
				<>
					<h1 class="font-semibold text-center">
						You're about to remove a card from{" "}
						<a href={`/decks/${card.deck.id}`} class="text-blue-500 border-b-2 border-blue-200 hover:border-blue-500">{card.deck.name}</a>.
					</h1>
					<p class="text-center">This operation is irreversible. Do you want to continue?</p>

					<div class="m-auto mt-4 flex w-full justify-center gap-6">
						<a
							href={`/decks/${card.deck.id}`}
							class="w-10 text-center border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
						>
							No
						</a>

						<button
							hx-delete={`/cards/${card.id}`}
							hx-target="#deck-item"
							class="w-10 text-center border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
						>
							Yes
						</button>
					</div>
				</>
			);
		},
		{
			params: t.Object({
				id: t.Numeric(),
			}),
		},
	)

	.delete(
		"/:id",
		async ({ session, params, set }) => {
			const card = await findCardById(params.id);

			if (!card) {
				return <strong>This card does not exist</strong>;
			}

			if (card.deck.owner_id !== session.user.userId) {
				return <strong>You are not the owner of the card</strong>;
			}

			await removeCard(card.id);
			set.headers["HX-Redirect"] = `/decks/${card.deck.id}`
		},
		{
			params: t.Object({
				id: t.Numeric(),
			}),
		},
	)

	.get("/:id/reveal", async ({ params }) => {
		const card = await findCardById(params.id)

		if (!card) {
			return
		}

		return <CardReveal card={card} />
	}, {
		params: t.Object({
			id: t.Numeric({ minimum: 0 })
		})
	})

	.post('/:id/review', async ({ params, set, body }) => {
		const card = await findCardById(params.id)

		if (!card) {
			return
		}

		await reviewCard(card, body.grade)

		set.headers['HX-Redirect'] = `/decks/${card.deck.id}/review`
	}, {
		body: t.Object({
			grade: t.Union([t.Literal('NOTHING'), t.Literal('HARD'), t.Literal('GOOD'), t.Literal('EASY')])
		}),

		params: t.Object({
			id: t.Numeric({ minimum: 0 })
		})
	})

export default plugin;
