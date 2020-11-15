var News = require('../../models/news.model');

exports.find_all = (req, res) => {
    News.find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Error retrieving news'})
        })
}

exports.find_one = (req, res) => {
    let id = req.params.id;
    News.findById(id)
        .then(data => {
            if(data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({message: `Not found News with id ${id}`})
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving news with id " + id })
        })
}

exports.create = (req, res) => {
    let news = new News({
        text: req.body.text
    });
    news.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Some error occurred while creating this news'})
        })
}

exports.update_one = (req, res) => {
    let id = req.params.id;
    News.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(data) {
                res.status(200).send({ message: "News was updated successfully." })
            } else {
                res.status(404).send({ message: `Cannot update News with id=${id}. Probably News was not found!`})
            }
        })
        .catch( err => {
            res.status(500).send({
                message: "Error updating News with id=" + id
            });
        })
}


exports.delete_one = (req, res) => {
    let id = req.params.id;
    News.findByIdAndRemove(id)
        .then(data => {
            if (data) {
                res.send({
                    message: "News was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete News with id=${id}. Probably News was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete News with id=" + id
            });
        });
}

exports.delete_all = (req, res) => {
    News.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} news were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all news."
            });
        });
};