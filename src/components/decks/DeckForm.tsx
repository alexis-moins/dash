const DeckForm = () => (
	<form
		hx-ext="response-targets"
		hx-target-4xx="#form-error"
		hx-target-5xx="#form-error"

		hx-post="/decks/add"
		class="w-64 m-auto flex flex-col gap-10"
	>
		<div class="flex flex-col gap-4">
			<label for="username">Name</label>
			<input
				id="name"
				class="peer border-b-2 outline-0 focus:border-blue-500 invalid:!border-pink-500 transition"
				type="text"
				name="name"
				autocomplete="off"
				maxlength="24"
				pattern="[a-zA-Z0-9 #-]{1,24}"
				placeholder="English 101"
			/>
			<span class="hidden peer-invalid:block text-pink-500 text-sm">
				Your deck name must contain between 1 and 24 characters / digits.
			</span>
		</div>

		<div id="form-error" class="text-pink-500 text-md text-center"></div>

		<button
			class="w-fit m-auto border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
			type="submit"
		>
			Let's go!
		</button>
	</form>
);

export default DeckForm;
