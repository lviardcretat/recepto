import type { PrismaClient, User } from '@prisma/client';

async function generateUser(id: number, email: string, password: string, firstname: string, lastname: string, picture: string, recipeCreatedNumber: number, role: string, prismaClient: PrismaClient): Promise<User> {
	return await prismaClient.user.upsert({
		where: { id: id },
		update: {},
		create: {
			email: email,
			password: password,
			firstname: firstname,
			lastname: lastname,
			picture: picture,
			recipeCreatedNumber: recipeCreatedNumber,
			role: role,
		},
	});
}

export async function seed_user(prismaClient: PrismaClient): Promise<void> {
	await generateUser(1, 'test@test.com', '1234', 'jean', 'claude', 'photo', 10, 'default', prismaClient);
}
