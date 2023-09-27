import { database } from "~lucia"

await database.grade.createMany({
	data: [
		{ name: "NOTHING", retention_delta: -2 },
		{ name: "HARD", retention_delta: -1 },
		{ name: "GOOD", retention_delta: 1 },
		{ name: "EASY", retention_delta: 2 },
	],

	skipDuplicates: true
})

await database.retentionLevel.createMany({
	data: [
		{ level: 0, minutes_delta: 0 },
		{ level: 1, minutes_delta: 15 },
		{ level: 2, minutes_delta: 60 },
		{ level: 3, minutes_delta: 1440 },
		{ level: 4, minutes_delta: 2880 },
	],

	skipDuplicates: true
})
