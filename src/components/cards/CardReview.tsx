interface IProps {
	id: number;
	front: string;

	deckName: string;
	deckId: number;
}

const CardReview = ({ id, front, deckName, deckId }: IProps) => (
	<div class="flex flex-col jutify-center items-center">
		<a href={`/decks/${deckId}`}>
			<h4 class="text-stone-400 border-b-2 border-stone-200 mb-2 hover:border-stone-400">{deckName}</h4>
		</a>
		<h1 class="text-xl">{front}</h1>

		<div id="controls" class="m-auto flex w-full justify-center gap-6 absolute bottom-12">
			<button
				hx-swap="outerHTML"
				hx-target="#controls"

				hx-get={`/cards/${id}/reveal`}
				class="w-fit border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
			>
				Show answer
			</button>
		</div>
	</div>
);

export default CardReview;
