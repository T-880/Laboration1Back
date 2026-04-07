# Databasbaserat CV med Node.js och Express

## Beskrivning

Det här projektet är en webbapplikation som låter användare lagra och visa kurser de har läst. Applikationen är byggd med Node.js och Express för serverhantering och använder en relationsdatabas för att lagra kursinformation. Användare kan lägga till nya kurser via ett formulär, se de kurser som lagts till och ta bort kurser om de så önskar.

Projektet följer uppgiften för att skapa en webbaserad applikation där data lagras i en databas och visas för användare, samt validering av användarinmatningar.

## Funktioner

- **Visa alla kurser:** En sida som listar alla lagrade kurser från databasen, där varje kurs visar kurskod, kursnamn, kursplan och progression.
- **Lägg till ny kurs:** Ett formulär för att lägga till en ny kurs i databasen med kurskod, kursnamn, kursplan och progression.
- **Radera kurs:** Möjlighet att ta bort en kurs från databasen.
- **Validering:** Formulärdata valideras på serversidan för att säkerställa att alla fält är korrekt ifyllda innan de sparas i databasen.
- **Responsiv design:** Webbapplikationen är designad för att vara användarvänlig på både stora och små skärmar.

## Teknologier

- **Node.js**: Serverplattformen för att skapa webbapplikationen.
- **Express**: Webbapplikationsramverk för Node.js som hanterar routing och middleware.
- **MySQL**: Relationsdatabas för att lagra kursdata.
- **EJS (Embedded JavaScript)**: View engine för att rendera dynamiskt innehåll i HTML-format.
- **HTML, CSS**: Används för att skapa och styla webbsidornas layout och design.
- **JavaScript**: För logik i både server- och klientsidan.

## Funktionalitet

### Startsida
På startsidan visas alla kurser som lagrats i databasen. Varje kurs presenteras med kurskod, kursnamn, kursplan (som en länk) och progression (A eller B). Det finns även en länk för att ta bort en kurs.

### Lägg till kurs
På sidan för att lägga till kurs, finns ett formulär där användaren kan fylla i information om kursen (kurskod, kursnamn, kursplan och progression). När formuläret skickas valideras datan på serversidan och om alla fält är korrekt ifyllda sparas kursen i databasen.

### Om sidan
En statisk sida som beskriver webbplatsens syfte, de använda teknologierna och information om databasen som används (MySQL).

Sidan går att köra genom att öppna projektet i Visiual Studio Code och i terminalen skriva kommandot "node server.js". Terminalen kommer då att skapa en localhost som visar sidans fulla funktionalitet. 
