import html from "@kitajs/html";

import Main from "./Main";
import NavBar from "./NavBar";

interface IProps {
	username?: string
	due?: number
}

const Layout = ({ username, due, children }: html.PropsWithChildren<IProps>) => (
	<Main>
		<NavBar username={username} due={due} />

		<section id="container" class="m-auto w-fit flex flex-col gap-4">{children}</section>
	</Main>
);

export default Layout;
