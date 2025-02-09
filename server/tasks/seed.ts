export default defineTask({
	meta: {
		name: 'db:seed',
		description: 'Run database seed task',
	},
	async run() {
		console.log('Running DB seed task...');
		const user = [
			{
				firstname: 'John',
				lastname: 'Doe',
				email: 'john@example.com',
				password: 'password123',
				avatar: 'https://example.com/avatar/john.png',
				role: 'admin',
			},
			{
				firstname: 'Jane',
				lastname: 'Doe',
				email: 'jane@example.com',
				password: 'password123',
				avatar: 'https://example.com/avatar/jane.png',
				role: 'admin',
			},
		];
		await useDrizzle().insert(tables.user).values(user);
		return { result: 'success' };
	},
});
