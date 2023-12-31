import ICard from "#types/ICard";

interface IProps {
	cards: ICard[];
	deckId: number;
}

const CardList = ({ cards, deckId }: IProps) => (
	<section class="flex flex-col gap-10 ">
		{cards.length > 0 ? (
			<table class="table-fixed w-full border-t-2 border-collapse">
				<tbody class="cursor-default">
					{cards.map((card) => (
						<tr class="border-b-2 flex justify-between gap-4 hover:bg-slate-100 transition">
							<td class="pl-2 py-4 w-[30%] truncate">
								{card.front}
							</td>

							<td class="py-4 w-[30%] text-center truncate">
								{card.back}
							</td>

							<td class="pr-2 py-4 w-[30%] flex justify-end gap-4">
								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="stroke-blue-500 h-6 icon icon-tabler icon-tabler-edit"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
										<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
										<path d="M16 5l3 3" />
									</svg>
								</button>
								<button
									hx-delete={`/cards/${card.id}/confirm`}
									hx-target="#deck-item"
								>
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

		<div class="m-auto flex w-full justify-center gap-6">
			<a
				href="/decks"
				class="w-12 text-center border-2 border-stone-500 rounded-md text-stone-500 px-1 hover:bg-stone-500 hover:text-white transition"
			>
				Back
			</a>

			<a
				href={`/decks/${deckId}/edit`}
				class="w-12 text-center border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
			>
				Edit
			</a>
		</div>
	</section>
);

export default CardList;
