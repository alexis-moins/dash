import Elysia from "elysia";
import { auth } from "~lucia";

const plugin = new Elysia()

	.derive(async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			return { session };
		}
	})

export default plugin;
