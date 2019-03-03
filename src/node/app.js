var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const open = require('opn');

var port = 8080;

global.MOVIES = [
    {
        id: 1,
        title: "Avatar",
        year: 2009,
        language: 'Américain',
        director: {
            name: "James Cameron",
            nationality: "Canadien",
            birthdate: "1954-08-16"
        },
        poster: 'https://picsum.photos/170/250',
        genre: "Science-fiction",
        ratings: [5, 4, 3]
    },
    {
        id: 2,
        title: "Harry Potter à l'école des sorciers",
        year: 2001,
        language: 'Anglais',
        director: {
            name: "Chris Columbus",
            nationality: "Américain",
            birthdate: "1958-09-10"
        },
        poster: 'https://picsum.photos/170/250',
        genre: 'Fantastique',
        ratings: [5, 5, 5]
    },
    {
        id: 3,
        title: "The Dark Knight Rises",
        year: 2012,
        language: 'Américain',
        director: {
            name: "Christopher Nolan",
            nationality: "Britannique",
            birthdate: "1970-07-30"
        },
        poster: 'https://picsum.photos/170/250',
        genre: 'Super-héros',
        ratings: [5, 4, 5]
    }
];

var app = express();

app.use(express.static(path.resolve('src/static')));
app.use(express.static(path.resolve('src/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);

console.log(`App listening on port ${port}...`);

var apiRoutes = require('./routes.js');
app.use('/api', apiRoutes);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
})

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve('src/dist/index.html'));
});

open(`http://localhost:${port}`).catch(() => {
  log.warn(`Failed to open browser automatically.`);
});