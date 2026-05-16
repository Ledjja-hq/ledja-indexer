# ledja-indexer
Stellar blockchain indexer for Ledja — reads and indexes on-chain data via Horizon and Soroban RPC for real-time SME financial analytics.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built on Stellar](https://img.shields.io/badge/Built%20on-Stellar-blueviolet)](https://stellar.org)

## Overview

ledja-indexer is the data layer of the Ledja platform. Rather than relying on a centralized backend, it reads directly from Stellar Horizon API and Soroban RPC to serve real-time financial data to the frontend. No centralized database, no single point of failure. All data is derived from the canonical on-chain state of the Stellar network.

## What It Indexes

- Invoice creation, payment, and settlement events from ledja-contracts
- - Payroll disbursement transactions and recipient confirmations
  - - Expense entries recorded on-chain
    - - Account balances and asset holdings for SME wallets
      - - Historical transaction feeds for financial reporting
       
        - ## Tech Stack
       
        - - Language: TypeScript / Node.js
          - - Stellar Horizon API for ledger and transaction data
            - - Soroban RPC for smart contract event streaming
              - - PostgreSQL for indexed data storage
                - - Redis for caching and real-time subscriptions
                  - - WebSockets for live data push to the frontend
                   
                    - ## Getting Started
                   
                    - ```bash
                      git clone https://github.com/Ledjja-hq/ledja-indexer.git
                      cd ledja-indexer
                      npm install
                      cp .env.example .env
                      npm run dev
                      ```

                      ## Environment Variables

                      STELLAR_NETWORK, HORIZON_URL, SOROBAN_RPC_URL, CONTRACT_INVOICE, DATABASE_URL, REDIS_URL

                      ## Ecosystem Fit and Monetization

                      The indexer bridges raw Stellar on-chain data with the Ledja dashboard, enabling real-time analytics, audit trails, and financial reporting for SMEs — features monetized through Ledja's premium subscription tiers. As an open-source reference implementation, it also contributes to the broader Stellar developer ecosystem.

                      ## Contributing

                      Good first issues include adding new event types, improving query performance, and writing tests. Check the issues tab for tasks labeled good first issue.

                      ## Related Repositories

                      - ledja-frontend: Web UI consuming this indexer
                      - - ledja-contracts: Soroban contracts whose events are indexed
                        - - ledja-sdk: TypeScript SDK wrapping indexer endpoints
                         
                          - ## License
                         
                          - MIT (c) Ledjja-hq
