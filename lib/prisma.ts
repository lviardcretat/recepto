import { PrismaClient } from '@prisma/client'
import pg from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in environment variables')
}

// Création d'un pool PostgreSQL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

// Déclaration du type global pour éviter la recréation en développement
declare const globalThis: {
  prismaGlobal?: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Utilisation du singleton en développement, nouvelle instance en production
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}
