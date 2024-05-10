var StandingModel = require('../../models/handball/standingModel.js')

/**
 * standingController.js
 *
 * @description :: Server-side logic for managing standings.
 */
module.exports = {

    /**
     * standingController.list()
     */
    list: function (req, res) {
        StandingModel.find()
            .populate('team')
            .exec(function (err, standings) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting standing.',
                        error: err
                    })
                }

                return res.json(standings)
            })
    },

    /**
     * standingController.show()
     */
    show: function (req, res) {
        var id = req.params.id

        StandingModel.findById(id)
            .populate('team')
            .exec(function (err, standing) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting standing.',
                        error: err
                    })
                }

                if (!standing) {
                    return res.status(404).json({
                        message: 'No such standing'
                    })
                }

                return res.json(standing)
            })
    },

    /**
     * standingController.create()
     */
    create: function (req, res) {
        var standing = new StandingModel({
            place: req.body.place,
            team: req.body.team,
            gamesPlayed: req.body.gamesPlayed,
            wins: req.body.wins,
            draws: req.body.draws,
            losses: req.body.losses,
            goalsScored: req.body.goalsScored,
            goalsConceded: req.body.goalsConceded,
            points: req.body.points
        })

        standing.save(function (err, standing) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating standing',
                    error: err
                })
            }

            return res.status(201).json(standing)
        })
    },

    /**
     * standingController.update()
     */
    update: function (req, res) {
        var id = req.params.id

        StandingModel.findOne({ _id: id }, function (err, standing) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting standing',
                    error: err
                })
            }

            if (!standing) {
                return res.status(404).json({
                    message: 'No such standing'
                })
            }

            standing.place = req.body.place ? req.body.place : standing.place
            standing.team = req.body.team ? req.body.team : standing.team
            standing.gamesPlayed = req.body.gamesPlayed ? req.body.gamesPlayed : standing.gamesPlayed
            standing.wins = req.body.wins ? req.body.wins : standing.wins
            standing.draws = req.body.draws ? req.body.draws : standing.draws
            standing.losses = req.body.losses ? req.body.losses : standing.losses
            standing.goalsScored = req.body.goalsScored ? req.body.goalsScored : standing.goalsScored
            standing.goalsConceded = req.body.goalsConceded ? req.body.goalsConceded : standing.goalsConceded
            standing.points = req.body.points ? req.body.points : standing.points

            standing.save(function (err, standing) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating standing.',
                        error: err
                    })
                }

                return res.json(standing)
            })
        })
    },

    /**
     * standingController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id

        StandingModel.findByIdAndRemove(id, function (err, standing) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the standing.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    }
}
