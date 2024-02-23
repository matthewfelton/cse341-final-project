const validator = require('../helpers/validate');

const saveBorrowers = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        dateBorrowed: 'required|date_format:YYYY-MM-D',
        inventoryBorrowed: 'required|string',
        dateDue: 'required|date_format:YYYY-MM-D',
        conditionReturned: 'required|string'
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
        firstName: 'required|string',
        lastName: 'required|string',
        jobTitle: 'required|string'
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