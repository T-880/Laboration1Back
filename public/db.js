// Importera mysql2-modulen för att arbeta med MySQL-databaser i Node.js
const mysql = require('mysql2');

// Skapa en databasanslutning med en anslutningspool för att hantera flera samtidiga anslutningar
const pool = mysql.createPool({
  host: 'localhost',  // Anslut till databasservern på localhost 
  user: 'root',       // Standardanvändare för MySQL/MariaDB, vanligtvis "root"
  password: '',       // Lämna tomt om du inte har ett lösenord 
  database: 'cv',     // Namnet på databasen vi ska ansluta till 
});

// Exportera poolen som en promise-baserad API för att hantera asynkrona databasoperationer
module.exports = pool.promise();