var q = require("q");
var azure = require("azure");

var exports = {};

var cacheddefaultTableService;

var defaultTableService = function() {
    if (!cacheddefaultTableService) {
        cacheddefaultTableService = azure.createTableService();
    }
    return cacheddefaultTableService;
};

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
        exports.createTableIfNotExists(defaultTableService(), tableName)
            .then(function() {
                insertTheEntity(defaultTableService());
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
        exports.createTableIfNotExists(defaultTableService(), tableName)
            .then(function() {
                deleteTheEntity(defaultTableService());
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
        exports.createTableIfNotExists(defaultTableService(), tableName)
            .then(function() {
                queryTheEntity(defaultTableService());
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
        queryTheEntities(defaultTableService());
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
        updateTheEntity(defaultTableService());
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
        mergeTheEntity(defaultTableService());
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
        insertOrReplaceTheEntity(defaultTableService());
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
        insertOrMergeTheEntity(defaultTableService());
    } else {
        insertOrMergeTheEntity(tableServiceOrAllParams);
    }    
    
    return deferred.promise; 
};

module.exports = exports;
