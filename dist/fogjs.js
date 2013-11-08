var q = require('q');
var azure = require('azure');

var exports = {};

var defaultBlobService = azure.createBlobService();

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains containerCreated and response is returned. 
// As with the Azure API function, `containerCreated` will contain a boolean to indicate success and
// `response` will be returned containing information related to the operation.
exports.createContainerIfNotExists = function (blobService, container, options) {
    var deferred = q.defer();
    var callback = function(error, containerCreated, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "containerCreated" : containerCreated,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    if (options) {
        blobService.createContainerIfNotExists(container, options, callback);
    } else {
        blobService.createContainerIfNotExists(container, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will be returned containing information related to the operation.
exports.createBlockBlobFromText = function (blobServiceOrAllParams, container, blobName, text, options) {
    var deferred = q.defer();
    var callback = function(error, blockBlob, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "blockBlob" : blockBlob,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var createTheBlob = function(blobService) {
        if (options) {
            blobService.createBlockBlobFromText(container, blobName, text, options, callback);
        } else {
            blobService.createBlockBlobFromText(container, blobName, text, callback);
        }
    };

    if (blobServiceOrAllParams && blobServiceOrAllParams.containerName) {
        container = blobServiceOrAllParams.containerName;
        blobName = blobServiceOrAllParams.blobName;
        text = blobServiceOrAllParams.blobText;
        options = blobServiceOrAllParams.options;
        defaultBlobService.createContainerIfNotExists(container, {publicAccessLevel : 'blob'}, function (error) {
            createTheBlob(defaultBlobService);
        });
    } else {
        createTheBlob(blobServiceOrAllParams);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will be returned containing information related to the operation.
exports.createBlockBlobFromFile = function (blobServiceOrAllParams, container, blobName, fileName, options) {
    var deferred = q.defer();
    var callback = function(error, blockBlob, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "blockBlob" : blockBlob,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var createTheBlob = function(blobService) {
        if (options) {
            blobService.createBlockBlobFromFile(container, blobName, fileName, options, callback);
        } else {
            blobService.createBlockBlobFromFile(container, blobName, fileName, callback);
        }
    };
    
    if (blobServiceOrAllParams && blobServiceOrAllParams.containerName) {
        container = blobServiceOrAllParams.containerName;
        blobName = blobServiceOrAllParams.blobName;
        fileName = blobServiceOrAllParams.fileName;
        options = blobServiceOrAllParams.options;
        exports.createContainerIfNotExists(defaultBlobService, container, {publicAccessLevel : 'blob'})
            .then(function() {
                createTheBlob(defaultBlobService);
            });
    } else {
        createTheBlob(blobServiceOrAllParams);
    }

    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will be returned containing information related to the operation.
exports.createBlockBlobFromStream = function (blobServiceOrAllParams, container, blobName, stream, streamLength, options) {
    var deferred = q.defer();
    var callback = function(error, blockBlob, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "blockBlob" : blockBlob,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var createTheBlob = function(blobService) {
        if (options) {
            blobService.createBlockBlobFromStream(container, blobName, stream, streamLength, options, callback);
        } else {
            blobService.createBlockBlobFromStream(container, blobName, stream, streamLength, callback);
        }
    };
    
    if (blobServiceOrAllParams && blobServiceOrAllParams.containerName) {
        container = blobServiceOrAllParams.containerName;
        blobName = blobServiceOrAllParams.blobName;
        stream = blobServiceOrAllParams.stream;
        streamLength = blobServiceOrAllParams.streamLength;
        options = blobServiceOrAllParams.options;
        exports.createContainerIfNotExists(defaultBlobService, container, {publicAccessLevel : 'blob'})
            .then(function() {
                createTheBlob(defaultBlobService);
            });
    } else {
        createTheBlob(blobServiceOrAllParams);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If there is not an error, `response` will be returned containing information related to the operation.
exports.deleteContainer = function (blobService, container, options) {
    var deferred = q.defer();
    var callback = function(error, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    };

    if (options) {
        blobService.deleteContainer(container, options, callback);
    } else {
        blobService.deleteContainer(container, callback);
    }
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains text, blockBlob, and response is returned. 
// As with the Azure API function, `text` will contain the blob contents, `blockBlob` will contain the blob information and 
// `response` will contain information related to the operation.
exports.getBlobToText = function (blobServiceOrAllParams, container, blobName, options) {
    var deferred = q.defer();
    var callback = function(error, text, blockBlob, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "text" : text,
                "blockBlob" : blockBlob,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var getTheBlob = function(blobService) {
        if (options) {
            blobService.getBlobToText(container, blobName, options, callback);
        } else {
            blobService.getBlobToText(container, blobName, callback);
        }
    };
    
    if (blobServiceOrAllParams && blobServiceOrAllParams.containerName) {
        container = blobServiceOrAllParams.containerName;
        blobName = blobServiceOrAllParams.blobName;
        options = blobServiceOrAllParams.options;
        defaultBlobService.createContainerIfNotExists(container, {publicAccessLevel : 'blob'}, function (error) {
            getTheBlob(defaultBlobService);
        });
    } else {
        getTheBlob(blobServiceOrAllParams);
    }
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will contain information related to the operation.
exports.getBlobToFile = function (blobServiceOrAllParams, container, blobName, fileName, options) {
    var deferred = q.defer();
    var callback = function(error, blockBlob, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "blockBlob" : blockBlob,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var getTheBlob = function(blobService) {
        if (options) {
            blobService.getBlobToFile(container, blobName, fileName, options, callback);
        } else {
            blobService.getBlobToFile(container, blobName, fileName, callback);
        }
    };
    
    if (blobServiceOrAllParams && blobServiceOrAllParams.containerName) {
        container = blobServiceOrAllParams.containerName;
        blobName = blobServiceOrAllParams.blobName;
        fileName = blobServiceOrAllParams.fileName;
        options = blobServiceOrAllParams.options;
        exports.createContainerIfNotExists(defaultBlobService, container, {publicAccessLevel : 'blob'})
            .then(function() {
                getTheBlob(defaultBlobService);
            });
    } else {
        getTheBlob(blobServiceOrAllParams);
    }
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will contain information related to the operation.
exports.getBlobToStream = function (blobServiceOrAllParams, container, blobName, writeStream, options) {
    var deferred = q.defer();
    var callback = function(error, blockBlob, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "blockBlob" : blockBlob,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var getTheBlob = function(blobService) {
        if (options) {
            blobService.getBlobToStream(container, blobName, writeStream, options, callback);
        } else {
            blobService.getBlobToStream(container, blobName, writeStream, callback);
        }
    };
    
    if (blobServiceOrAllParams && blobServiceOrAllParams.containerName) {
        container = blobServiceOrAllParams.containerName;
        blobName = blobServiceOrAllParams.blobName;
        writeStream = blobServiceOrAllParams.writeStream;
        options = blobServiceOrAllParams.options;
        exports.createContainerIfNotExists(defaultBlobService, container, {publicAccessLevel : 'blob'})
            .then(function() {
                getTheBlob(defaultBlobService);
            });
    } else {
        getTheBlob(blobServiceOrAllParams);
    }

    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains isSuccessful and response is returned. 
// As with the Azure API function, `isSuccessful` will be true if the delete request succeeded and 
// `response` will contain information related to the operation.
exports.deleteBlob = function (blobServiceOrAllParams, container, blobName, options) {
    var deferred = q.defer();
    var callback = function(error, isSuccessful, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "isSuccessful" : isSuccessful,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var deleteTheBlob = function(blobService) {
        if (options) {
            blobService.deleteBlob(container, blobName, options, callback);
        } else {
            blobService.deleteBlob(container, blobName, callback);
        }
    };
    
    if (blobServiceOrAllParams && blobServiceOrAllParams.containerName) {
        container = blobServiceOrAllParams.containerName;
        blobName = blobServiceOrAllParams.blobName;
        options = blobServiceOrAllParams.options;
        exports.createContainerIfNotExists(defaultBlobService, container, {publicAccessLevel : 'blob'})
            .then(function() {
                deleteTheBlob(defaultBlobService);
            });
    } else {
        deleteTheBlob(blobServiceOrAllParams);
    }
    
    return deferred.promise; 
};

module.exports = exports;
;var q = require("q");
var azure = require("azure");

var exports = {};

var defaultServiceBus = azure.createServiceBusService();

var receivePullSubscriptions = [];

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
        createTheTopic(defaultServiceBus);
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
        exports.createTopicIfNotExists(serviceBusOrAllParams)
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

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains createSubscriptionResult and response is returned. 
// As with the Azure API function `createSubscriptionResult` is the message and `response` will be returned containing information related to the operation.
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
                sendTheTopicMessage(defaultServiceBus);
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
        receiveTheSubscriptionMessage(defaultServiceBus);
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
        deleteTheMessage(defaultServiceBus);
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
        unlockTheMessage(defaultServiceBus);
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
        getTheQueue(defaultServiceBus);
    } else {
        getTheQueue(serviceBusOrAllParams);
    }    
    
    return deferred.promise; 
};

module.exports = exports;
;var q = require("q");
var azure = require("azure");

var exports = {};

var defaultTableService = azure.createTableService();

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains created and response is returned. 
// As with the Azure API function, `created` will contain a boolean to indicate success and
// `response` will be returned containing information related to the operation.
exports.createTableIfNotExists = function (tableService, tableName, options) {
    var deferred = q.defer();
    var callback = function(error, created, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "created" : created,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    if (options) {
        tableService.createTableIfNotExists(tableName, options, callback);
    } else {
        tableService.createTableIfNotExists(tableName, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If there is not an error, `successful` will be true and `response` will be returned containing information related to the operation.
exports.deleteTable = function (tableService, tableName, options) {
    var deferred = q.defer();
    var callback = function(error, successful, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "successful": successful,
                "response": response
            };
            deferred.resolve(response);
        }
    };

    if (options) {
        tableService.deleteTable(tableName, options, callback);
    } else {
        tableService.deleteTable(tableName, callback);
    }
    
    return deferred.promise; 
};

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

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains successful and response is returned. 
// As with the Azure API function, `successful` will contain true and
// `response` will be returned containing information related to the operation.
exports.deleteEntity = function (tableServiceOrAllParams, tableName, entityDescriptor, options) {
    var deferred = q.defer();
    var callback = function(error, successful, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "successful" : successful,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var deleteTheEntity = function(tableService) {
        if (options) {
            tableService.deleteEntity(tableName, entityDescriptor, options, callback);
        } else {
            tableService.deleteEntity(tableName, entityDescriptor, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableName) {
        tableName = tableServiceOrAllParams.tableName;
        entityDescriptor = tableServiceOrAllParams.entityDescriptor;
        options = tableServiceOrAllParams.options;
        exports.createTableIfNotExists(defaultTableService, tableName)
            .then(function() {
                deleteTheEntity(defaultTableService);
            });
    } else {
        deleteTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function, `entity` will contain the entity and
// `response` will be returned containing information related to the operation.
exports.queryEntity = function (tableServiceOrAllParams, tableName, partitionKey, rowKey, options) {
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

    var queryTheEntity = function(tableService) {
        if (options) {
            tableService.queryEntity(tableName, partitionKey, rowKey, options, callback);
        } else {
            tableService.queryEntity(tableName, partitionKey, rowKey, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableName) {
        tableName = tableServiceOrAllParams.tableName;
        partitionKey = tableServiceOrAllParams.entityDescriptor.PartitionKey;
        rowKey = tableServiceOrAllParams.entityDescriptor.RowKey;
        options = tableServiceOrAllParams.options;
        exports.createTableIfNotExists(defaultTableService, tableName)
            .then(function() {
                queryTheEntity(defaultTableService);
            });
    } else {
        queryTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function, `entities` will contain the entity, `queryResultContinuation` will contain a continuation token that can be used
// to retrieve the next set of results and `response` will be returned containing information related to the operation.
exports.queryEntities = function (tableServiceOrAllParams, tableQuery, options) {
    var deferred = q.defer();
    var callback = function(error, entities, queryResultContinuation, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            var result = {
                "entities" : entities,
                "queryResultContinuation" : queryResultContinuation,
                "response" : response
            };
            deferred.resolve(result);
        }
    };

    var queryTheEntities = function(tableService) {
        if (options) {
            tableService.queryEntities(tableQuery, options, callback);
        } else {
            tableService.queryEntities(tableQuery, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableQuery) {
        tableQuery = tableServiceOrAllParams.tableQuery;
        options = tableServiceOrAllParams.options;
        queryTheEntities(defaultTableService);
    } else {
        queryTheEntities(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function, `entity` will contain the entity and
// `response` will be returned containing information related to the operation.
exports.updateEntity = function (tableServiceOrAllParams, tableName, entity, options) {
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

    var updateTheEntity = function(tableService) {
        if (options) {
            tableService.updateEntity(tableName, entity, options, callback);
        } else {
            tableService.updateEntity(tableName, entity, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableName) {
        tableName = tableServiceOrAllParams.tableName;
        entity = tableServiceOrAllParams.entity;
        options = tableServiceOrAllParams.options;
        updateTheEntity(defaultTableService);
    } else {
        updateTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function, `entity` will contain the entity and
// `response` will be returned containing information related to the operation.
exports.mergeEntity = function (tableServiceOrAllParams, tableName, entity, options) {
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

    var mergeTheEntity = function(tableService) {
        if (options) {
            tableService.mergeEntity(tableName, entity, options, callback);
        } else {
            tableService.mergeEntity(tableName, entity, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableName) {
        tableName = tableServiceOrAllParams.tableName;
        entity = tableServiceOrAllParams.entity;
        options = tableServiceOrAllParams.options;
        mergeTheEntity(defaultTableService);
    } else {
        mergeTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function, `entity` will contain the entity and
// `response` will be returned containing information related to the operation.
exports.insertOrReplaceEntity = function (tableServiceOrAllParams, tableName, entity, options) {
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

    var insertOrReplaceTheEntity = function(tableService) {
        if (options) {
            tableService.insertOrReplaceEntity(tableName, entity, options, callback);
        } else {
            tableService.insertOrReplaceEntity(tableName, entity, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableName) {
        tableName = tableServiceOrAllParams.tableName;
        entity = tableServiceOrAllParams.entity;
        options = tableServiceOrAllParams.options;
        insertOrReplaceTheEntity(defaultTableService);
    } else {
        insertOrReplaceTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains entity and response is returned. 
// As with the Azure API function, `entity` will contain the entity and
// `response` will be returned containing information related to the operation.
exports.insertOrMergeEntity = function (tableServiceOrAllParams, tableName, entity, options) {
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

    var insertOrMergeTheEntity = function(tableService) {
        if (options) {
            tableService.insertOrMergeEntity(tableName, entity, options, callback);
        } else {
            tableService.insertOrMergeEntity(tableName, entity, callback);
        }
    };
    
    if (tableServiceOrAllParams && tableServiceOrAllParams.tableName) {
        tableName = tableServiceOrAllParams.tableName;
        entity = tableServiceOrAllParams.entity;
        options = tableServiceOrAllParams.options;
        insertOrMergeTheEntity(defaultTableService);
    } else {
        insertOrMergeTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

module.exports = exports;
