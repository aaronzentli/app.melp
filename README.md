# app.melp
REST API with CRUD operations

Esta API requiere para su funcionamiento Node.js y MySQL

## Configuración

1. Descargar dependencias: `npm install`
2. Crear la base de datos: utilizar query que se encuentra en aux/app.sql
3. Modificar el archivo example.env y renombrarlo a .env
4. Iniciar la aplicación: `npm start`
5. Ir a [localhost:3000/](http://localhost:3000/) deberías ver: `{"status":"success","message":"Melp Restaurant API","data":{}}`

## Uso del API

1. Cargar datos en csv: se puede enviar el archivo csv con POST a la url http://localhost:3000/v1/import-restaurants/  o si lo prefiere, puede usar el archivo `aux/pruebas_api.html`, el cual carga un formulario para hacer el envío.
2. Crear un registro: se hace mediante POST a http://localhost:3000/v1/restaurants
3. Consultar todos los registros, mediante GET a http://localhost:3000/v1/restaurants
4. Lectura de un registro por su identificador: mediante GET a http://localhost:3000/v1/restaurants/restaurants/`{restaurant_id}`
5. Actualizar registro: mediante PUT a http://localhost:3000/v1/restaurants/restaurants/`{restaurant_id}`
6. Borrar registro: mediante DELETE  a http://localhost:3000/v1/restaurants/restaurants/`{restaurant_id}`
7. Consulta de datos estadísticos: Mediante GET, ejemplo: http://localhost:3000/v1/restaurants/statistics?latitude=19.4417&longitude=-99.1266&radius=0.4

Para estas peticiones en el archivo `aux/pruebas_api.html` hay un script en javascript con las funciones correspondientes para el CRUD.