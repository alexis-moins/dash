import { database } from "~lucia";

export const findDecksByOwnerId = async (id: string) => {
	return database.deck.findMany({
		where: { owner_id: id },
		include: {
			cards: true,
			_count: {
				select: {
					cards: {
						where: {
							due_at: {
								lte: new Date(),
							},
						},
					},
				},
			},
		},
	});
};

export const createDeck = async (name: string, ownerId: string) => {
	return database.deck.create({
		data: { name, owner_id: ownerId },
	});
};

const CARDS_PER_PAGE = 8

export const findDeckById = async (id: number, page?: number) => {
	const take = CARDS_PER_PAGE
	const skip = page ? (page - 1) * take : 0

	return database.deck.findUnique({
		where: { id },
		include: { cards: { take, skip } },
	});
};
