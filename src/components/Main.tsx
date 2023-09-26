import html from "@kitajs/html";

const Main = ({ children }: html.PropsWithChildren) => (
	<html>
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Dash</title>

			<script src="https://cdn.tailwindcss.com"></script>

			<script
				src="https://unpkg.com/htmx.org@1.9.5"
				integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
				crossorigin="anonymous"
			></script>

			<script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
		</head>

		<body class="h-screen relative">{children}</body>
	</html>
);

export default Main;
