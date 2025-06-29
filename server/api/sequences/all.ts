import { getSequences } from '~/server/data/sequences';
import type { Sequence } from '~/server/utils/drizzleUtils';

export default defineEventHandler(async () => {
	const sequences: Sequence[] = await getSequences();
	if (!sequences) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Sequences not found',
		});
	}
	return sequences;
});
