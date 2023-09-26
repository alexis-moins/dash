interface IProps {
	deckId: number;
}

const CardAddForm = ({ deckId }: IProps) => (
	<form
		hx-ext="response-targets"
		hx-target-4xx="#form-error"
		hx-target-5xx="#form-error"
		hx-post={`/decks/${deckId}/add`}
		class="w-64 m-auto flex flex-col gap-10"
	>
		<div class="flex flex-col gap-4">
			<label for="front" class="after:content-['_*'] after:text-pink-500">
				Front
			</label>
			<textarea
				name="front"
				id="front"
				cols="30"
				rows="1"
				required="yes"
				placeholder="Library"
				class="outline-0 border-b-2 focus:border-blue-500  transition"
			></textarea>
		</div>

		<div class="flex flex-col gap-4">
			<label for="back" class="after:content-['_*'] after:text-pink-500">
				Back
			</label>
			<textarea
				name="back"
				id="back"
				cols="30"
				rows="2"
				placeholder="A place people can borrow books from..."
				class="outline-0 border-b-2 focus:border-blue-500 transition"
			></textarea>
		</div>

		<div id="form-error" class="text-pink-500 text-md text-center"></div>

		<div class="flex w-full justify-center gap-6">
			<a
				href={`/decks/${deckId}`}
				class="w-fit border-2 border-stone-500 rounded-md text-stone-500 px-1 hover:bg-stone-500 hover:text-white transition"
			>
				Back
			</a>

			<button
				class="w-fit border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
				type="submit"
			>
				Add
			</button>
		</div>
	</form>
);

export default CardAddForm;
