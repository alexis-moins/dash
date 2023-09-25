interface IProps {
	due?: number
	username?: string;
}

const NavBar = ({ due, username }: IProps) => (
	<nav class="flex justify-between py-4 px-4 mb-24">
		<div class="flex gap-4">
			<a
				href="/decks"
				class="group transition border-b-2 hover:text-blue-500 hover:border-blue-500"
				
			>
				<h1>Decks{due && <> (<span class="text-green-500 group-hover:text-blue-500">{due}</span>)</>}</h1>
			</a>
		</div>

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
