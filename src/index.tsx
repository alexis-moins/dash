import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import { auth } from "~lucia";

import authRouter from "@routers/auth";
import decksRouter from "@routers/decks";

import Main from "@components/Main";
import NavBar from "@components/NavBar";

const app = new Elysia()
	.use(html())

	.use(authRouter)
	.use(decksRouter)

	.get("/", async (context) => {
		const handler = auth.handleRequest(context);
		const session = await handler.validate();

		if (session) {
			return (
				<Main>
					<NavBar username={session?.user.username} />

					{session && (
						<section class="flex gap-10 m-auto w-fit">
							<div class="flex flex-row gap-1 items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="icon icon-tabler icon-tabler-book-2"
									width="32"
									height="32"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="#3B82F6"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
									<path d="M19 16h-12a2 2 0 0 0 -2 2" />
									<path d="M9 8h6" />
								</svg>
								<a
									href="/decks"
									class="transition border-b-2 hover:text-blue-500 hover:border-blue-500"
								>
									Browse your decks
								</a>
							</div>
						</section>
					)}
				</Main>
			);
		}

		context.set.redirect = '/login'
	});

app.listen(3000, ({ hostname, port }) =>
	console.log(`🦊 Elysia is running at ${hostname}:${port}`),
);
