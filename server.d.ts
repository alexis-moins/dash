declare namespace Lucia {
	type Auth = import("./src/lucia.ts").Auth;
	type DatabaseUserAttributes = {
		username: string;
	};
	type DatabaseSessionAttributes = {};
}
