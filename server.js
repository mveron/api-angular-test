const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const cors = require('cors');

const PORT = process.env.PORT || 3000


const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/api', api)
app.get('/', function(req, res){
    res.send('Hello World!');
});

app.listen(PORT, function(){
    console.log(`Express Server listening on port ${PORT}`);
    
})