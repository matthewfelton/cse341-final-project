const validator = require('../helpers/validate');

const saveBorrowers = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        dateBorrowed: 'required|date|date_format:YYYY-MM-DD',
        inventoryBorrowed: 'required|string',
        dateDue: 'required|date|date_format:YYYY-MM-DD',
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
        eventName: 'required|string',
        eventType: 'required|string',
        creator: 'required|string',
        date:'required|date|date_format:YYYY-MM-DD',
        ticketed: 'required|boolean',
        cost: 'required|string'
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
        contentTitle: 'required|string',
        contentType: 'required|string',
        contentCreator: 'required|string',
        quantity: 'numeric|min:0|max:100',
        averageCondition: 'string',
        physicalCopy: 'required|boolean'
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