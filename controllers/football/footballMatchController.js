var footballMatchModel = require('../../models/football/footballMatchModel.js')

/**
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
    }
}
