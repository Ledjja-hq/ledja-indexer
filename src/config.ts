import dotenv from 'dotenv';
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

export const config = {
  stellarNetwork: requireEnv('STELLAR_NETWORK'),
  horizonUrl: requireEnv('HORIZON_URL'),
  sorobanRpcUrl: requireEnv('SOROBAN_RPC_URL'),
  contracts: {
    invoice: requireEnv('CONTRACT_INVOICE'),
    payroll: requireEnv('CONTRACT_PAYROLL'),
    expense: requireEnv('CONTRACT_EXPENSE'),
  },
  databaseUrl: requireEnv('DATABASE_URL'),
  redisUrl: requireEnv('REDIS_URL'),
};
