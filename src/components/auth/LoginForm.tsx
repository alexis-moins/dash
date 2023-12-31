const LoginForm = () => (
	<form
		hx-ext="response-targets"
		hx-target-4xx="#form-error"
		hx-post="/login"
		class="w-64 m-auto flex flex-col gap-10"
	>
		<div class="flex flex-col gap-4">
			<label for="username">Username</label>
			<input
				id="username"
				class="peer border-b-2 outline-0 focus:border-blue-500 invalid:!border-pink-500 transition"
				type="text"
				name="username"
				autocomplete="username"
				maxlength="12"
				pattern="[a-zA-Z]{6,12}"
			/>
			<span class="hidden peer-invalid:block text-pink-500 text-sm">
				Your username must contain between 6 and 12 characters.
			</span>
		</div>

		<div class="flex flex-col gap-4">
			<label for="password">Password</label>
			<input
				id="password"
				type="password"
				name="password"
				class="peer border-b-2 outline-0 focus:border-blue-500 invalid:!border-pink-500 transition"
				autocomplete="current-password"
				maxlength="24"
				pattern="[a-zA-Z]{12,24}"
			/>
			<span class="hidden peer-invalid:block text-pink-500 text-sm">
				Your password must contains only letters, between 12 and 24 characters.
			</span>
		</div>

		<div id="form-error" class="text-pink-500 text-md text-center"></div>

		<button
			class="w-fit m-auto border-2 border-blue-500 rounded-md text-blue-500 px-1 hover:bg-blue-500 hover:text-white transition"
			type="submit"
		>
			Login
		</button>
	</form>
);

export default LoginForm;
