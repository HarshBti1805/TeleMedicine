require("dotenv").config();
const { Client } = require("pg");

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL environment variable is not set");
  console.log(
    "Please make sure you have a .env file with DATABASE_URL defined"
  );
  process.exit(1);
}

// Log connection info (masked for security)
const url = process.env.DATABASE_URL;
const maskedUrl = url.replace(/:([^:@]+)@/, ":****@"); // Mask password
console.log("Attempting to connect to:", maskedUrl);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client
  .connect()
  .then(() => {
    console.log("Connected Successfully");
    return client.query("SELECT NOW()");
  })
  .then((result) => {
    console.log("Database time:", result.rows[0].now);
  })
  .catch((err) => {
    console.error("Connection Error:", err.message);
    if (err.message.includes("password")) {
      console.error("\nTip: Make sure your DATABASE_URL includes a password.");
      console.error(
        "Format: postgresql://username:password@host:port/database"
      );
    }
  })
  .finally(() => client.end());
