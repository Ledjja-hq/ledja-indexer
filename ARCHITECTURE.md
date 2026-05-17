# ledja-indexer Architecture

This document describes the high-level architecture of `ledja-indexer` — how events flow from the Stellar blockchain through to the frontend dashboard. It is the reference for all architectural decisions and should be updated whenever the data flow changes.

## Data Flow

```
Stellar Network (Soroban RPC / Horizon)
         │
         ▼
   Event Listeners
   ├── InvoiceListener
   ├── PayrollListener
   └── ExpenseListener
         │
         ▼
   Event Processors
   ├── InvoiceProcessor  ──► PostgreSQL (invoices table)
   ├── PayrollProcessor  ──► PostgreSQL (payroll_records table)
   └── ExpenseProcessor  ──► PostgreSQL (expenses table)
         │
         ▼
   Redis Cache (latest state, fast reads)
         │
         ▼
   WebSocket Server ──► ledja-frontend (real-time push)
```

## Layer Responsibilities

| Layer | Responsibility |
|-------|---------------|
| **Listeners** | Connect to Soroban RPC, subscribe to contract events, forward raw events to processors |
| **Processors** | Parse raw events, validate data, write to PostgreSQL, update Redis cache |
| **DB (PostgreSQL)** | Persistent storage of all indexed on-chain events |
| **Cache (Redis)** | Fast reads for latest state, WebSocket broadcast data |
| **API (WebSocket)** | Real-time push of new events to connected frontend clients |

## Directory Structure

```
src/
├── config.ts            # Environment variable loading and validation
├── index.ts             # Entry point — wires all layers together
├── listeners/
│   ├── invoiceListener.ts
│   ├── payrollListener.ts
│   └── expenseListener.ts
├── processors/
│   ├── invoiceProcessor.ts
│   ├── payrollProcessor.ts
│   └── expenseProcessor.ts
├── db/
│   ├── client.ts        # PostgreSQL connection
│   └── schema.ts        # Table definitions and migrations
├── cache/
│   └── client.ts        # Redis connection
├── api/
│   └── server.ts        # WebSocket server
├── horizon/
│   └── client.ts        # Horizon API client
└── types/
    └── index.ts         # Shared TypeScript types
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `STELLAR_NETWORK` | `testnet` or `mainnet` |
| `HORIZON_URL` | Stellar Horizon API endpoint |
| `SOROBAN_RPC_URL` | Soroban RPC endpoint for event streaming |
| `CONTRACT_INVOICE` | Deployed invoice contract ID |
| `CONTRACT_PAYROLL` | Deployed payroll contract ID |
| `CONTRACT_EXPENSE` | Deployed expense contract ID |
| `DATABASE_URL` | PostgreSQL connection string |
| `REDIS_URL` | Redis connection string |

## Design Principles

- **Fail fast**: Missing environment variables cause an immediate startup error with a clear message.
- **No central backend**: All data is derived from canonical on-chain state — no proprietary data store.
- **Real-time first**: Redis and WebSockets ensure the frontend always reflects the latest chain state.
- **Separation of concerns**: Listeners only ingest; processors own all business logic and persistence.

## Related Repositories

- [ledja-frontend](https://github.com/Ledjja-hq/ledja-frontend) — Web UI consuming this indexer
- [ledja-contracts](https://github.com/Ledjja-hq/ledja-contracts) — Soroban contracts whose events are indexed
- [ledja-sdk](https://github.com/Ledjja-hq/ledja-sdk) — TypeScript SDK wrapping indexer endpoints
