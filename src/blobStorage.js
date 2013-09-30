var q = require('q');

var exports = {};

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
exports.createBlockBlobFromText = function (blobService, container, blobName, text, options) {
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

    if (options) {
        blobService.createBlockBlobFromText(container, blobName, text, options, callback);
    } else {
        blobService.createBlockBlobFromText(container, blobName, text, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will be returned containing information related to the operation.
exports.createBlockBlobFromFile = function (blobService, container, blobName, fileName, options) {
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

    if (options) {
        blobService.createBlockBlobFromFile(container, blobName, fileName, options, callback);
    } else {
        blobService.createBlockBlobFromFile(container, blobName, fileName, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will be returned containing information related to the operation.
exports.createBlockBlobFromStream = function (blobService, container, blobName, stream, streamLength, options) {
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

    if (options) {
        blobService.createBlockBlobFromStream(container, blobName, stream, streamLength, options, callback);
    } else {
        blobService.createBlockBlobFromStream(container, blobName, stream, streamLength, callback);
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
exports.getBlobToText = function (blobService, container, blobName, options) {
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

    if (options) {
        blobService.getBlobToText(container, blobName, options, callback);
    } else {
        blobService.getBlobToText(container, blobName, callback);
    }
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will contain information related to the operation.
exports.getBlobToFile = function (blobService, container, blobName, fileName, options) {
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

    if (options) {
        blobService.getBlobToFile(container, blobName, fileName, options, callback);
    } else {
        blobService.getBlobToFile(container, blobName, fileName, callback);
    }
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains blockBlob and response is returned. 
// As with the Azure API function, `blockBlob` will contain the blob information and 
// `response` will contain information related to the operation.
exports.getBlobToStream = function (blobService, container, blobName, writeStream, options) {
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

    if (options) {
        blobService.getBlobToStream(container, blobName, writeStream, options, callback);
    } else {
        blobService.getBlobToStream(container, blobName, writeStream, callback);
    }
    
    return deferred.promise; 
};

// This is similar to the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
// If there is an error, then a new Error is created with the original error text and included as the argument to the reject call.
// If no error message is returned, then an object literal that contains isSuccessful and response is returned. 
// As with the Azure API function, `isSuccessful` will be true if the delete request succeeded and 
// `response` will contain information related to the operation.
exports.deleteBlob = function (blobService, container, blobName, options) {
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

    if (options) {
        blobService.deleteBlob(container, blobName, options, callback);
    } else {
        blobService.deleteBlob(container, blobName, callback);
    }
    
    return deferred.promise; 
};

module.exports = exports;
