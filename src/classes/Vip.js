class Vip {
	constructor({ id, start, end }) {
		this.id = id;
		this.start = new Date(start);
		this.end = new Date(end);
	}
	isExpired = () => {
		const currentDate = new Date();
		if (currentDate > this.end) {
			return true;
		}
		return false;
	};
}
module.exports = Vip;
