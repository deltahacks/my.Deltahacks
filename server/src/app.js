const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'), bodyParser.json(), cors());

app.get('/', (req, res) => {
	res.send('Heyo');
});

app.listen(process.env.PORT || 8081);
console.log('hey');

