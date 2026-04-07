// Ladda moduler som behövs för att köra applikationen
const express = require('express');  // Express-modul för att skapa webbtjänsten
const mysql = require('mysql2');    // MySQL-modul för att kommunicera med databasen
const bodyParser = require('body-parser');  // Modul för att hantera formulärdata
const dotenv = require('dotenv');  // Modul för att hantera miljövariabler
const path = require('path');  // Modul för att hantera filvägar

// Läs miljövariabler från .env-fil för säker hantering av databasuppgifter
dotenv.config();

// Skapa Express-applikationen
const app = express();  // Initiera Express
const PORT = 3000;  // Definiera portnummer för servern

// Ställ in EJS som view engine för att kunna rendera dynamiska sidor
app.set('view engine', 'ejs');  // Använd EJS för att rendera HTML från mallar
app.set('views', path.join(__dirname, 'views'));  // Ställ in sökvägen för vyerna (EJS-filer)

// Middleware för att läsa formulärdata från POST-begäran
app.use(bodyParser.urlencoded({ extended: false }));  // Middleware för att läsa URL-kodad data (som formulärdata)
app.use(express.static(path.join(__dirname, 'public'))); // Middleware för att hantera statiska filer som CSS

// Skapa en anslutning till databasen med hjälp av miljövariabler för säkerhet
const db = mysql.createPool({
    host: process.env.DB_HOST,  // Databasvärd
    user: process.env.DB_USER,  // Databas-användare
    password: process.env.DB_PASS,  // Databas-lösenord
    database: process.env.DB_NAME,  // Databasnamn
    port: process.env.DB_PORT  // Databasport
});

// Testa anslutningen till databasen
db.getConnection((err, connection) => {
    if (err) {
        console.error('Fel vid anslutning till databasen:', err);  // Logga fel om anslutningen misslyckas
    } else {
        console.log('Ansluten till databasen!');  // Bekräfta att anslutningen lyckades
        connection.release();  // Frigör anslutningen tillbaka till poolen
    }
});

// Funktion som kontrollerar om kurser finns i databasen, och om inte, lägger till standardkurser
const checkAndAddCourses = () => {
    const sql = 'SELECT COUNT(*) AS count FROM courses';  // SQL-fråga för att hämta antal kurser i databasen
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Fel vid kontroll av kurser:', err);  // Logga fel om SQL-frågan misslyckas
            return;
        }

        const count = results[0].count;  // Hämta antalet kurser

        if (count === 0) {  // Om inga kurser finns i databasen
            console.log('Inga kurser i databasen.');

            // Lägg till två standardkurser
            const courses = [
                ['DT207G', 'Backend-baserad webbutveckling', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/', 'B'],
                ['DT208G', 'Programmering i TypeScript', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/', 'B']
            ];

            // För varje kurs, kör en SQL-insert för att lägga till kursen
            courses.forEach(course => {
                const sqlInsert = 'INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)';
                db.query(sqlInsert, course, (err, result) => {
                    if (err) {
                        console.error('Fel vid läggande av kurs:', err);  // Logga fel vid insert
                    } else {
                        console.log('Kurs tillagd:', course);  // Bekräfta att kursen lades till
                    }
                });
            });
        } else {
            console.log(`Det finns redan ${count} kurser i databasen.`);  // Om det redan finns kurser, logga antal
        }
    });
};

// Anropa funktionen för att kontrollera och lägga till kurser när servern startar
checkAndAddCourses();

// Hämta och visar alla kurser från databasen
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM courses ORDER BY created_at DESC';  // Hämta alla kurser, sorterade efter skapelsedatum
    db.query(sql, (err, results) => {
        if (err) {
            return res.send('Fel vid hämtning av kurser: ' + err);  // Skicka ett felmeddelande om det inte går att hämta kurserna
        }
        res.render('index', { courses: results });  // Rendera index.ejs med de hämtade kurserna
    });
});

// Rutt för att visa formulär för att lägga till ny kurs
app.get('/add-course', (req, res) => {
    res.render('add-course', { error: null });  // Visa add-course.ejs utan felmeddelande
});

// Rutt för att ta emot formulärdata när en kurs läggs till
app.post('/add-course', (req, res) => {
    const { coursecode, coursename, syllabus, progression } = req.body;

    // Validering av formulärdata för att kontrollera att alla fält är ifyllda
    if (!coursecode || !coursename || !syllabus || !progression) {
        return res.render('add-course', { error: 'Alla fält måste fyllas i!' });  // Om något fält saknas, visa felmeddelande
    }

    // SQL-fråga för att lägga till kursen i databasen
    const sql = 'INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)';
    db.query(sql, [coursecode, coursename, syllabus, progression], (err, result) => {
        if (err) {
            return res.render('add-course', { error: 'Fel vid sparande i databasen: ' + err });  // Visa felmeddelande om insert misslyckas
        }
        res.redirect('/');  // Om kursen lades till, omdirigera till startsidan
    });
});

// Rutt för att ta bort en kurs
app.get('/delete/:id', (req, res) => {
    const sql = 'DELETE FROM courses WHERE id = ?';  // SQL-fråga för att ta bort kursen med angivet id
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.send('Fel vid radering: ' + err);  // Visa felmeddelande om radering misslyckas
        }
        res.redirect('/');  // Omdirigera till startsidan efter radering
    });
});

// Visa information om applikationen
app.get('/about', (req, res) => {
    res.render('about');  // Rendera about.ejs
});

// Starta servern och lyssna på port 3000
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);  // Logga när servern startat och är tillgänglig på den angivna porten
});