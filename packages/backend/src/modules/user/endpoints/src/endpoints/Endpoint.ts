import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import {
	Err,
	IActionResult,
	IHttpContext,
	IHttpRequest,
	Ok,
	Result,
} from 'yohira';

const ajv = new Ajv({
	coerceTypes: true,
	removeAdditional: 'all',
});

export abstract class Endpoint<TRequest, TResponse> {
	private readonly validate: ValidateFunction<TRequest>;

	private getOrAddSchema(
		schema: JSONSchemaType<TRequest>,
		keyRef: string,
	): ValidateFunction<TRequest> {
		// https://ajv.js.org/guide/managing-schemas.html#pre-adding-all-schemas-vs-adding-on-demand
		let validate: ValidateFunction<TRequest> | undefined;
		validate = ajv.getSchema(keyRef);
		if (validate === undefined) {
			ajv.addSchema(schema, keyRef);
			validate = ajv.getSchema(keyRef);
		}

		if (validate === undefined || validate.schema !== schema) {
			throw new Error(
				`Invalid schema. Expected: '${JSON.stringify(
					schema,
				)}', but got '${JSON.stringify(validate?.schema)}'.`,
			);
		}

		return validate;
	}

	protected constructor(schema: JSONSchemaType<TRequest>) {
		this.validate = this.getOrAddSchema(schema, this.constructor.name);
	}

	private parseJson(text: string): Result<unknown, SyntaxError> {
		try {
			return new Ok(JSON.parse(text));
		} catch (error) {
			if (error instanceof SyntaxError) {
				return new Err(error);
			} else {
				throw error;
			}
		}
	}

	parseHttpRequest(httpRequest: IHttpRequest): Result<TRequest, Error> {
		const text = ((): string => {
			switch (httpRequest.method.toUpperCase()) {
				case 'GET':
					return JSON.stringify(
						Object.fromEntries(
							new URLSearchParams(
								httpRequest.queryString.toString(),
							),
						),
					);

				case 'POST':
					return httpRequest.rawBody;

				default:
					// TODO
					return '';
			}
		})();

		return this.parseJson(text).andThen((json) => {
			if (this.validate(json)) {
				return new Ok(json);
			}
			return new Err(new Error() /* TODO */);
		});
	}

	abstract handle(
		httpContext: IHttpContext,
		request: TRequest,
	): Promise<Result<IActionResult, Error>>;
}
