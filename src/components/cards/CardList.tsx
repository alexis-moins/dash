import ICard from "#types/ICard";

interface IProps {
	cards: ICard[];
	deckId: number;
}

const CardList = ({ cards, deckId }: IProps) => (
	<section class="flex flex-col gap-10">
		{cards.length > 0 ? (
			<table class="table-auto border-spacing-2 border-spacing-x-6 border-collapse">
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cards.map((card) => (
						<tr class="hover:bg-slate-100 transition group/row">
							<td class="border-b-2 group-first/row:border-y-2 py-4 cursor-default pl-2 pr-4">
								{card.front}
							</td>
							<td class="border-b-2 group-first/row:border-y-2 py-4 cursor-default pr-4">
								{card.back}
							</td>
							<td class="border-b-2 group-first/row:border-y-2 py-4 pl-6 pr-2">
								<a href={`/decks/${card.id}`} class="w-fit m-auto group/link">
									<svg xmlns="http://www.w3.org/2000/svg" class="stroke-slate-500 h-6 icon icon-tabler icon-tabler-edit" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
										<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
										<path d="M16 5l3 3" />
									</svg>
								</a>
							</td>
							<td class="border-b-2 group-first/row:border-y-2 py-4 pr-2">
								<button hx-post={`/cards/${card.id}/delete/confirm`} class="w-fit m-auto">
									<svg
										class="stroke-red-500 h-6  icon icon-tabler icon-tabler-trash"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M4 7l16 0" />
										<path d="M10 11l0 6" />
										<path d="M14 11l0 6" />
										<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
										<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
									</svg>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		) : (
			<h1 class="text-center">Your decks is empty</h1>
		)}

		<div class="m-auto flex w-full justify-around">
			<a
				href="/decks"
				class="w-fit m-auto border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
			>
				Back
			</a>

			<a
				href={`/decks/${deckId}/add`}
				class="w-fit m-auto border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
			>
				Add
			</a>
		</div>
	</section>
);

export default CardList;