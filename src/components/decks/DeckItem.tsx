import ICard from "#types/ICard";
import CardList from "@components/cards/CardList";

interface IProps {
	id: number
	name: string
	cards: ICard[]
	page: number
}

const DeckItem = ({ id, name, cards, page }: IProps) => (
	<section id="deck-item" class="flex flex-col gap-4 m-auto w-[48rem]">
		<div class="w-full flex justify-between pr-2">
			<h1 class="font-semibold">{name}</h1>

			<a
				href={`/decks/${id}/add`}
				class="w-fit border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
			>
				Add
			</a>
		</div>

		<CardList deckId={id} cards={cards} />

		{page > 1 ? <a href={`/decks/${id}?page=${page - 1}`}>&larr;</a> : null}
	</section>
);

export default DeckItem;
