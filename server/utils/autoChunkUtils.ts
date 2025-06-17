const D1_MAX_PARAMETERS = 100;

// Cloudflare supports max 100 parameters in a query
export default async function <
	T extends Record<string, unknown> | string | number,
	U,
>(
	{
		items,
		otherParametersCount = 0,
	}: {
		items: T[];
		otherParametersCount?: number;
	},
	cb: (chunk: T[]) => Promise<U>,
) {
	const chunks: T[][] = [];

	let chunk: T[] = [];
	let chunkParameters = 0;

	if (otherParametersCount > D1_MAX_PARAMETERS) {
		throw new Error(
			`otherParametersCount cannot be more than ${D1_MAX_PARAMETERS}`,
		);
	}

	for (const item of items) {
		const itemParameters = Object.keys(item).length;

		if (itemParameters > D1_MAX_PARAMETERS) {
			throw new Error(`Item has too many parameters (${itemParameters})`);
		}

		if (
			chunkParameters + itemParameters + otherParametersCount >
			D1_MAX_PARAMETERS
		) {
			chunks.push(chunk);
			chunkParameters = itemParameters;
			chunk = [item];

			continue;
		}

		chunk.push(item);
		chunkParameters += itemParameters;
	}

	if (chunk.length) {
		chunks.push(chunk);
	}

	const results: U[] = [];

	for (let i = 0; i < chunks.length; i++) {
		const result = await cb(chunks[i]);
		results.push(result);
	}

	return results.flat();
};
