CREATE DATABASE dataMelp;

USE dataMelp;

CREATE TABLE Restaurants (  
    id VARCHAR(100) NOT NULL,
    rating INT(1),
    name VARCHAR(200),
    site VARCHAR(300),
    email VARCHAR(100),
    phone VARCHAR(30),
    street TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    lat FLOAT,
    lng FLOAT,
    PRIMARY KEY ( id )
);

--Pruebas

INSERT INTO Restaurants ( id, rating, name, site, email, phone, street, city, state, lat, lng)
VALUES
   ('851f799f-0852-439e-b9b2-df92c43e7672', 1, 'Barajas, Bahena and Kano', 'https://federico.com', 'Anita_Mata71@hotmail.com', '534 814 204', '82247 Mariano Entrada', 'Mérida Alfredotown', 'Durango', 19.44005705, -99.1270471 ),
   ('4e17896d-a26f-44ae-a8a4-5fbd5cde79b0', 0, 'Hernández - Lira', 'http://graciela.com.mx', 'Brandon_Vigil@hotmail.com', '570 746 998', '93725 Erick Arroyo', 'Mateofurt', 'Hidalgo', 19.43790428, -99.12865768 );

--Calculo de estadisticas
SELECT COUNT(id) AS count, AVG(rating) AS avg, STD(rating) AS std
FROM Restaurants 
WHERE (acos(sin(radians(19.4417)) * sin(radians(lat)) + 
cos(radians(19.4417)) * cos(radians(lat)) * 
cos(radians(-99.1266) - radians(lng))) * 6371) <= 0.1;