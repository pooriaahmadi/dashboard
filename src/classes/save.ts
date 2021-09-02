import { SaveInputModels, SaveModel } from "../types/Types";
import Main from "../databases/Main";
class Save implements SaveModel {
	id;
	content;
	media;
	title;
	constructor({ id, content, media, title }: SaveInputModels) {
		this.id = id;
		this.content = content;
		this.media = media;
		this.title = title;
	}
	updateContent = async (newContent: string) => {
		await Main.createQuery(
			Main.resolveUpdateValues({
				values: {
					content: newContent,
				},
				table: "saves",
			}) + `WHERE id=${this.id}`
		);
		this.content = newContent;
	};
	updateTitle = async (newTitle: string) => {
		await Main.createQuery(
			Main.resolveUpdateValues({
				values: {
					title: newTitle,
				},
				table: "saves",
			}) + `WHERE id=${this.id}`
		);
		this.content = newTitle;
	};
	updateMedia = async (newMedia: string) => {
		await Main.createQuery(
			Main.resolveUpdateValues({
				values: {
					media: newMedia,
				},
				table: "saves",
			}) + `WHERE id=${this.id}`
		);
		this.media = newMedia;
	};
	delete = async () => {
		await Main.createQuery(`DELETE FROM saves WHERE id=${this.id}`);
	};
}

export default Save;
