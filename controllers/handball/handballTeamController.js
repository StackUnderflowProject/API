var handballteamModel = require('../../models/handball/handballTeamModel.js')

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
        handballteamModel.find(function (err, handballTeams) {
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
        var id = req.params.id

        handballteamModel.findOne({ _id: id }, function (err, handballTeam) {
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

    /**
     * handballTeamController.create()
     */
    create: function (req, res) {
        var handballTeam = new handballteamModel({
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
        var id = req.params.id

        handballteamModel.findOne({ _id: id }, function (err, handballTeam) {
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
        var id = req.params.id

        handballteamModel.findByIdAndRemove(id, function (err, handballTeam) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the handballTeam.',
                    error: err
                })
            }

            return res.status(204).json()
        })
    }
}
