interface IProps {
	id: number
	front: string
	back: string

	deckName: string
	deckId: number
}

const CardReviewFront = ({ id, front, deckName, deckId }: IProps) => (
	<div class="flex flex-col jutify-center items-center">

		<h4 class="text-stone-400">{deckName}</h4>
		<h1 class="text-xl">{front}</h1>

		<div class="m-auto flex w-full justify-center gap-6 absolute bottom-12">
			<a
				href={`/decks/${deckId}/review?card=${id}`}
				class="w-fit border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
			>
				Show answer
			</a>
		</div>
	</div>
)

export default CardReviewFront
