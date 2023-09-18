import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import authRouter from "@routes/auth";

const app = new Elysia()
	.use(html())
	.use(authRouter)

	.get("/", () => "Hello Elysia");

app.listen(3000, ({ hostname, port }) =>
	console.log(`🦊 Elysia is running at ${hostname}:${port}`),
);
