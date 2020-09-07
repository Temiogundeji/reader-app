const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const PORT = 8000;
const auth = require('./auth')(app);
const bookRoutes = require('./routes/BookRoutes');
const config = require('dotenv');

config.config();

// const db = require('./models/index');

app.use(express.json());
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(bodyParser.urlencoded({ extended: true }));


if(process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}

// if(app.get('dev') === 'development'){
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.json({
//             message: err.message,
//             error: err
//         });
//     })
// }

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

app.get('/data', (req, res) => {
    res.json({ message: 'Welcome to my ES5 Node App, NodeJs is just very awesome'});
});

app.use('/api/v1/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`App running at ${PORT}`);
});

// db.sequelize.sync().then(function() {
//     console.log('DB created successfully!');
    
// })
// .catch(error => console.log(error));

module.exports = app;