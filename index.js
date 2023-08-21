const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
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
app.use(express.static("dist"));

let entries = [
  {
    id: 1,
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
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
  if (!body.phone) {
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
    phone: body.phone,
  };
  entries = entries.concat(entry);
  response.json(entry);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
