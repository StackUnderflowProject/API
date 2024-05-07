var MatchModel = require('../models/footballMatchModel')
/**
 * matchController.js
 *
 * @description :: Server-side logic for managing matchs.
 */

module.exports = {

    /**
     * matchController.list()
     */
    list: function (req, res) {
        MatchModel.find()
            .populate('home')
            .populate('away')
            .populate('stadium')
            .exec(function (err, matches) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting match.',
                        error: err
                    })
                }

                return res.json(matches)
            })
    },

    /**
     * matchController.show()
     */
    show: function (req, res) {
        var id = req.params.id

        MatchModel.findById(id)
            .populate('home')
            .populate('away')
            .populate('stadium')
            .exec(function (err, match) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting match.',
                        error: err
                    })
                }

                if (!match) {
                    return res.status(404).json({
                        message: 'No such match'
                    })
                }

                return res.json(match)
            })
    },

    /**
     * matchController.create()
     */
    create: function (req, res) {
        var match = new MatchModel({
            _id: req.body._id,
            date: req.body.date,
            time: req.body.time,
            home: req.body.home,
            away: req.body.away,
            score: req.body.score,
            location: req.body.location,
            stadium: req.body.stadium
        })

        match.save(function (err, match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating match',
                    error: err
                })
            }

            return res.status(201).json(match)
        })
    },

    /**
     * matchController.update()
     */
    update: function (req, res) {
        var id = req.params.id

        MatchModel.findOne({ _id: id }, function (err, match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting match',
                    error: err
                })
            }

            if (!match) {
                return res.status(404).json({
                    message: 'No such match'
                })
            }

            match.date = req.body.date ? req.body.date : match.date
            match.time = req.body.time ? req.body.time : match.time
            match.home = req.body.home ? req.body.home : match.home
            match.away = req.body.away ? req.body.away : match.away
            match.score = req.body.score ? req.body.score : match.score
            match.location = req.body.location ? req.body.location : match.location
            match.stadium = req.body.stadium ? req.body.stadium : match.stadium

            match.save(function (err, match) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating match.',
                        error: err
                    })
                }

                return res.json(match)
            })
        })
    },

    /**
     * matchController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id

        MatchModel.findByIdAndRemove(id, function (err, match) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the match.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    }
}
