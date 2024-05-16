var FootballteamModel = require('../../models/football/teamModel.js')

/**
 * footballTeamController.js
 *
 * @description :: Server-side logic for managing footballTeams.
 */
module.exports = {

    /**
     * footballTeamController.list()
     */
    list: function (req, res) {
        FootballteamModel.find(function (err, footballTeams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting footballTeam.',
                    error: err
                })
            }

            return res.json(footballTeams)
        })
    },

    /**
     * footballTeamController.show()
     */
    show: function (req, res) {
        var id = req.params.id

        FootballteamModel.findOne({ _id: id }, function (err, footballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting footballTeam.',
                    error: err
                })
            }

            if (!footballTeam) {
                return res.status(404).json({
                    message: 'No such footballTeam'
                })
            }

            return res.json(footballTeam)
        })
    },

    /**
     * footballTeamController.create()
     */
    create: function (req, res) {

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        var footballTeam = new FootballteamModel({
            _id: req.body._id ? req.body._id : crypto.randomUUID(),
            name: req.body.name,
            president: req.body.president,
            director: req.body.director,
            coach: req.body.coach,
            logoPath: req.body.logoPath
        })

        footballTeam.save(function (err, footballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating footballTeam',
                    error: err
                })
            }

            return res.status(201).json(footballTeam)
        })
    },

    /**
     * footballTeamController.update()
     */
    update: function (req, res) {
        var id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        FootballteamModel.findOne({ _id: id }, function (err, footballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting footballTeam',
                    error: err
                })
            }

            if (!footballTeam) {
                return res.status(404).json({
                    message: 'No such footballTeam'
                })
            }

            footballTeam.name = req.body.name ? req.body.name : footballTeam.name
            footballTeam.president = req.body.president ? req.body.president : footballTeam.president
            footballTeam.director = req.body.director ? req.body.director : footballTeam.director
            footballTeam.coach = req.body.coach ? req.body.coach : footballTeam.coach
            footballTeam.logoPath = req.body.logoPath ? req.body.logoPath : footballTeam.logoPath

            footballTeam.save(function (err, footballTeam) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating footballTeam.',
                        error: err
                    })
                }

                return res.json(footballTeam)
            })
        })
    },

    /**
     * footballTeamController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        FootballteamModel.findByIdAndRemove(id, function (err, footballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the footballTeam.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    },

    filterBySeason: function (req, res) {
        var season = req.params.season

        FootballteamModel.find({ season: season }, function (err, footballTeams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting footballTeam.',
                    error: err
                })
            }

            return res.json(footballTeams)
        })
    }
}