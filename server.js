// server.js
const express = require('express');
const app = express();
const port = 3000;

const data = [
    'apple',
    'banana',
    'cherry',
    'date',
    'elderberry',
    'fig',
    'grape',
    'honeydew'
];

app.use(express.static('public'));

app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = data.filter(item => item.toLowerCase().includes(query));
    res.json({ results });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
