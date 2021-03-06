var q = require("q");
var azure = require("azure");

var exports = {};

var cachedDefaultServiceBus;

var defaultServiceBus = function() {
    if (!cachedDefaultServiceBus) {
        cachedDefaultServiceBus = azure.createServiceBusService();
    }
    return cachedDefaultServiceBus;
};

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
        createTheQueue(defaultServiceBus());
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
exports.createTopicIfNotExists = function (serviceBusOrAllParams, topicPath, options) {
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
            serviceBus.createTopicIfNotExists(topicPath, options, callback);
        } else {
            serviceBus.createTopicIfNotExists(topicPath, callback);
        }
    };

    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        topicPath = serviceBusOrAllParams.topicPath;
        options = serviceBusOrAllParams.options;
        createTheTopic(defaultServiceBus());
    } else {
        createTheTopic(serviceBusOrAllParams);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If there is not an error, `response` will be returned containing information related to the operation.
exports.deleteTopic = function (serviceBus, topicPath, options) {
    var deferred = q.defer();
    var callback = function(error, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    };

    if (options) {
        serviceBus.deleteTopic(topicPath, options, callback);
    } else {
        serviceBus.deleteTopic(topicPath, callback);
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
        exports.createQueueIfNotExists(defaultServiceBus(), queuePath)
            .then(function() {
                sendTheMessage(defaultServiceBus());
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
        exports.createQueueIfNotExists(defaultServiceBus(), queuePath)
            .then(function() {
                receiveTheMessage(defaultServiceBus());
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
        exports.createTopicIfNotExists(serviceBusOrAllParams)
            .then(function() {
                createTheSubscription(defaultServiceBus());
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
            deleteTheSubscription(defaultServiceBus());
        });
    } else {
        deleteTheSubscription(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains createSubscriptionResult and response is returned. 
// As with the Azure API function `receiveTopicMessageResult` is the message and `response` will be returned containing information related to the operation.
exports.sendTopicMessage = function (serviceBusOrAllParams, topicPath, message, options) {
    var deferred = q.defer();
    var callback = function(error, receivetopicmessageresult, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "receiveTopicMessageResult" : receivetopicmessageresult,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var sendTheTopicMessage = function(serviceBus) {
        if (options) {
            serviceBus.sendTopicMessage(topicPath, message, options, callback);
        } else {
            serviceBus.sendTopicMessage(topicPath, message, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        topicPath = serviceBusOrAllParams.topicPath;
        message = serviceBusOrAllParams.message;
        options = serviceBusOrAllParams.options;
        exports.createTopicIfNotExists(serviceBusOrAllParams)
            .then(function() {
                sendTheTopicMessage(defaultServiceBus());
            });
    } else {
        sendTheTopicMessage(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains receiveTopicMessageResult and response is returned. 
exports.receiveSubscriptionMessage = function (serviceBusOrAllParams, topicPath, subscriptionPath, options) {
    var deferred = q.defer();
    var callback = function(error, receivetopicmessageresult, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                        
            var result = {
                "receiveTopicMessageResult" : receivetopicmessageresult,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var receiveTheSubscriptionMessage = function(serviceBus) {
        if (options) {
            serviceBus.receiveSubscriptionMessage(topicPath, subscriptionPath, options, callback);            
        } else {                    
            serviceBus.receiveSubscriptionMessage(topicPath, subscriptionPath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        topicPath = serviceBusOrAllParams.topicPath;
        subscriptionPath = serviceBusOrAllParams.subscriptionPath;
        options = serviceBusOrAllParams.options;
        receiveTheSubscriptionMessage(defaultServiceBus());
    } else {
        receiveTheSubscriptionMessage(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a response is returned. 
exports.deleteMessage = function (serviceBusOrAllParams, message, options) {
    var deferred = q.defer();
    var callback = function(error, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                        
            deferred.resolve(response);
        }
    };

    var deleteTheMessage = function(serviceBus) {
        if (options) {
            serviceBus.deleteMessage(message, options, callback);            
        } else {                    
            serviceBus.deleteMessage(message, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.message) {
        message = serviceBusOrAllParams.message;
        options = serviceBusOrAllParams.options;
        deleteTheMessage(defaultServiceBus());
    } else {
        deleteTheMessage(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a response is returned. 
exports.unlockMessage = function (serviceBusOrAllParams, message, options) {
    var deferred = q.defer();
    var callback = function(error, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                        
            deferred.resolve(response);
        }
    };

    var unlockTheMessage = function(serviceBus) {
        if (options) {
            serviceBus.unlockMessage(message, options, callback);            
        } else {                    
            serviceBus.unlockMessage(message, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.message) {
        message = serviceBusOrAllParams.message;
        options = serviceBusOrAllParams.options;
        unlockTheMessage(defaultServiceBus());
    } else {
        unlockTheMessage(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a getQueueResult and a response is returned. 
exports.getQueue = function (serviceBusOrAllParams, queuePath, options) {
    var deferred = q.defer();
    var callback = function(error, getQueueResult, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                       
            var result = {
                "getQueueResult" : getQueueResult,
                "response" : response
            }; 
            deferred.resolve(result);
        }
    };

    var getTheQueue = function(serviceBus) {
        if (options) {
            serviceBus.getQueue(queuePath, options, callback);            
        } else {                    
            serviceBus.getQueue(queuePath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.queuePath) {
        queuePath = serviceBusOrAllParams.queuePath;
        options = serviceBusOrAllParams.options;
        exports.createQueueIfNotExists(serviceBusOrAllParams)
        .then(function() {
            getTheQueue(defaultServiceBus());
        });    
    } else {
        getTheQueue(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a listQueuesResult and a response is returned. 
exports.listQueues = function (serviceBusOrAllParams, options) {
    var deferred = q.defer();
    var callback = function(error, listQueuesResult, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                       
            var result = {
                "listQueuesResult" : listQueuesResult,
                "response" : response
            }; 
            deferred.resolve(result);
        }
    };

    var listTheQueues = function(serviceBus) {
        if (options) {
            serviceBus.listQueues(options, callback);            
        } else {                    
            serviceBus.listQueues(callback);
        }
    };
    
    if (!serviceBusOrAllParams || (serviceBusOrAllParams && serviceBusOrAllParams.options)) {
        if (serviceBusOrAllParams && serviceBusOrAllParams.options) {
            options = serviceBusOrAllParams.options;
        }
        listTheQueues(defaultServiceBus());
    } else {
        listTheQueues(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a getTopicResult and a response is returned. 
exports.getTopic = function (serviceBusOrAllParams, topicPath, options) {
    var deferred = q.defer();
    var callback = function(error, getTopicResult, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                       
            var result = {
                "getTopicResult" : getTopicResult,
                "response" : response
            }; 
            deferred.resolve(result);
        }
    };

    var getTheTopic = function(serviceBus) {
        if (options) {
            serviceBus.getTopic(topicPath, options, callback);            
        } else {                    
            serviceBus.getTopic(topicPath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        topicPath = serviceBusOrAllParams.topicPath;
        options = serviceBusOrAllParams.options;
        exports.createTopicIfNotExists(serviceBusOrAllParams)
        .then(function() {
            getTheTopic(defaultServiceBus());
        });    
    } else {
        getTheTopic(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a listTopicsResult and a response is returned. 
exports.listTopics = function (serviceBusOrAllParams, options) {
    var deferred = q.defer();
    var callback = function(error, listTopicsResult, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                       
            var result = {
                "listTopicsResult" : listTopicsResult,
                "response" : response
            }; 
            deferred.resolve(result);
        }
    };

    var listTheTopics = function(serviceBus) {
        if (options) {
            serviceBus.listTopics(options, callback);            
        } else {                    
            serviceBus.listTopics(callback);
        }
    };
    
    if (!serviceBusOrAllParams || (serviceBusOrAllParams && serviceBusOrAllParams.options)) {
        if (serviceBusOrAllParams && serviceBusOrAllParams.options) {
            options = serviceBusOrAllParams.options;
        }
        listTheTopics(defaultServiceBus());
    } else {
        listTheTopics(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a getSubscriptionResult and a response is returned. 
exports.getSubscription = function (serviceBusOrAllParams, topicPath, subscriptionPath, options) {
    var deferred = q.defer();
    var callback = function(error, getSubscriptionResult, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                       
            var result = {
                "getSubscriptionResult" : getSubscriptionResult,
                "response" : response
            }; 
            deferred.resolve(result);
        }
    };

    var getTheSubscription = function(serviceBus) {
        if (options) {
            serviceBus.getSubscription(topicPath, subscriptionPath, options, callback);            
        } else {                    
            serviceBus.getSubscription(topicPath, subscriptionPath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        topicPath = serviceBusOrAllParams.topicPath;
        subscriptionPath = serviceBusOrAllParams.subscriptionPath;
        options = serviceBusOrAllParams.options;
        exports.createTopicIfNotExists(serviceBusOrAllParams)
        .then(function() {
            getTheSubscription(defaultServiceBus());
        });    
    } else {
        getTheSubscription(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then a listSubscriptionsResult and a response is returned. 
exports.listSubscriptions = function (serviceBusOrAllParams, topicPath, options) {
    var deferred = q.defer();
    var callback = function(error, listSubscriptionsResult, response) {        
        if (error) {
            deferred.reject(new Error(error));
        } else {                       
            var result = {
                "listSubscriptionsResult" : listSubscriptionsResult,
                "response" : response
            }; 
            deferred.resolve(result);
        }
    };

    var listTheSubscriptions = function(serviceBus) {
        if (options) {
            serviceBus.listSubscriptions(topicPath, options, callback);            
        } else {                    
            serviceBus.listSubscriptions(topicPath, callback);
        }
    };
    
    if (serviceBusOrAllParams && serviceBusOrAllParams.topicPath) {
        options = serviceBusOrAllParams.options;
        topicPath = serviceBusOrAllParams.topicPath;
        exports.createTopicIfNotExists(serviceBusOrAllParams)
        .then(function() {
            listTheSubscriptions(defaultServiceBus());
        });    
    } else {
        listTheSubscriptions(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

module.exports = exports;
