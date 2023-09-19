import ICard from "#types/ICard";

export default interface IDeck {
	id: number;
	name: string;
	cards: ICard[];
}
