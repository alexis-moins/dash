import { Elysia, t } from "elysia";

import isAuthenticated from "@plugins/isAuthenticated";
import { findCardById, removeCard, reviewCard } from "@database/cards";

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
					<p>This operation is irreversible. Do you want to continue?</p>

					<div class="m-auto mt-4 flex w-full justify-center gap-6">
						<a
							href={`/decks/${card.deck.id}`}
							class="border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
						>
							No
						</a>

						<button
							hx-delete={`/cards/${card.id}`}
							hx-target="#deck-item"
							class="border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
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

		return (
			<>
				<h1 class="text-xl mt-12">{card.back}</h1>

				<div class="m-auto flex w-full justify-center gap-6 absolute bottom-12">
					<button
						hx-post={`/cards/${card.id}/review`}
						hx-vals='{"grade": "NOTHING"}'
						class="w-fit border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
					>
						Nothing
					</button>

					<button
						hx-post={`/cards/${card.id}/review`}
						hx-vals='{"grade": "SOMETHING"}'
						class="w-fit border-2 border-orange-500 rounded-md text-orange-500 px-1 hover:bg-orange-500 hover:text-white transition"
					>
						Something
					</button>

					<a
						hx-post={`/cards/${card.id}/review`}
						hx-vals='{"grade": "HARD"}'
						class="w-fit border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
					>
						Hard
					</a>

					<a
						hx-post={`/cards/${card.id}/review`}
						hx-vals='{"grade": "GOOD"}'
						class="w-fit border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
					>
						Good
					</a>

					<a
						hx-post={`/cards/${card.id}/review`}
						hx-vals='{"grade": "EASY"}'
						class="w-fit border-2 border-purple-500 rounded-md text-purple-500 px-1 hover:bg-purple-500 hover:text-white transition"
					>
						Easy
					</a>
				</div>
			</>
		)
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
			grade: t.Union([t.Literal('NOTHING'), t.Literal('SOMETHING'), t.Literal('HARD'), t.Literal('GOOD'), t.Literal('EASY')])
		}),

		params: t.Object({
			id: t.Numeric({ minimum: 0 })
		})
	})

export default plugin;
