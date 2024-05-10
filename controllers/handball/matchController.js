var handballMatchModel = require('../../models/handball/matchModel.js')

/**
 * handballMatchController.js
 *
 * @description :: Server-side logic for managing handballMatchs.
 */
module.exports = {

    /**
     * handballMatchController.list()
     */
    list: function (req, res) {
        handballMatchModel.find()
            .populate('home')
            .populate('away')
            .populate('stadium')
            .exec(function (err, handballMatchs) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting handballMatch.',
                        error: err
                    })
                }

                return res.json(handballMatchs)
            })
    },

    /**
     * handballMatchController.show()
     */
    show: function (req, res) {
        var id = req.params.id

        handballMatchModel.findById(id).populate('home').populate('away').populate('stadium').exec(function (err, handballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballMatch.',
                    error: err
                })
            }

            if (!handballMatch) {
                return res.status(404).json({
                    message: 'No such handballMatch'
                })
            }

            return res.json(handballMatch)
        })
    },

    /**
     * handballMatchController.create()
     */
    create: function (req, res) {
        var handballMatch = new handballMatchModel({
            date: req.body.date,
            time: req.body.time,
            home: req.body.home,
            away: req.body.away,
            score: req.body.score,
            location: req.body.location,
            stadium: req.body.stadium
        })

        handballMatch.save(function (err, handballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handballMatch',
                    error: err
                })
            }

            return res.status(201).json(handballMatch)
        })
    },

    /**
     * handballMatchController.update()
     */
    update: function (req, res) {
        var id = req.params.id

        handballMatchModel.findOne({ _id: id }, function (err, handballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballMatch',
                    error: err
                })
            }

            if (!handballMatch) {
                return res.status(404).json({
                    message: 'No such handballMatch'
                })
            }

            handballMatch.date = req.body.date ? req.body.date : handballMatch.date
            handballMatch.time = req.body.time ? req.body.time : handballMatch.time
            handballMatch.home = req.body.home ? req.body.home : handballMatch.home
            handballMatch.away = req.body.away ? req.body.away : handballMatch.away
            handballMatch.score = req.body.score ? req.body.score : handballMatch.score
            handballMatch.location = req.body.location ? req.body.location : handballMatch.location
            handballMatch.stadium = req.body.stadium ? req.body.stadium : handballMatch.stadium

            handballMatch.save(function (err, handballMatch) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating handballMatch.',
                        error: err
                    })
                }

                return res.json(handballMatch)
            })
        })
    },

    /**
     * handballMatchController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id

        handballMatchModel.findByIdAndRemove(id, function (err, handballMatch) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the handballMatch.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    }
}
