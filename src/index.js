const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Addition
app.post('/add', (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    res.json({ status: 'error', message: 'Invalid data types' });
    return;
  }

  const sum = num1 + num2;

  if (isOverflow(sum)) {
    res.json({ status: 'error', message: 'Overflow' });
    return;
  }

  res.json({ status: 'success', message: 'The sum of given two numbers', sum: sum });
});

// Subtraction
app.post('/sub', (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    res.json({ status: 'error', message: 'Invalid data types' });
    return;
  }

  const difference = num1 - num2;

  if (isUnderflow(difference)) {
    res.json({ status: 'error', message: 'Underflow' });
    return;
  }

  res.json({ status: 'success', message: 'The difference of given two numbers', difference: difference });
});

// Multiplication
app.post('/multiply', (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    res.json({ status: 'error', message: 'Invalid data types' });
    return;
  }

  const result = num1 * num2;

  if (isOverflow(result)) {
    res.json({ status: 'error', message: 'Overflow' });
    return;
  }

  res.json({ status: 'success', message: 'The product of given numbers', result: result });
});

// Division
app.post('/divide', (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  if (!isValidNumber(num1) || !isValidNumber(num2)) {
    res.json({ status: 'error', message: 'Invalid data types' });
    return;
  }

  if (num2 === 0) {
    res.json({ status: 'error', message: 'Cannot divide by zero' });
    return;
  }

  const result = num1 / num2;

  if (isUnderflow(result)) {
    res.json({ status: 'error', message: 'Underflow' });
    return;
  }

  res.json({ status: 'success', message: 'The division of given numbers', result: result });
});

// Helper functions

function isValidNumber(num) {
  return typeof num === 'number' && !isNaN(num);
}

function isOverflow(num) {
  const maxLimit = 1000000; // 1M
  return num > maxLimit;
}

function isUnderflow(num) {
  const minLimit = -1000000; // -1M
  return num < minLimit;
}




app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
