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

// POST request for addition
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;

  if (isNaN(sum) || sum < -1000000 || sum > 1000000) {
    return res.json({
      status: 'error',
      message: 'Overflow'
    });
  }

  res.json({
    status: 'success',
    message: 'The sum of the given two numbers',
    sum: sum
  });
});

// POST request for subtraction
app.post('/sub', (req, res) => {
  const { num1, num2 } = req.body;
  const difference = num1 - num2;

  if (isNaN(difference) || difference < -1000000 || difference > 1000000) {
    return res.json({
      status: 'error',
      message: 'Underflow'
    });
  }

  res.json({
    status: 'success',
    message: 'The difference of the given two numbers',
    difference: difference
  });
});

// POST request for multiplication
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 * num2;

  if (isNaN(result) || result < -1000000 || result > 1000000) {
    return res.json({
      status: 'error',
      message: 'Underflow'
    });
  }

  res.json({
    status: 'success',
    message: 'The product of the given numbers',
    result: result
  });
});

// POST request for division
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;

  if (num2 === 0) {
    return res.json({
      status: 'error',
      message: 'Cannot divide by zero'
    });
  }

  const result = num1 / num2;

  if (isNaN(result) || result < -1000000 || result > 1000000) {
    return res.json({
      status: 'error',
      message: 'Underflow'
    });
  }

  res.json({
    status: 'success',
    message: 'The division of the given numbers',
    result: result
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Invalid route'
  });
});






app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
