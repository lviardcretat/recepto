import { getSequences } from '~/server/data/sequences';

export default defineEventHandler(async () => {
	const sequences = await getSequences();
	if (!sequences) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Sequences not found',
		});
	}
	return sequences;
});
