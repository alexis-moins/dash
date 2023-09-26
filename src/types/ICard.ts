export default interface ICard {
	id: number;
	front: string;
	back: string;
	retention_level: number
	due_at: Date
}
