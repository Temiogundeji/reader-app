const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logger('dev'));

if(app.get('dev') === 'development'){
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        })
    })
}

app.get('/', (req, res, next) => {
    res.json({ message: 'success', mood: 'Thankful'});
    next();
});

app.get('/books', (req, res) => {
    res.json([{
        title:"Aiye le o",
        author:"fadeyi oloro"
    },
    {
        title:"Aiye le o",
        author:"fadeyi oloro"
    }
]);
});

app.listen(PORT, () => {
    console.log(`App running at ${PORT}`);
});

module.exports = app;

