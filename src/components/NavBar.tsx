interface IProps {
	username?: string | null;
}

const NavBar = ({ username }: IProps) => (
	<nav class="flex justify-between py-4 px-4">
		<a
			href="/"
			class="transition border-b-2 hover:text-blue-500 hover:border-blue-500"
		>
			<h1>Todo</h1>
		</a>
		<div class="flex gap-4">
			{username ? (
				<>
					<p class="border-b-2 hover:text-blue-500 hover:border-blue-500">
						{username}
					</p>
					<a
						href="/logout"
						class="transition border-b-2 hover:text-blue-500 hover:border-blue-500"
					>
						Logout
					</a>
				</>
			) : (
				<>
					<a
						href="/login"
						class="transition border-b-2 hover:text-blue-500 hover:border-blue-500"
					>
						Login
					</a>
					<a
						href="/register"
						class="transition border-b-2 hover:text-blue-500 hover:border-blue-500"
					>
						Register
					</a>
				</>
			)}
		</div>
	</nav>
);

export default NavBar;
