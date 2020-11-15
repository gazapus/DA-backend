var Network = require('../../models/network.model');

exports.find_all = (req, res) => {
    Network.find({})
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error retrieving networks'
            })
        })
}

exports.find_one = (req, res) => {
    const id = req.params.id;
    Network.findById(id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: "Not found Network with id " + id })
            }
        })
        .catch(err => {
            res.status(500).send({ mmessage: err.message || "Error retrieving Tutorial with id=" + id })
        })
}

exports.create = (req, res) => {
    let network = new Network({
        iconURL: req.body.iconURL,
        name: req.body.name,
        pageURL: req.body.pageURL
    })
    network.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while creating this network'
            })
        })
}

exports.update = (req, res) => {
    let id = req.params.id;
    Network.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (data) {
                res.status(200).send({ message: 'Netowork was updated successfully' })
            } else {
                res.status(404).send({
                    message: `Cannot update Network with id=${id}. Probably network was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error updating network with id=" + id })
        })
}

exports.delete = (req, res) => {
    let id = req.params.id;
    Network.findByIdAndRemove(id)
        .then(data => {
            if (data) {
                res.status(200).send({ message: 'Network was deleted successfully' })
            } else {
                res.status(404).send({
                    message: `Cannot delete network with id=${id}. Probably network was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete network with id=" + id })
        })
}

exports.delete_all = (req, res) => {
    Network.deleteMany({})
        .then(data => {
            res.status(200).send({ message: `${data.deletedCount} networks were deleted successfully` })
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while removing all networks" })
        })
}