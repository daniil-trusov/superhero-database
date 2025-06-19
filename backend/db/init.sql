-- Init schema for superheroes database

-- Drop existing tables if they exist
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS heroes;

-- Create tables
CREATE TABLE heroes (
  id SERIAL PRIMARY KEY,
  nickname TEXT NOT NULL,
  real_name TEXT,
  origin_description TEXT,
  superpowers TEXT,
  catch_phrase TEXT
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER REFERENCES heroes(id) ON DELETE CASCADE,
  filepath TEXT NOT NULL
);

-- Insert sample heroes (images loads locally)
INSERT INTO heroes (id, nickname, real_name, origin_description, superpowers, catch_phrase) VALUES
  (1, 'Superman', 'Clark Kent', 'Born on planet Krypton, raised on Earth with superhuman abilities.', 'Super strength, flight, heat vision, x-ray vision', 'Up, up, and away!'),
  (2, 'Batman', 'Bruce Wayne', 'A billionaire who fights crime in Gotham City after witnessing his parents'' murder.', 'Martial arts, intelligence, high-tech gadgets', 'I am vengeance, I am the night, I am Batman.'),
  (3, 'Wonder Woman', 'Diana Prince', 'Amazonian princess and warrior from Themyscira.', 'Super strength, agility, lasso of truth', 'In the name of all that is good.'),
  (4, 'Spider-Man', 'Peter Parker', 'Bitten by a radioactive spider, gained spider-like abilities.', 'Wall-crawling, agility, spider sense, web-shooters', 'With great power comes great responsibility.'),
  (5, 'Iron Man', 'Tony Stark', 'Genius inventor who built a powerful armored suit.', 'Powered armor suit, intelligence, engineering', 'I am Iron Man.'),
  (6, 'Captain America', 'Steve Rogers', 'A World War II super-soldier frozen in ice and revived in modern times.', 'Enhanced strength, shield mastery, leadership', 'I can do this all day.'),
  (7, 'Thor', 'Thor Odinson', 'God of Thunder from Asgard.', 'Control over lightning, super strength, Mjolnir', 'For Asgard!'),
  (8, 'Black Widow', 'Natasha Romanoff', 'Former Russian spy turned Avenger.', 'Espionage, hand-to-hand combat, marksmanship', 'I’ve got red in my ledger.'),
  (9, 'Hulk', 'Bruce Banner', 'Scientist who transforms into a powerful green monster when angry.', 'Super strength, regeneration, smashing', 'HULK SMASH!');

-- Reset sequence values
SELECT setval('heroes_id_seq', 9, true);
SELECT setval('images_id_seq', 1, false);
