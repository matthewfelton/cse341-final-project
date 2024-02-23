const validator = require('../helpers/validate');

const saveBorrowers = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        genre: 'required|string',
        rating: 'required|string',
        runTime: 'required|string',
        releaseYear: 'numeric|digits:4',
        director: 'required|string',
        metascore: 'numeric|min:0|max:100'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
            });
        } else {
            next();
        }
    });
};

const saveContentCreators = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        genre: 'required|string',
        rating: 'required|string',
        runTime: 'required|string',
        airTime: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
            });
        } else {
            next();
        }
    });
};

const saveEvent = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        genre: 'required|string',
        rating: 'required|string',
        runTime: 'required|string',
        airTime: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
            });
        } else {
            next();
        }
    });
};

const saveInventory = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        genre: 'required|string',
        rating: 'required|string',
        runTime: 'required|string',
        airTime: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveBorrowers,
    saveContentCreators,
    saveEvent,
    saveInventory
};