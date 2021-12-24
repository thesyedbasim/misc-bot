export class UserError extends Error {
	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, UserError.prototype);
	}
}
