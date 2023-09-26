import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import auth from "@controllers/auth";
import decks from "@controllers/decks";
import cards from "@controllers/cards";

new Elysia()
	.use(html())

	.use(auth)
	.use(decks)
	.use(cards)

	.get("/", async ({ set }) => (set.redirect = "/decks"))

	.listen(3000, ({ hostname, port }) =>
		console.log(`🦊 Elysia is running at ${hostname}:${port}`),
	);
