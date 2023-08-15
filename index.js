const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(
  morgan((tokens, request, response) => {
    const data = request.body;
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content-length"),
      "-",
      tokens["response-time"](request, response),
      "ms",
      JSON.stringify(data),
    ].join(" ");
  })
);

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

const MIN = 5;
const MAX = 2000;

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

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const entry = entries.find((e) => e.id === id);
  if (entry) {
    response.json(entry);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  entries = entries.filter((e) => e.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  const exist = entries.some(
    (e) => e.name.toLowerCase() === body.name.toLowerCase()
  );
  if (exist) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const entry = {
    id: Math.floor(Math.random() * (MAX - MIN) + MIN),
    name: body.name,
    number: body.number,
  };
  entries.concat(entry);
  response.json(entry);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
