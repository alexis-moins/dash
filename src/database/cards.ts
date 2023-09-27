import { database } from "~lucia";

import { DateTime } from "luxon"

import { Card, Grades } from "@prisma/client";

export const createCard = async (
	front: string,
	back: string,
	deckId: number,
) => {
	return database.card.create({
		data: { front, back, deck_id: deckId },
		include: { deck: true }
	});
};

export const findCardById = async (id: number) => {
	return database.card.findUnique({
		where: { id },
		include: { deck: true },
	});
};

export const removeCard = async (cardId: number) => {
	return database.card.delete({
		where: { id: cardId },
	});
};

export const getNumberOfDue = async (userId: string) => {
	return database.card.count({
		where: {
			AND: [
				{
					due_at: {
						lte: new Date(),
					},
				},
				{
					deck: {
						owner_id: userId,
					},
				},
			],
		},
	});
};

export const findDueCardsByDeckId = async (deckId: number, take?: number) => {
	return database.card.findMany({
		where: {
			deck_id: deckId,
			due_at: {
				lte: new Date()
			}
		},
		include: { deck: true },
		take: take
	});
};

export const reviewCard = async (card: Card, grade: Grades) => {
	const G = await database.grade.findUnique({
		where: { name: grade }
	})

	if (!G) {
		throw new Error("zkjznekjcz")
	}

	const retentions = await database.retentionLevel.findMany()
	const newRetentionLevel = Math.min(retentions.length - 1, Math.max(card.retention_level + G.retention_delta, 0))

	console.log()
	console.log(G)
	console.log(retentions)

	const newDueDate = DateTime.utc().plus({ minutes: retentions[newRetentionLevel].minutes_delta }).toJSDate()

	return await database.card.update({
		where: { id: card.id }, data: {
			retention_level: newRetentionLevel,
			due_at: newDueDate
		}
	})
}
