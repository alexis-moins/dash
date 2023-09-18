import { Elysia, t } from "elysia";
import { auth } from "~lucia";

import Main from "@components/Main";
import NavBar from "@components/NavBar";
import LoginForm from "@components/auth/LoginForm";

const plugin = new Elysia()
	.get("/login", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (!session) {
			return <Main>
				<NavBar />
				<LoginForm />
			</Main>;
		}

		context.set.redirect = '/'
	})

	.post('/login', async (context) => {
		const key = await auth.useKey("username", context.body.username, context.body.password);
		const session = await auth.createSession({ userId: key.userId, attributes: {} });

		const handler = auth.handleRequest(context);
		handler.setSession(session);
	}, {
		body: t.Object({
			username: t.String({ minLength: 6, maxLength: 24 }),
			password: t.String({ minLength: 12, maxLength: 24 })
		})
	});

export default plugin;
