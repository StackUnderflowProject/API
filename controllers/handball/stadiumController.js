const StadiumModel = require('../../models/handball/stadiumModel.js')

/**
 * stadiumController.js
 *
 * @description :: Server-side logic for managing stadiums.
 */
module.exports = {

    /**
     * stadiumController.list()
     */
    list: function (req, res) {
        StadiumModel.find()
            .populate('teamId', 'name')
            .exec(function (err, stadiums) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting stadium.',
                        error: err
                    })
                }

                return res.json(stadiums)
            })
    },

    /**
     * stadiumController.show()
     */
    show: function (req, res) {
        const id = req.params.id

        StadiumModel.findById(id)
            .populate('teamId', 'name')
            .exec(function (err, stadium) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting stadium.',
                        error: err
                    })
                }

                if (!stadium) {
                    return res.status(404).json({
                        message: 'No such stadium'
                    })
                }

                return res.json(stadium)
            })
    },


    showByTeamId: function (req, res) {
        var id = req.params.id

        StadiumModel.findOne({teamId: id})
            .populate('teamId', 'name')
            .exec(function (err, stadium) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting stadium.',
                        error: err
                    })
                }

                if (!stadium) {
                    return res.status(404).json({
                        message: 'No such stadium'
                    })
                }

                return res.json(stadium)
            })
    },

    /**
     * stadiumController.create()
     */
    create: function (req, res) {

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        const stadium = new StadiumModel({
            name: req.body.name,
            teamId: req.body.teamId,
            capacity: req.body.capacity,
            location: req.body.location,
            buildYear: req.body.buildYear,
            imageUrl: req.body.imageUrl
        })

        stadium.save(function (err, stadium) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating stadium',
                    error: err
                })
            }

            return res.status(201).json(stadium)
        })
    },

    /**
     * stadiumController.update()
     */
    update: function (req, res) {
        const id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        StadiumModel.findById(id, function (err, stadium) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting stadium',
                    error: err
                })
            }

            if (!stadium) {
                return res.status(404).json({
                    message: 'No such stadium'
                })
            }

            stadium.name = req.body.name ? req.body.name : stadium.name
            stadium.teamId = req.body.teamId ? req.body.teamId : stadium.teamId
            stadium.capacity = req.body.capacity ? req.body.capacity : stadium.capacity
            stadium.location = req.body.location ? req.body.location : stadium.location
            stadium.buildYear = req.body.buildYear ? req.body.buildYear : stadium.buildYear
            stadium.imageUrl = req.body.imageUrl ? req.body.imageUrl : stadium.imageUrl

            stadium.save(function (err, stadium) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating stadium.',
                        error: err
                    })
                }

                return res.json(stadium)
            })
        })
    },

    /**
     * stadiumController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        StadiumModel.findByIdAndRemove(id, function (err, stadium) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the stadium.',
                    error: err
                })
            }

            return res.status(204).json()
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
        StadiumModel.find(locationQuery)
            .populate('teamId', 'name')
            .exec(function(error, stadiums) {
            if (error) {
                return res.status(500).json({
                    message: 'Error when fetching stadiums in the handballMatches.',
                    error: error
                })
            }
            return res.status(200).json(stadiums);
        })
    },

    filterBySeason: function (req, res) {
        const season = req.params.season
        StadiumModel.find({season: season})
            .populate('teamId', 'name')
            .exec(function(err, stadiums) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when filtering the handballMatches.',
                    error: err
                })
            }
            return res.status(200).json(stadiums);
        })
    },

    filterBySeasonAndLocation: function (req, res) {
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
        StadiumModel.find(locationQuery)
            .populate('teamId', 'name')
            .exec(function(error, stadiums) {
            if (error) {
                return res.status(500).json({
                    message: 'Error when fetching stadiums in the handballMatches.',
                    error: error
                })
            }
            StadiumModel.find({season: req.params.season}).exec(function(err, stadiums) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when filtering the handballMatches.',
                        error: err
                    })
                }
                return res.status(200).json(stadiums);
            })
        })
    }
}