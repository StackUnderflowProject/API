const StandingModel = require('../../models/football/standingModel.js')

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
            .populate('team', ['name', 'logoPath'])
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
        const id = req.params.id

        StandingModel.findById(id)
            .populate('team',['name', 'logoPath'])
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

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        const standing = new StandingModel({
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
        const id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        StandingModel.findById(id, function (err, standing) {
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
        const id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        StandingModel.findByIdAndRemove(id, function (err, standing) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the standing.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    },

    filterBySeason: function (req, res) {
        const season = req.params.season

        StandingModel.find({season: season})
            .populate('team',['name', 'logoPath'])
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

    filterByTeam: function (req, res) {
        const team = req.params.team

        StandingModel.find({team: team})
            .populate('team',['name', 'logoPath'])
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

    filterByTeamName: function (req, res) {
        const teamName = req.params.teamName

        StandingModel.find()
            .populate('team',['name', 'logoPath'])
            .exec(function (err, standings) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting standing.',
                        error: err
                    })
                }

                const team = standings.filter(standing => standing.team.name === teamName)
                return res.json(team)
            })
    },

    filterBySeasonAndTeam: function (req, res) {
        const season = req.params.season
        const team = req.params.team

        StandingModel.find({season: season, team: team})
            .populate('team',['name', 'logoPath'])
            .exec(function (err, standings) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting standing.',
                        error: err
                    })
                }

                return res.json(standings)
            })
    }
}