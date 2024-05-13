var footballMatchModel = require('../../models/football/matchModel.js')
var footballStadiumModel = require('../../models/football/stadiumModel.js')/**
 * footballMatchController.js
 *
 * @description :: Server-side logic for managing footballMatchs.
 */
module.exports = {

    /**
     * footballMatchController.list()
     */
    list: function (req, res) {
        footballMatchModel.find()
            .populate('home')
            .populate('away')
            .populate('stadium')
            .exec(function (err, footballMatchs) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting footballMatch.',
                        error: err
                    })
                }

                return res.json(footballMatchs)
            })
    },

    /**
     * footballMatchController.show()
     */
    show: function (req, res) {
        var id = req.params.id

        footballMatchModel.findById(id).populate('home').populate('away').populate('stadium').exec(function (err, footballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting footballMatch.',
                    error: err
                })
            }

            if (!footballMatch) {
                return res.status(404).json({
                    message: 'No such footballMatch'
                })
            }

            return res.json(footballMatch)
        })
    },

    /**
     * footballMatchController.create()
     */
    create: function (req, res) {
        var footballMatch = new footballMatchModel({
            date: req.body.date,
            time: req.body.time,
            home: req.body.home,
            away: req.body.away,
            score: req.body.score,
            location: req.body.location,
            stadium: req.body.stadium
        })

        footballMatch.save(function (err, footballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating footballMatch',
                    error: err
                })
            }

            return res.status(201).json(footballMatch)
        })
    },

    /**
     * footballMatchController.update()
     */
    update: function (req, res) {
        var id = req.params.id

        footballMatchModel.findOne({ _id: id }, function (err, footballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting footballMatch',
                    error: err
                })
            }

            if (!footballMatch) {
                return res.status(404).json({
                    message: 'No such footballMatch'
                })
            }

            footballMatch.date = req.body.date ? req.body.date : footballMatch.date
            footballMatch.time = req.body.time ? req.body.time : footballMatch.time
            footballMatch.home = req.body.home ? req.body.home : footballMatch.home
            footballMatch.away = req.body.away ? req.body.away : footballMatch.away
            footballMatch.score = req.body.score ? req.body.score : footballMatch.score
            footballMatch.location = req.body.location ? req.body.location : footballMatch.location
            footballMatch.stadium = req.body.stadium ? req.body.stadium : footballMatch.stadium

            footballMatch.save(function (err, footballMatch) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating footballMatch.',
                        error: err
                    })
                }

                return res.json(footballMatch)
            })
        })
    },

    /**
     * footballMatchController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id

        footballMatchModel.findByIdAndRemove(id, function (err, footballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the footballMatch.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    },

    filterByDate: function (req, res) {
        let date;
        try {
            date = new Date(req.body.date);
        } catch (dateError) {
            return res.status(400).json({
                message: "Date provided isn't in the correct format, must abide: YYYY-MM-DD",
                error: err
            })
        }
        footballMatchModel.find({date: date})
        .populate('home').populate('away').populate('stadium')
        .exec(function(err, matches) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when filtering the footballMatches.',
                    error: err
                })
            }
            return res.status(200).json(matches);
        })
    },

    filterByTeam: function (req, res) {
        footballMatchModel.find({$or: [{away: req.params.teamId}, {home: req.params.teamId}]})
        .populate('home').populate('away').populate('stadium')
        .exec(function(err, matches) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when filtering the footballMatches.',
                    error: err
                })
            }
            return res.status(200).json(matches);
        }) 
    }, 

    filterByStadium: function (req, res) {
        footballMatchModel.find({stadium: req.params.stadiumId})
        .populate('home').populate('away').populate('stadium')
        .exec(function(err, matches) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when filtering the footballMatches.',
                    error: err
                })
            }
            return res.status(200).json(matches);
        })
    },

   

    filterByLocation: function (req, res) {
        const locationQuery = {
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [req.params.longitude, req.params.latitude] // Longitude, Latitude
                    },
                    $maxDistance: req.params.radius
                }
            }
        };
        footballStadiumModel.find(locationQuery).select("_id").exec(function(error, stadiums) {
            if (error) {
                return res.status(500).json({
                    message: 'Error when fetching stadiums in the footballMatches.',
                    error: error
                })
            }
            footballMatchModel.find({stadium: { $in: stadiums}})
            .populate('home').populate('away').populate('stadium')
            .exec(function(err, matches) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when filtering the footballMatches.',
                        error: err
                    })
                }
                return res.status(200).json(matches);
            })
        })
    },


}