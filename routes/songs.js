// add Joi
const Joi = require('joi')
const express = require('express');
const router = express.Router();

let songs = [];

router.get('/', (req, res, next) => {
    res.status(200).json(songs);
});

router.post('/', (req, res) => {
//create schema
    // name: is string, is required, min 2 chars long
    // artist: is string, is required, min 4 chars long

    const schema = Joi.object().keys({
        name:Joi.string().min(2).max(10).required(),
        artist:Joi.string().min(4).max(20).required()
    })
// Check that req.body is valid with Joi

Joi.validate(req.body, schema, function(err){
    if(err){
        res.status(422).json({
            status: "error",
            message: "invalid request data",
            data: req.body
        })
    }
    else {
        if (req.body){
            let newSong = {
                id: songs.length + 1,
                name: req.body.name,
                artist: req.body.artist 
            }
            songs.push(newSong);
            res.status(201).json({
                status: "success",
                message: "created user successfully",
                data: req.body
            })
        }
        next(new Error("Unable to create song"))
    }
})
})

// if valid continue to create song

// if not valid return 400 with error message from Joi validation result

router.get('/:id', (req, res, next) => {

    let song = songs.find(song => song.id == parseInt(req.params.id));
    if(song) {
        res.status(200).json(song);
    }
    next(new Error(`Unable to find song with id: ${req.params.id}`))
});

router.put('/:id', (req, res, next) => {
    let song = songs.find(song => song.id === parseInt(req.params.id));
    if (song) {
        song.name = req.body.name;
        song.artist = req.body.artist;
        res.status(200).json(song);
    }
    next(new Error(`Unable to update song with id: ${req.params.id}`))
});

//delete a song with id, and return deleted song
router.delete("/:id", (req, res, next) => {
    let songToDelete = songs.find(song => song.id === parseInt(req.params.id));
    if(songToDelete){
        let index = songs.indexOf(songToDelete);
        songs.splice(index, 1);
        res.status(200).json(songToDelete);
    }
    next(new Error(`Unable to delete song with id: ${req.params.id}`))
});

//Add error handler for songs router to return 404 on failure at any route
router.use((err, req, res, next) => {
    res.status(404).json({ message: err.message });
});

module.exports = router;