-- Skapa databas om den inte redan finns med namnet 'cv'
CREATE DATABASE IF NOT EXISTS cv;

-- Använd den nyss skapade databasen 'cv'
USE cv;

-- Skapa tabellen 'courses' om den inte redan finns
CREATE TABLE IF NOT EXISTS courses (
    -- 'id' kolumnen är en primärnyckel och autoinkrementeras för varje ny rad
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- 'coursecode' är kurskoden som är en textsträng med max längd på 10 tecken
    coursecode VARCHAR(10) NOT NULL,

    -- 'coursename' är namnet på kursen, maxlängd 255 tecken
    coursename VARCHAR(255) NOT NULL,

    -- 'syllabus' är en URL till kursplanen, maxlängd 255 tecken
    syllabus VARCHAR(255) NOT NULL,

    -- 'progression' är kursens progression (t.ex. A eller B), maxlängd 1 tecken
    progression VARCHAR(1) NOT NULL,

    -- 'created_at' är en tidsstämpel som auto-genereras när kursen skapas
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Lägger till grunddata i tabellen 'courses'
INSERT INTO courses (coursecode, coursename, syllabus, progression)
VALUES 
('DT207G', 'Backend-baserad webbutveckling', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/', 'B'),
('DT208G', 'Programmering i TypeScript', 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/', 'B');