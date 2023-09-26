import { IDeckWithDue } from "#types/IDeck";

interface IProps {
	decks: IDeckWithDue[];
}

const DeckList = ({ decks }: IProps) => (
	<section class="m-auto w-fit flex flex-col gap-4">
		<div class="flex flex-row justify-between">
			<h1 class="font-semibold">Decks</h1>
			<a href="/decks/add" class="w-fit">
				<button class="border-2 border-green-500 rounded-md text-green-500 px-2 text-center hover:bg-green-500 hover:text-white transition">
					Add
				</button>
			</a>
		</div>

		{decks.length > 0 ? (
			<table class="table-auto border-spacing-2 border-collapse">
				<thead>
					<tr>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{decks.map((deck) => (
						<tr class="hover:bg-slate-100 transition group/row">
							<td class="border-b-2 group-first/row:border-y-2 py-4 cursor-default pl-2 pr-6">
								{deck.name}
							</td>
							<td class="border-b-2 group-first/row:border-y-2 py-4 cursor-default text-center pr-8">
								{deck.cards.length} cards
							</td>

							<td class="border-b-2 text-green-500 group-first/row:border-y-2 py-4 cursor-default text-center pr-4">
								<a
									class="border-b-[1px] border-green-500"
									href={`/decks/${deck.id}/review`}
								>
									{deck._count.cards} due
								</a>
							</td>

							<td class="border-b-2 group-first/row:border-y-2 py-4 pr-2">
								<a href={`/decks/${deck.id}`} class="w-fit m-auto group/link">
									<button class="leading-6 text-blue-500 px-2 text-center transition">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="stroke-blue-500 h-6 icon icon-tabler icon-tabler-cards"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z" />
											<path d="M15 4h1a1 1 0 0 1 1 1v3.5" />
											<path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374" />
										</svg>
									</button>
								</a>
							</td>

							<td class="border-b-2 group-first/row:border-y-2 py-4 pr-2">
								<a href={`/decks/${deck.id}`} class="w-fit m-auto">
									<button class="px-2 text-center">
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
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		) : (
			<h1>Your collection of decks is empty</h1>
		)}
	</section>
);

export default DeckList;
