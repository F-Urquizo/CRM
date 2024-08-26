import express from "express";

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

app.get('/', (request, response) => {
    response.send("API para CRM de Fundación Sanders - Equipo 3")
})