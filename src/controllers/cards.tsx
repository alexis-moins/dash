import { Elysia, t } from "elysia";

import isAuthenticated from "@plugins/isAuthenticated";
import { findCardById, removeCard } from "@database/cards";

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
					<h1>
						You're about to remove a card from{" "}
						<span class="text-blue-500">{card.deck.name}</span>.
					</h1>
					<p>This operation is irreversible. Do you want to continue?</p>

					<div class="m-auto flex w-full justify-around">
						<a
							href={`/decks/${card.deck.id}`}
							class="w-fit m-auto border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
						>
							No
						</a>

						<button
							hx-delete={`/cards/${card.id}`}
							hx-target="#deck-item"
							class="w-fit m-auto border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
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
		async ({ session, params }) => {
			const card = await findCardById(params.id);

			if (!card) {
				return <strong>This card does not exist</strong>;
			}

			if (card.deck.owner_id !== session.user.userId) {
				return <strong>You are not the owner of the card</strong>;
			}

			await removeCard(card.id);

			return (
				<>
					<h1>The card has been deleted!</h1>
					<a href={`/decks/${card.deck.id}`}>Back</a>
				</>
			);
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
						// href={`/decks/${deckId}/edit`}
						class="w-fit border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
					>
						Hard
					</a>

					<a
						// href={`/decks/${deckId}/edit`}
						class="w-fit border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
					>
						Good
					</a>

					<a
						// href={`/decks/${deckId}/edit`}
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

		await reviewCard(card.id, body.grade)

		set.headers['HX-Redirect'] = `/decks/${card.deck.id}/review`
	}, {
		body: t.Object({
			grade: t.Union([t.Literal('NOTHING'), t.Literal('SOMETHING')])
		}),

		params: t.Object({
			id: t.Numeric({ minimum: 0 })
		})
	})

export default plugin;
