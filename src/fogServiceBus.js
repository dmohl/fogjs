var q = require("q");
var azure = require("azure");

var exports = {};

var defaultServiceBus = azure.createServiceBusService();

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains created and response is returned. 
// As with the Azure API function, `queueCreated` will contain a boolean to indicate success and
// `response` will be returned containing information related to the operation.
exports.createQueueIfNotExists = function (serviceBus, queueName, options) {
    var deferred = q.defer();
    var callback = function(error, queueCreated, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "queueCreated" : queueCreated,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    if (options) {
        serviceBus.createQueueIfNotExists(queueName, options, callback);
    } else {
        serviceBus.createQueueIfNotExists(queueName, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If there is not an error, `successful` will be true and `response` will be returned containing information related to the operation.
exports.deleteQueue = function (serviceBus, queueName, options) {
    var deferred = q.defer();
    var callback = function(error, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    };

    if (options) {
        serviceBus.deleteQueue(queueName, options, callback);
    } else {
        serviceBus.deleteQueue(queueName, callback);
    }
    
    return deferred.promise; 
};

/*
// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function, `entity` will contain the entity and
// `response` will be returned containing information related to the operation.
exports.insertEntity = function (tableServiceOrAllParams, tableName, entity, options) {
    var deferred = q.defer();
    var callback = function(error, entity, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "entity" : entity,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var insertTheEntity = function(tableService) {
        if (options) {
            tableService.insertEntity(tableName, entity, options, callback);
        } else {
            tableService.insertEntity(tableName, entity, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableName) {
        tableName = tableServiceOrAllParams.tableName;
        entity = tableServiceOrAllParams.entity;
        options = tableServiceOrAllParams.options;
        exports.createTableIfNotExists(defaultTableService, tableName)
            .then(function() {
                insertTheEntity(defaultTableService);
            });
    } else {
        insertTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};
*/

module.exports = exports;
