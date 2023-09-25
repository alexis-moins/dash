import IDeck from "#types/IDeck"
import CardList from "@components/cards/CardList"

const DeckItem = ({ id, name, cards }: IDeck) => (
	<section id="deck-item" class="m-auto w-fit flex flex-col gap-4">

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
	</section>
)

export default DeckItem
