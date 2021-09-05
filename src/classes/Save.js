const Main = require("../databases/Main");
class Save {
	constructor({ id, content, media, title }) {
		this.id = id;
		this.content = content;
		this.media = media;
		this.title = title;
	}
	updateContent = async (newContent) => {
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
	updateTitle = async (newTitle) => {
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
	updateMedia = async (newMedia) => {
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

module.exports = Save;
