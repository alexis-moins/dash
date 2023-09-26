import { Visibility } from "@prisma/client";

interface IProps {
	id: number;
	name: string;
	visibility: Visibility;
}

const DeckEditForm = ({ id, name, visibility }: IProps) => (
	<form
		hx-ext="response-targets"
		hx-target-4xx="#form-error"
		hx-target-5xx="#form-error"
		hx-put={`/decks/${id}`}
		class="w-64 m-auto flex flex-col gap-10"
	>
		<div class="flex flex-col gap-4">
			<label for="name">Name</label>
			<input
				id="name"
				class="peer border-b-2 outline-0 focus:border-blue-500 invalid:!border-pink-500 transition"
				type="text"
				name="name"
				autocomplete="off"
				maxlength="24"
				pattern="[a-zA-Z0-9 #-]{1,24}"
				placeholder={name}
				value={name}
			/>
			<span class="hidden peer-invalid:block text-pink-500 text-sm">
				Your deck name must contain between 1 and 24 characters / digits.
			</span>
		</div>

		<div class="flex flex-col gap-4 accent-blue-500">
			<label for="visibility">Visibility</label>

			<div class="flex justify-around">
				<div class="flex gap-2">
					<input
						type="radio"
						id="visibility-private"
						name="visibility"
						value="private"
						checked={visibility === "PRIVATE"}
					/>
					<label for="visibility-private">Private</label>
				</div>

				<div class="flex gap-2">
					<input
						type="radio"
						id="visibility-public"
						name="visibility"
						value="public"
						checked={visibility === "PUBLIC"}
					/>
					<label for="visibility-public">Public</label>
				</div>
			</div>
		</div>

		<div id="form-error" class="text-pink-500 text-md text-center"></div>

		<div class="m-auto flex w-full justify-center gap-6">
			<a
				href={`/decks/${id}`}
				class="w-fit border-2 border-stone-500 rounded-md text-stone-500 px-1 hover:bg-stone-500 hover:text-white transition"
				type="button"
			>
				Cancel
			</a>

			<button
				class="w-fit border-2 border-red-500 rounded-md text-red-500 px-1 hover:bg-red-500 hover:text-white transition"
				type="button"
			>
				Delete
			</button>
		</div>

		<button
			class="w-fit m-auto border-2 border-green-500 rounded-md text-green-500 px-1 hover:bg-green-500 hover:text-white transition"
			type="submit"
		>
			Save
		</button>
	</form>
);

export default DeckEditForm;
