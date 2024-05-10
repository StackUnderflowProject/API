var StadiumModel = require('../../models/football/stadiumModel.js')

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
            .populate('teamId')
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
        var id = req.params.id

        StadiumModel.findById(id)
            .populate('teamId')
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
        var stadium = new StadiumModel({
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
        var id = req.params.id

        StadiumModel.findOne({ _id: id }, function (err, stadium) {
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
        var id = req.params.id

        StadiumModel.findByIdAndRemove(id, function (err, stadium) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the stadium.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    }
}
