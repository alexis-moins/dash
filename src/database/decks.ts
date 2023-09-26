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

export const findDeckById = async (id: number) => {
	return database.deck.findUnique({
		where: { id },
		include: { cards: true },
	});
};
