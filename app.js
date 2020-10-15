const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const PORT = 3000;
// const auth = require('./auth')(app);
const bookRoutes = require('./routes/BookRoutes');
const userRoutes = require('./routes/UserRoutes');
const securedRoutes = require('./routes/secured-routes');

const config = require('dotenv');
const passport = require('passport');

require("./auth/auth");

config.config();

// const db = require('./models/index');

app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
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
app.use('/', userRoutes);
app.use('/user', passport.authenticate('jwt', {session: false}, securedRoutes));

app.listen(PORT, () => {
    console.log(`App running at ${PORT}`);
});

module.exports = app;