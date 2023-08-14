const express = require("express");
const app = express();

let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  let startReq = new Date();
  response.send(
    `<p>Phonebook has info for ${entries.length} ${
      entries.length > 1 ? "people" : "person"
    }</p>
    <p>${startReq}</p>
    `
  );
});

app.get("/api/persons", (request, response) => {
  response.json(entries);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
