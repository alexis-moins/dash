interface IProps {
	id: number
	front: string
	back: string

	deckName: string
	deckId: number
}

const CardReviewBack = ({ id, front, back, deckName, deckId }: IProps) => (
	<div class="flex flex-col jutify-center items-center">

		<h4 class="text-stone-400">{deckName}</h4>
		<h1 class="text-xl">{front}</h1>


		<h1 class="text-xl mt-12">{back}</h1>

		<div class="m-auto flex w-full justify-center gap-6 absolute bottom-12">
			<a
				href="/decks"
				class="w-fit border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
			>
				Nothing
			</a>

			<button
				hx-put={`/cards/${id}/something`}
				class="w-fit border-2 border-orange-500 rounded-md text-orange-500 px-1 hover:bg-orange-500 hover:text-white transition"
			>
				Something
			</button>

			<a
				// href={`/decks/${deckId}/edit`}
				class="w-fit border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
			>
				Hard
			</a>

			<a
				// href={`/decks/${deckId}/edit`}
				class="w-fit border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
			>
				Good
			</a>

			<a
				// href={`/decks/${deckId}/edit`}
				class="w-fit border-2 border-purple-500 rounded-md text-purple-500 px-1 hover:bg-purple-500 hover:text-white transition"
			>
				Easy
			</a>
		</div>
	</div>
)

export default CardReviewBack
