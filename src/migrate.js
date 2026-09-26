const fs = require("fs");
const path = require("path");
const pool = require("./db");
const migrationsPath = path.join(__dirname, "migrations");

const files = fs.readdirSync(migrationsPath);
const filteredFiles = files.filter((file) => file.endsWith(".sql"));
filteredFiles.sort();
async function migrate() {
  const result = await pool.query(
    "SELECT migration_name FROM schema_migrations",
  );
  const appliedMigrations = result.rows.map((row) => row.migration_name);
  const pendingMigrations = filteredFiles.filter(
    (file) => !appliedMigrations.includes(file),
  );
  for (const file of pendingMigrations) {
    const filePath = path.join(migrationsPath, file);
    const sql = fs.readFileSync(filePath, "utf-8");
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (migration_name) VALUES ($1)",
        [file],
      );
      await client.query("COMMIT");
    } catch (error) {
      console.error(error);
      if (client) {
        await client.query("ROLLBACK");
      }
    } finally {
      await client.release();
    }
  }
}
migrate();
