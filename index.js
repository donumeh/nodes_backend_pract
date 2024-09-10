
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('--')
    next()
}

app.use(requestLogger);


let notes = [
    {
      "id": "1",
      "content": "HTML is easy",
      "important": false
    },
    {
      "id": "2",
      "content": "Browser can execute only JavaScript",
      "important": true
    },
    {
      "id": "3",
      "content": "GET and POST are the most important methods of HTTP protocol",
      "important": false
    },
    {
      "id": "4",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "5",
      "content": "New one",
      "important": false
    },
    {
      "id": "6",
      "content": "",
      "important": false
    },
    {
      "id": "7",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "8",
      "content": "Hello World",
      "important": false
    },
    {
      "id": "9",
      "content": "a new note...",
      "important": true
    },
    {
      "id": "10",
      "content": "a new note...",
      "important": true
    },
    {
      "id": "11",
      "content": "a new note...",
      "important": true
    },
    {
      "id": "12",
      "content": "a new note...",
      "important": true
    },
    {
      "id": "13",
      "content": "a new note...",
      "important": true
    },
    {
      "id": "14",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "15",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "16",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "17",
      "content": "Somethinf",
      "important": true
    },
    {
      "id": "18",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "19",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "20",
      "content": "a new note...",
      "important": true
    },
    {
      "id": "21",
      "content": "a new note...",
      "important": true
    },
    {
      "id": "22",
      "content": "a new note...",
      "important": false
    },
    {
      "id": "23",
      "content": "isis",
      "important": true
    }
  ];

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0

    return String(maxId + 1)
}


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>');
})

app.get('/api/notes', (request, response) => {
    response.json(notes);
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    const note = notes.find(note => note.id === id);

    if (note) {
        response.json(note);
    }
    else {
        response.statusMessage = "Current note not found"
        response.status(404).json({message: 'note does not exits'});
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.statusMessage = "Note deleted"
    response.status(204).json({message: "note deleted successfully"})
})

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        response.statusMessage = "Content cannot be empty";
        response.status(404).json({message: "404: Content cannot be empty"});
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }
    notes = notes.concat(note)

    response.json(notes);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'});
}

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})