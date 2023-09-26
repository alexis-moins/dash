import ICard from "#types/ICard";

export default interface IDeck {
	id: number;
	name: string;
	cards: ICard[];
}

export type IDeckWithDue = IDeck & { _count: { cards: number } };
