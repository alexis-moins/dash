import { Elysia, t } from "elysia";
import { auth } from "~lucia";

import { findCardById, removeCard } from "@database/cards";

const plugin = new Elysia({ prefix: "/cards" })

	.delete("/:id/confirm", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const card = await findCardById(context.params.id);

			if (!card) {
				return <strong>This card does not exist</strong>
			}

			if (card.deck.owner_id !== session.user.userId) {
				return <strong>You are not the owner of the card</strong>
			}

			return (
				<>
					<h1>You're about to remove a card from <span class="text-blue-500">{card.deck.name}</span>.</h1>
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
		}

		context.set.redirect = "/login";
	}, {
		params: t.Object({
			id: t.Numeric()
		})
	})

	.delete("/:id", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const card = await findCardById(context.params.id);

			if (!card) {
				return <strong>This card does not exist</strong>
			}

			if (card.deck.owner_id !== session.user.userId) {
				return <strong>You are not the owner of the card</strong>
			}

			await removeCard(card.id)

			return <>
				<h1>The card has been deleted!</h1>
				<a href={`/decks/${card.deck.id}`}>Back</a>
			</>
		}

		context.set.redirect = "/login";

	}, {
		params: t.Object({
			id: t.Numeric()
		})
	})
export default plugin;
