const express = require('express');
const app = express();
const port = 3000;

// Add this line here
const { v4: uuidv4 } = require('uuid'); // UUID for unique user IDs

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// In-memory store
const users = [];

// POST /users – Create a user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// GET /users/:id – Retrieve a user
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// PUT /users/:id – Update a user
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.name = name;
    user.email = email;
    res.json(user);
});

// DELETE /users/:id – Delete a user
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'User not found' });

    users.splice(index, 1);
    res.status(204).send();
});

// Optional root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
