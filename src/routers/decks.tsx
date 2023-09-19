import { Elysia, t } from "elysia";
import { auth } from "~lucia";

import { createDeck, findDecksByOwnerId } from "@database/decks";

import Main from "@components/Main";
import DeckList from "@components/decks/DeckList";
import NavBar from "@components/NavBar";
import DeckForm from "@components/decks/DeckForm";

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
	});
export default plugin;
