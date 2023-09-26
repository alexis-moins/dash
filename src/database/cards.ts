import { database } from "~lucia";

export const createCard = async (
	front: string,
	back: string,
	deckId: number,
) => {
	return database.card.create({
		data: { front, back, deck_id: deckId },
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
		where: { deck_id: deckId },
		include: { deck: true },
		take: take
	});
};

const RETENTION_TABLE = [
	{ grade: '' }
]

export const reviewCard = async (cardId: number, grade: string) => {
	return await database.card.update({
		where: { id: cardId }, data: {
			retention_level: 1,
			due_at: 
		}
	})
}
