const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors');

app.set('port', process.env.port || 3001);

app.use(cors({origin: '*'}));
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.set('json spaces', 2)

app.use(express.static('public'));
app.use('/api/hotels', require('./routes/hotels.js'))

app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}`)
})