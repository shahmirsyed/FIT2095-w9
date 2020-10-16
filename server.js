//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
let path = require('path');

const actors = require('./routers/actor');
const movies = require('./routers/movie');


const app = express();



app.listen(8080);


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/moviesDB', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

//Actor endpoints 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
app.post('/actors/movies/:id', actors.addMovie);
app.get('/actors/deleteActorMovies', actors.deleteActorMovies);
//Movie endpoints

app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.get('/movies/actors/:movieId/:actorId', movies.addActor);
app.get('/movies/:y1/:y2', movies.getBetweenYears);
// app.delete('/movies/:id/actors/:aid', movies.deleteActor);