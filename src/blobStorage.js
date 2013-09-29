var q = require('q');

var exports = {};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
exports.createContainerIfNotExists = function (blobService, container, options) {
    var deferred = q.defer();
    var callback = function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
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
exports.createBlockBlobFromText = function (blobService, container, blobName, text, options) {
    var deferred = q.defer();
    var callback = function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
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
exports.createBlockBlobFromFile = function (blobService, container, blobName, fileName, options) {
    var deferred = q.defer();
    var callback = function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
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
exports.createBlockBlobFromStream = function (blobService, container, blobName, stream, streamLength, options) {
    var deferred = q.defer();
    var callback = function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
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
exports.deleteContainer = function (blobService, container, options) {
    var deferred = q.defer();
    var callback = function(error) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve();
        }
    };

    if (options) {
        blobService.deleteContainer(container, options, callback);
    } else {
        blobService.deleteContainer(container, callback);
    }
    
    return deferred.promise; 
};

// This is the same as the Azure API function with the same name; however, it uses promises instead of callbacks.
exports.getBlobToText = function (blobService, container, blobName, options) {
    var deferred = q.defer();
    var callback = function(error, text, blockBlob, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(error, text, blockBlob, response);
        }
    };

    if (options) {
        blobService.getBlobToText(container, blobName, options, callback);
    } else {
        blobService.getBlobToText(container, blobName, callback);
    }
    
    return deferred.promise; 
};

module.exports = exports;
