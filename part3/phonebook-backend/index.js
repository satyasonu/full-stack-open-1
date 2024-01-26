const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const Person = require("./models/person");

var morgan = require("morgan");

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

//------------------Error handler-----------------------------
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

//------------------Unknown Endpoint----------------------------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));


app.use(errorHandler);

// -----------------Get All Persons-----------------------------
app.get("/api/persons", (request, response) => {
  Person.find({}).then((allperson) => {
    response.json(allperson);
  });
});

//-------------------Get person By ID---------------------------
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// -----------------Delete person data By ID--------------------
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person
    .findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

// ----------------Add a new person-----------------------------
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }
  if (body.number === undefined) {
    return response.status(400).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedNote) => {
    response.json(savedNote);
  });
});


// --------------Update Existing Data of a person---------------------------
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;

  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(id)
    .then(result => {
      console.log(result)
      response.json(result)
    })
    .catch(error => next(error))
})

// ---------------using unknown endpoint------
app.use(unknownEndpoint);

// ---------------port details---------------------------------
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
