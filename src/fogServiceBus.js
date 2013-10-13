var q = require("q");
var azure = require("azure");

var exports = {};

var defaultServiceBus = azure.createServiceBusService();

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains queueCreated and response is returned. 
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
// If there is not an error, `response` will be returned containing information related to the operation.
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
// If no error message is returned, then an object literal that contains topicCreated and response is returned. 
// As with the Azure API function, `topicCreated` will contain a boolean to indicate success and
// `response` will be returned containing information related to the operation.
exports.createTopicIfNotExists = function (serviceBusOrAllParams, topic, options) {
    var deferred = q.defer();
    var callback = function(error, topicCreated, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "topicCreated" : topicCreated,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var createTheTopic = function(serviceBus) {
        if (options) {
            serviceBus.createTopicIfNotExists(topic, options, callback);
        } else {
            serviceBus.createTopicIfNotExists(topic, callback);
        }
    };

    if (serviceBusOrAllParams && serviceBusOrAllParams.topic) {
        topic = serviceBusOrAllParams.topic;
        options = serviceBusOrAllParams.options;
        createTheTopic(defaultServiceBus);
    } else {
        createTheTopic(serviceBusOrAllParams);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If there is not an error, `response` will be returned containing information related to the operation.
exports.deleteTopic = function (serviceBus, topic, options) {
    var deferred = q.defer();
    var callback = function(error, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    };

    if (options) {
        serviceBus.deleteTopic(topic, options, callback);
    } else {
        serviceBus.deleteTopic(topic, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains response is returned. 
// As with the Azure API function `response` will be returned containing information related to the operation.
exports.sendQueueMessage = function (serviceBusOrAllParams, queuePath, message, options) {
    var deferred = q.defer();
    var callback = function(error, response) {
        if (error) {
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

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains receivedMessage and response is returned. 
// As with the Azure API function `receivedMessage` is the message and `response` will be returned containing information related to the operation.
exports.receiveQueueMessage = function (serviceBusOrAllParams, queuePath, options) {
    var deferred = q.defer();
    var callback = function(error, receivedMessage, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "receivedMessage" : receivedMessage,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var receiveTheMessage = function(serviceBus) {
        if (options) {
            serviceBus.receiveQueueMessage(queuePath, options, callback);
        } else {
            serviceBus.receiveQueueMessage(queuePath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.queuePath) {
        queuePath = serviceBusOrAllParams.queuePath;
        options = serviceBusOrAllParams.options;
        exports.createQueueIfNotExists(defaultServiceBus, queuePath)
            .then(function() {
                receiveTheMessage(defaultServiceBus);
            });
    } else {
        receiveTheMessage(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains createSubscriptionResult and response is returned. 
// As with the Azure API function `createSubscriptionResult` is the message and `response` will be returned containing information related to the operation.
exports.createSubscription = function (serviceBusOrAllParams, topicPath, subscriptionPath, options) {
    var deferred = q.defer();
    var callback = function(error, createSubscriptionResult, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "createSubscriptionResult" : createSubscriptionResult,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var createTheSubscription = function(serviceBus) {
        if (options) {
            serviceBus.createSubscription(topicPath, subscriptionPath, options, callback);
        } else {
            serviceBus.createSubscription(topicPath, subscriptionPath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        topicPath = serviceBusOrAllParams.topicPath;
        subscriptionPath = serviceBusOrAllParams.subscriptionPath;
        options = serviceBusOrAllParams.options;
        exports.createTopicIfNotExists(defaultServiceBus, topicPath)
            .then(function() {
                createTheSubscription(defaultServiceBus);
            });
    } else {
        createTheSubscription(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains response is returned. 
// As with the Azure API function `response` will be returned containing information related to the operation.
exports.deleteSubscription = function (serviceBusOrAllParams, topicPath, subscriptionPath, options) {
    var deferred = q.defer();
    var callback = function(error, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    };

    var deleteTheSubscription = function(serviceBus) {
        if (options) {
            serviceBus.deleteSubscription(topicPath, subscriptionPath, options, callback);
        } else {
            serviceBus.deleteSubscription(topicPath, subscriptionPath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        topicPath = serviceBusOrAllParams.topicPath;
        subscriptionPath = serviceBusOrAllParams.subscriptionPath;
        options = serviceBusOrAllParams.options;
        exports.createSubscription(serviceBusOrAllParams)
        .then(function() {
            deleteTheSubscription(defaultServiceBus);
        });
    } else {
        deleteTheSubscription(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

module.exports = exports;
