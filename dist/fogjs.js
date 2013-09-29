var q = require('q');

var exports = {};

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

module.exports = exports;
;var exports = {};

exports.test = function () {
	return 1;
};

module.exports = exports;