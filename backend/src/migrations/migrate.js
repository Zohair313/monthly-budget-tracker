const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ Error: DATABASE_URL is not defined in .env file.');
    console.log('Please provide a valid Neon PostgreSQL connection string:');
    console.log('Example: DATABASE_URL="postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require"');
    process.exit(1);
  }

  console.log('🚀 Connecting to Neon PostgreSQL...');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const sqlPath = path.join(__dirname, '001_initial_schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📜 Executing migration: 001_initial_schema.sql');
    await pool.query(sql);

    console.log('✅ Migration executed successfully!');
    console.log('Tables created: users, incomes, expenses, indices and constraints.');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  runMigration();
}

module.exports = runMigration;
