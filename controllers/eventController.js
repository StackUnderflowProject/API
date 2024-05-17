const eventModel = require('../models/eventModel.js')

function isAuthorized(req, event) {
    return (event.host.equals(req.userData.id) || req.isAdmin);
} 

/**
 * eventController.js
 *
 * @description :: Server-side logic for managing events.
 */
module.exports = {

    /**
     * eventController.list()
     */
    list: function (req, res) {
        eventModel.find()
            .populate('host')
            .exec(function (err, events) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting event.',
                        error: err
                    })
                }
                events.forEach(event => event.host.password = undefined);
                return res.json(events)
            })
    },

    /**
     * eventController.show()
     */
    show: function (req, res) {
        const id = req.params.id

        eventModel.findById(id).populate('host').exec(function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                })
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                })
            }
            event.host.password = undefined;
            return res.json(event)
        })
    },

    /**
     * eventController.create()
     */
    create: function (req, res) {

        const event = new eventModel({
            name: req.body.name,
            description: req.body.description,
            activity: req.body.activity.toLowerCase(),
            date: req.body.date,
            time: req.body.time,
            score: req.body.score,
            location: req.body.location,
            host: req.userData.id,
            followers: []
        })

        event.save(function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating event',
                    error: err
                })
            }

            return res.status(201).json(event)
        })
    },

    follow: function(req, res) {
        eventModel.findById(req.params.eventId, function(err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when following event',
                    error: err
                })
            }
            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                })
            }

            if (event.followers.includes(req.userData.id)) {
                event.followers = event.followers.filter(userId => userId != req.userData.id);
            } else {
                event.followers.push(req.userData.id);
            }

            event.save(function (err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating event',
                        error: err
                    })
                }
    
                return res.status(200).json(event)
            })
        })
    },


    /**
     * eventController.update()
     */
    update: function (req, res) {
        const id = req.params.id

        eventModel.findOne({ _id: id }, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event',
                    error: err
                })
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                })
            }

            if (!isAuthorized(req, event)) {
                return res.status(401).json({message: "Not authorized!"})
            }

            event.name = req.body.name ? req.body.name : event.name
            event.description = req.body.description ? req.body.description : event.description
            event.activity = req.body.activity ? req.body.activity.toLowerCase() : event.activity
            event.date = req.body.date ? req.body.date : event.date
            event.time = req.body.time ? req.body.time : event.time
            event.score = req.body.score ? req.body.score : event.score
            event.location = req.body.location ? req.body.location : event.location
            event.host = req.body.host ? req.body.host : event.host
            event.followers = req.body.followers ? req.body.followers : event.followers

            event.save(function (err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating event.',
                        error: err
                    })
                }

                return res.json(event)
            })
        })
    },

    /**
     * eventController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id
        // ne spreminjaj v findByIdAndDelete
        eventModel.findById(id, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the event.',
                    error: err
                })
            }

            if (!isAuthorized(req, event)) {
                return res.status(401).json({message: "Not authorized!"})
            }

            event.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when deleting the event.',
                        error: err
                    });
                }
                return res.status(204).json();
            });        
        })
    },

    filterByDate: function (req, res) {
        let date;
        try {
            date = new Date(req.body.date);
        } catch (dateError) {
            return res.status(400).json({
                message: "Date provided isn't in the correct format, must abide: YYYY-MM-DD",
            })
        }
        eventModel.find({date: date})
        .populate('host')
        .exec(function(err, events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when filtering the events.',
                    error: err
                })
            }
            events.forEach(event => event.host.password = undefined);
            return res.status(200).json(events);
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
        eventModel.find(locationQuery).populate("host").exec(function(error, events) {
            if (error) {
                return res.status(500).json({
                    message: 'Error when fetching events.',
                    error: error
                })
            }
            events.forEach(event => event.host.password = undefined);
            return res.status(200).json(events);
        })
    },

    filterByHost: function (req, res) {
        eventModel.find({host: req.params.hostId})
        .populate('host')
        .exec(function(err, events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when filtering the eventes.',
                    error: err
                })
            }
            events.forEach(event => event.host.password = undefined);
            return res.status(200).json(events);
        })
    },

    filterByActivity: function (req, res) {
        eventModel.find({activity: req.params.activityName.toLowerCase()})
        .populate('host')
        .exec(function(err, events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when filtering the events.',
                    error: err
                })
            }
            events.forEach(event => event.host.password = undefined);
            return res.status(200).json(events);
        })
    },

}