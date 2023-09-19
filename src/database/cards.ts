import { database } from "~lucia";

export const createCard = async (front: string, back: string, deckId: number) => {
	return database.card.create({
		data: { front, back, deck_id: deckId }
	});
};
