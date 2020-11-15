var Product = require('../../models/product.model');

exports.find_all = function(req, res) {
    Product.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving products "})
        })
}

exports.find_one = function (req, res) {
    const id = req.params.id;
    Product.findById(id)
        .then(data => {
            if (data)
                res.send(data);
            else
                res.status(404).send({ message: "Not found Product with id " + id });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: err.message || "Error retrieving Tutorial with id=" + id });
        });
};

exports.create = function (req, res) {
    let product = new Product({
        imageURL: req.body.imageURL,
        description: req.body.description,
        price: req.body.price,
        shopURL: req.body.shopURL,
    })
    product.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || '"Some error occurred while creating this product'
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (data) {
                res.send({ message: "Product was updated successfully." });
            } else {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Probably Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(data => {
            if (data) {
                res.send({
                    message: "Product was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Probably Product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};

exports.delete_all = (req, res) => {
    Product.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Products."
            });
        });
};