import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";

import { PrismaClient } from "@prisma/client/edge";
import { elysia } from "lucia/middleware";

export const database = new PrismaClient();

export const auth = lucia({
	env: "DEV",
	adapter: prisma(database),
	middleware: elysia(),
});

export type Auth = typeof auth;
