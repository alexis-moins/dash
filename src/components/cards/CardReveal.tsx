import { Card } from "@prisma/client"

interface IProps {
	card: Card
}

const CardReveal = ({ card }: IProps) => (
	<>
		<h1 class="text-xl mt-12">{card.back}</h1>

		<div class="m-auto flex w-full justify-center gap-6 absolute bottom-12">
			<button
				hx-post={`/cards/${card.id}/review`}
				hx-vals='{"grade": "NOTHING"}'
				class="w-20 text-center border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
			>
				Nothing
			</button>

			<button
				hx-post={`/cards/${card.id}/review`}
				hx-vals='{"grade": "HARD"}'
				class="w-20 text-center border-2 border-orange-500 rounded-md text-orange-500 px-1 hover:bg-orange-500 hover:text-white transition"
			>
				Hard
			</button>

			<button
				hx-post={`/cards/${card.id}/review`}
				hx-vals='{"grade": "GOOD"}'
				class="w-20 border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
			>
				Good
			</button>

			<button
				hx-post={`/cards/${card.id}/review`}
				hx-vals='{"grade": "EASY"}'
				class="w-20 border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
			>
				Easy
			</button>

		</div>
	</>
)

export default CardReveal
