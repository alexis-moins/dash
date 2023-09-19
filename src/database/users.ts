import { database } from "~lucia";

export const findUserById = async (id: string) => {
	return database.user.findUnique({
		where: { id },
	});
};
