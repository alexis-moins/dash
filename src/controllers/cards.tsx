import { Elysia, t } from "elysia";
import { auth } from "~lucia";

import { findCardById } from "@database/cards";

const plugin = new Elysia({ prefix: "/cards" })

	.delete("/:id/delete/confirm", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			const card = await findCardById(context.params.id);

			if (!card) {
				return
			}

			if (card.deck.owner_id !== session.user.userId) {
				return
			}

			return (
				<>
				</>
			);
		}

		context.set.redirect = "/login";
	}, {
		params: t.Object({
			id: t.Numeric()
		})
	})

export default plugin;
