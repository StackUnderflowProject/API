const handballTeamModel = require('../../models/handball/teamModel.js')

/**
 * handballTeamController.js
 *
 * @description :: Server-side logic for managing handballTeams.
 */
module.exports = {

    /**
     * handballTeamController.list()
     */
    list: function (req, res) {
        handballTeamModel.find(function (err, handballTeams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballTeam.',
                    error: err
                })
            }

            return res.json(handballTeams)
        })
    },

    /**
     * handballTeamController.show()
     */
    show: function (req, res) {
        const id = req.params.id

        handballTeamModel.findOne({ _id: id }, function (err, handballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballTeam.',
                    error: err
                })
            }

            if (!handballTeam) {
                return res.status(404).json({
                    message: 'No such handballTeam'
                })
            }

            return res.json(handballTeam)
        })
    },

    showLatest: function (req, res) {
        var id = req.params.id;

        handballTeamModel.findOne({ _id: id }, function (err, handballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballTeam.',
                    error: err
                })
            }

            if (!handballTeam) {
                return res.status(404).json({
                    message: 'No such handballTeam'
                })
            }

            if (handballTeam.season === new Date().getFullYear()) {
                return res.json(handballTeam)
            }

            handballTeamModel.findOne({name: handballTeam.name, season: new Date().getFullYear()}, function(error, hTeam) {
                if (error) {
                    return res.status(500).json({
                        message: 'Error when getting handballTeam.',
                        error: error
                    })
                }
    
                if (!hTeam) {
                    return res.status(404).json({
                        message: 'No such handballTeam'
                    })
                }

                return res.json(hTeam);
            })
        })
    },

    /**
     * handballTeamController.create()
     */
    create: function (req, res) {

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        const handballTeam = new handballTeamModel({
            _id: req.body._id ? req.body._id : crypto.randomUUID(),
            name: req.body.name,
            president: req.body.president,
            director: req.body.director,
            coach: req.body.coach,
            logoPath: req.body.logoPath
        })

        handballTeam.save(function (err, handballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating handballTeam',
                    error: err
                })
            }

            return res.status(201).json(handballTeam)
        })
    },

    /**
     * handballTeamController.update()
     */
    update: function (req, res) {
        const id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        handballTeamModel.findOne({ _id: id }, function (err, handballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballTeam',
                    error: err
                })
            }

            if (!handballTeam) {
                return res.status(404).json({
                    message: 'No such handballTeam'
                })
            }

            handballTeam.name = req.body.name ? req.body.name : handballTeam.name
            handballTeam.president = req.body.president ? req.body.president : handballTeam.president
            handballTeam.director = req.body.director ? req.body.director : handballTeam.director
            handballTeam.coach = req.body.coach ? req.body.coach : handballTeam.coach
            handballTeam.logoPath = req.body.logoPath ? req.body.logoPath : handballTeam.logoPath

            handballTeam.save(function (err, handballTeam) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating handballTeam.',
                        error: err
                    })
                }

                return res.json(handballTeam)
            })
        })
    },

    /**
     * handballTeamController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id

        if (!req.isAdmin) {
            return res.status(401).json("Not authorized!");
        }

        handballTeamModel.findByIdAndRemove(id, function (err, handballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the handballTeam.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    },

    filterBySeason: function (req, res) {
        const season = req.params.season

        handballTeamModel.find({ season: season }, function (err, handballTeams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballTeams.',
                    error: err
                })
            }

            return res.json(handballTeams)
        })
    },

    getTeamNamesBySeason: function (req, res) {
        const season = req.params.season

        handballTeamModel.find({ season: season }, function (err, handballTeams) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting handballTeams.',
                    error: err
                })
            }

            const teamNames = handballTeams.map(team => team.name)

            return res.json(teamNames)
        })
    }
}