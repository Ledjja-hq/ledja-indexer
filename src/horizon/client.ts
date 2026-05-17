import { Horizon } from '@stellar/stellar-sdk';

const HORIZON_URL = process.env.HORIZON_URL ?? 'https://horizon-testnet.stellar.org';

const server = new Horizon.Server(HORIZON_URL);

export async function getAccountTransactions(address: string): Promise<Horizon.ServerApi.TransactionRecord[]> {
  const page = await server.transactions().forAccount(address).call();
  return page.records;
}

export async function getLatestLedger(): Promise<number> {
  const ledger = await server.ledgers().order('desc').limit(1).call();
  return ledger.records[0].sequence;
}

export default server;
