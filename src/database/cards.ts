import { database } from "~lucia";

export const createCard = async (front: string, back: string, deckId: number) => {
	return database.card.create({
		data: { front, back, deck_id: deckId }
	});
};

export const findCardById = async (id: number) => {
	return database.card.findUnique({
		where: { id }, include: { deck: true }
	});
};

export const removeCard = async (cardId: number) => {
	return database.card.delete({
		where: { id: cardId } 
	});
};
