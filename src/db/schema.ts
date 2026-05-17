export const schema = `
  CREATE TABLE IF NOT EXISTS invoices (
    id BIGINT PRIMARY KEY,
    seller VARCHAR(64) NOT NULL,
    buyer VARCHAR(64) NOT NULL,
    amount NUMERIC NOT NULL,
    due_date BIGINT NOT NULL,
    status VARCHAR(16) NOT NULL,
    tx_hash VARCHAR(128),
    indexed_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS payroll_records (
    id SERIAL PRIMARY KEY,
    recipient VARCHAR(64) NOT NULL,
    amount NUMERIC NOT NULL,
    frequency_days INT NOT NULL,
    last_paid BIGINT,
    tx_hash VARCHAR(128),
    indexed_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS expenses (
    id BIGINT PRIMARY KEY,
    submitter VARCHAR(64) NOT NULL,
    amount NUMERIC NOT NULL,
    category VARCHAR(64) NOT NULL,
    timestamp BIGINT NOT NULL,
    linked_invoice_id BIGINT,
    tx_hash VARCHAR(128),
    indexed_at TIMESTAMP DEFAULT NOW()
  );
`;
