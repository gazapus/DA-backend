const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

let verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

let isAdmin = (req, res, next) => {
    User.findById(req.userId, (err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user.isAdmin) {
            return res.status(403).send({ message: "Require Admin Role!" });
        } else {
            next();
            return;
        }
    })
};

let verifyAdminQuantity = (req, res, next) => {
    User.find({isAdmin: true}, (err, users) => {
        if(err) return res.status(500).send({message: err});
        if(users.length === 1) return res.status(400).send({message: "Cant delete all users"});
        next();
    })
}

const authJwt = {
    verifyToken,
    isAdmin, 
    verifyAdminQuantity
};

module.exports = authJwt;