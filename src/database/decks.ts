import { database } from "~lucia";

export const findDecksByOwnerId = async (id: string) => {
	return database.deck.findMany({
		where: { owner_id: id },
		include: { cards: true },
	});
};

export const createDeck = async (name: string, ownerId: string) => {
	return database.deck.create({
		data: { name, owner_id: ownerId }
	});
};
