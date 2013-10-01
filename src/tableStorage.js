var q = require("q");
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

module.exports = exports;
