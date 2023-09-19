import IDeck from "#types/IDeck";

interface IProps {
	decks: IDeck[];
}

const DeckList = ({ decks }: IProps) => (
	<section class="m-auto w-fit flex flex-col gap-4">
		{decks.length > 0 ? (
			<table class="table-auto border-spacing-2 border-collapse">
				<thead>
					<tr>
						<th class="w-24"></th>
						<th class="w-24"></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{decks.map((deck) => (
						<tr class="hover:bg-slate-100 transition group/row">
							<td class="border-b-2 group-first/row:border-y-2 py-4 cursor-default pl-2">
								{deck.name}
							</td>
							<td class="border-b-2 group-first/row:border-y-2 py-4 cursor-default">
								{deck.cards.length} cards
							</td>
							<td class="border-b-2 group-first/row:border-y-2 py-4 pr-2">
								<a href={`/decks/${deck.id}`} class="w-fit m-auto">
									<button class="border-2 border-blue-500 rounded-md leading-6 text-blue-500 px-2 text-center hover:bg-blue-500 hover:text-white transition">
										See
									</button>
								</a>
							</td>
							<td class="border-b-2 group-first/row:border-y-2 py-4 pr-2">
								<a href={`/decks/${deck.id}`} class="w-fit m-auto">
									<button class="group/button border-2 border-red-500 rounded-md px-2 text-center hover:bg-red-500 hover:text-white transition" >
										<svg class="transition group-hover/button:stroke-white stroke-red-500 h-6 icon icon-tabler icon-tabler-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
		<a href="/decks/add" class="w-fit m-auto">
			<button class="border-2 border-green-500 rounded-md text-green-500 px-2 text-center hover:bg-green-500 hover:text-white transition">
				Add
			</button>
		</a>
	</section>
);

export default DeckList;
