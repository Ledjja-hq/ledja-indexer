# ledja-indexer Architecture

This document describes the data flow from the Stellar blockchain through to the Ledja frontend dashboard. It is the canonical reference for all architectural decisions. Contributors making changes to how data moves between layers must update this document.

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

| Layer          | Responsibility |
|----------------|----------------|
| Listeners      | Connect to Soroban RPC, subscribe to contract events, forward raw events to processors |
| Processors     | Parse raw events, validate data, write to PostgreSQL, update Redis cache |
| DB (PostgreSQL) | Persistent storage of all indexed on-chain events |
| Cache (Redis)  | Fast reads for latest state, WebSocket broadcast data |
| API (WebSocket) | Real-time push of new events to connected frontend clients |

## Module Map

```
src/
├── index.ts                  # Bootstraps all listeners and the API server
├── config.ts                 # Loads and validates environment variables
├── horizon/
│   └── client.ts             # Stellar Horizon API client
├── listeners/
│   ├── invoiceListener.ts    # Soroban RPC subscription for invoice events
│   ├── payrollListener.ts    # Soroban RPC subscription for payroll events
│   └── expenseListener.ts    # Soroban RPC subscription for expense events
├── processors/
│   ├── invoiceProcessor.ts   # Parses + persists invoice events
│   ├── payrollProcessor.ts   # Parses + persists payroll events
│   └── expenseProcessor.ts   # Parses + persists expense events
├── db/
│   ├── client.ts             # PostgreSQL connection pool
│   └── schema.ts             # Table definitions (invoices, payroll_records, expenses)
├── cache/
│   └── client.ts             # Redis client
├── api/
│   └── server.ts             # WebSocket + REST server
└── types/
    └── index.ts              # Shared TypeScript types
```

## Environment Variables

| Variable           | Description |
|--------------------|-------------|
| `STELLAR_NETWORK`  | `testnet` or `mainnet` |
| `HORIZON_URL`      | Stellar Horizon API endpoint |
| `SOROBAN_RPC_URL`  | Soroban RPC endpoint for event streaming |
| `CONTRACT_INVOICE` | Deployed invoice contract ID |
| `CONTRACT_PAYROLL` | Deployed payroll contract ID |
| `CONTRACT_EXPENSE` | Deployed expense contract ID |
| `DATABASE_URL`     | PostgreSQL connection string |
| `REDIS_URL`        | Redis connection string |

## Design Principles

- **No centralized backend** — all data is derived from canonical on-chain state
- **Event-driven** — listeners react to contract events; no polling where avoidable
- **Separation of concerns** — listeners only forward events; processors own persistence logic
- **Real-time by default** — Redis and WebSockets ensure the frontend always reflects the latest chain state

## Related Issues

- #1 — Horizon API client (`src/horizon/client.ts`)
- #2 — Project folder structure
- #3 — This document (living reference)
