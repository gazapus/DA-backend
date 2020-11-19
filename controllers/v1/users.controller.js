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

exports.find_one = (req, res) => {
    let id = req.params.id;
    User.findById(id)
        .then(data => {
            if(data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({message: `Not found User with id ${id}`})
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving user with id " + id })
        })
}

exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roles: req.body.role
    });
    user.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Some error occurred while creating this user'})
        })
}

exports.update_one = (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(data) {
                res.status(200).send({ message: "User was updated successfully." })
            } else {
                res.status(404).send({ message: `Cannot update User with id=${id}. Probably User was not found!`})
            }
        })
        .catch( err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
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