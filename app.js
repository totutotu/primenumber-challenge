const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')

const port = process.env.PORT || 3000;

const checkForPrime = (number) => {
    for (let i = 2, s = Math.sqrt(number); i <= s; i++)
        if (number % i === 0) return false;
    return number > 1;
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend/build')))

app.get('/api/sumandcheck', (req, res) => {
    let numbers = req.query.numbers
    if (numbers && req.query.numbers.slice(-1) === ',') {
        numbers = req.query.numbers.slice(0, -1)
    }

    if (numbers) {
        let sum = 0;
        numbers.split(',').forEach((number) => (sum = sum + parseInt(number)));
        if (isNaN(sum)) {
            res.status(400).json({ error: 'query malformatted' });
        } else {
            res.json({ result: sum, isPrime: checkForPrime(sum) });
        }
    } else {
        res.status(400).json({ error: 'query missing or malformatted' });
    }
});

app.get('/api/checkprime', (req, res) => {

    if (req.query.number) {
        const parsedNum = parseInt(req.query.number);
        if (req.query.number.includes(',') || req.query.number.includes('.')) {
            res.status(400).json({ error: 'only one number allowed, no decimals' });
        } else if (isNaN(parsedNum)) {
            res.status(400).json({ error: 'query malformatted' });
        } else {
            res.json({ isPrime: checkForPrime(parsedNum) });
        }
    } else {
        res.status(400).json({ error: 'query missing or malformatted' });
    }
});

app.use(unknownEndpoint);

module.exports = app;