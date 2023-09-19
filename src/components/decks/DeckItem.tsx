import IDeck from "#types/IDeck"
import CardList from "@components/cards/CardList"

const DeckItem = ({ id, name, cards }: IDeck) => (
	<section class="m-auto w-fit flex flex-col gap-4">

		<div class="w-full flex justify-between">
			<h1 class="font-semibold">{name}</h1>

			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-blue-500 h-6 icon icon-tabler icon-tabler-edit" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
				<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
				<path d="M16 5l3 3" />
			</svg>
		</div>

		<CardList deckId={id} cards={cards} />
	</section>
)

export default DeckItem
