import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";

import { PrismaClient } from "@prisma/client";
import { elysia } from "lucia/middleware";

export const database = new PrismaClient();

export const auth = lucia({
	env: "DEV",
	adapter: prisma(database),
	middleware: elysia(),

	getUserAttributes: (user) => ({
		username: user.username,
	}),
});

export type Auth = typeof auth;
