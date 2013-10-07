var q = require("q");
var azure = require("azure");

var exports = {};

var defaultServiceBus = azure.createServiceBusService();

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains created and response is returned. 
// As with the Azure API function, `queueCreated` will contain a boolean to indicate success and
// `response` will be returned containing information related to the operation.
exports.createQueueIfNotExists = function (serviceBusOrAllParams, queuePath, options) {
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

    var createTheQueue = function(serviceBus) {
        if (options) {
            serviceBus.createQueueIfNotExists(queuePath, options, callback);
        } else {
            serviceBus.createQueueIfNotExists(queuePath, callback);
        }
    };

    if (serviceBusOrAllParams && serviceBusOrAllParams.queuePath) {
        queuePath = serviceBusOrAllParams.queuePath;
        options = serviceBusOrAllParams.options;
        createTheQueue(defaultServiceBus);
    } else {
        createTheQueue(serviceBusOrAllParams);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If there is not an error, `successful` will be true and `response` will be returned containing information related to the operation.
exports.deleteQueue = function (serviceBus, queuePath, options) {
    var deferred = q.defer();
    var callback = function(error, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    };

    if (options) {
        serviceBus.deleteQueue(queuePath, options, callback);
    } else {
        serviceBus.deleteQueue(queuePath, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function `response` will be returned containing information related to the operation.
exports.sendQueueMessage = function (serviceBusOrAllParams, queuePath, message, options) {
    var deferred = q.defer();
    var callback = function(error, entity, response) {
        if (error) {
            console.log("here");
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    };

    var sendTheMessage = function(serviceBus) {
        if (options) {
            serviceBus.sendQueueMessage(queuePath, message, options, callback);
        } else {
            serviceBus.sendQueueMessage(queuePath, message, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.queuePath) {
        queuePath = serviceBusOrAllParams.queuePath;
        message = serviceBusOrAllParams.message;
        options = serviceBusOrAllParams.options;
        exports.createQueueIfNotExists(defaultServiceBus, queuePath)
            .then(function() {
                sendTheMessage(defaultServiceBus);
            });
    } else {
        sendTheMessage(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

module.exports = exports;
