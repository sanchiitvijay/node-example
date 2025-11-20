// Minimal Express server demonstrating common patterns
const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

// Built-in middleware to parse JSON bodies
app.use(express.json());

let users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

// GET example
app.get('/users', (req, res) => {
  res.json({ users });
});

// POST example
app.post('/users', (req, res) => {
  users.push(req.body);
  res.status(201).json({ message: 'User created' });
});

// PUT example
app.put('/users/1', (req, res) => {
  users[0] = req.body;
  res.json({ message: 'User updated' });
});

// DELETE example
app.delete('/users/1', (req, res) => {
  users.splice(0, 1);
  res.json({ message: 'User deleted' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
