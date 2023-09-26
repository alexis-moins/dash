const DeckAddForm = () => (
	<form
		hx-ext="response-targets"
		hx-target-4xx="#form-error"
		hx-target-5xx="#form-error"
		hx-post="/decks/add"
		class="w-64 m-auto flex flex-col gap-10"
	>
		<div class="flex flex-col gap-4">
			<label for="name" class="after:content-['_*'] after:text-pink-500">
				Name
			</label>
			<input
				id="name"
				class="peer border-b-2 outline-0 focus:border-blue-500 invalid:!border-pink-500 transition"
				type="text"
				name="name"
				autocomplete="off"
				maxlength="24"
				pattern="[a-zA-Z0-9 #-]{1,24}"
				placeholder="Svenska"
			/>
			<span class="hidden peer-invalid:block text-red-500 text-sm">
				Your deck name must contain between 1 and 24 characters / digits.
			</span>
		</div>

		<div id="form-error" class="text-pink-500 text-md text-center"></div>

		<div class="m-auto flex w-full justify-center gap-6">
			<a
				href="/decks"
				class="w-fit border-2 border-stone-500 rounded-md text-stone-500 px-1 hover:bg-stone-500 hover:text-white transition"
				type="button"
			>
				Cancel
			</a>

			<button
				class="w-fit border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
				type="submit"
			>
				Create
			</button>
		</div>
	</form>
);

export default DeckAddForm;
