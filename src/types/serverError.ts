export class ServerError extends Error {
	constructor(public message: string) {
		super(message);

		Object.setPrototypeOf(this, ServerError.prototype);
	}
}
