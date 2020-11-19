var bcrypt = require("bcryptjs");
const db = require("../../models");
const User = db.user;
const Role = db.role;

exports.find_all = (req, res) => {
    User.find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || 'Error retrieving users'})
        })
}

exports.delete_one = (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove(id)
        .then(data => {
            if (data) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Probably User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
}