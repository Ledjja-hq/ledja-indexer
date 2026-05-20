// Subscribes to invoice contract events via Soroban RPC

export class InvoiceListener {
  private readonly rpcUrl: string;
  private readonly contractId: string;

  constructor(rpcUrl: string, contractId: string) {
    this.rpcUrl = rpcUrl;
    this.contractId = contractId;
  }

  async start(onEvent: (event: unknown) => void): Promise<void> {
    // Connect to Soroban RPC
    // Subscribe to contract events for this.contractId
    // Call onEvent(event) for each received event
    console.log(`InvoiceListener started for contract ${this.contractId}`);
  }
}
