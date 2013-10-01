var assert = require("assert");
var fog = require("../src/tableStorage.js");
var azure = require("azure");
var fs = require("fs");
var tableService = azure.createTableService();
var tableName = "testtable";

describe("TableStorage", function() {
    this.timeout(10000);

    after(function(done) {
        fog.deleteTable(tableService, tableName)
            .then(function(response) {
                done();
            });
    });
   
    describe("When creating a table with promises", function() {
        it ('it should return success.', function(done) {
            fog.createTableIfNotExists(tableService, tableName)
                .then(function(response) {
                    assert.equal(response.created, true);
                    done();
                });
        });
    });
    
    var createEntity = function(entityKey) {
        return fog.createTableIfNotExists(tableService, tableName)
                   .then(function() {
                        var testEntity = {
                            "PartitionKey" : "testPartition",
                            "RowKey" : entityKey,
                            "MyCustomField" : "Legends of Awesomeness!"
                        };
                        return fog.insertEntity(tableService, tableName, testEntity);
                    });
    };

    describe("When creating an entity with promises", function() {
        it ('it should return an entity with key of 1.', function(done) {
            createEntity("1").then(function(response) {
                    assert.equal(response.entity.RowKey, "1");
                    done();
                });
        });
    });
    
    describe("When creating an entity with simple syntax", function() {
        it ('it should return an entity with key of 2.', function(done) {
            var testTableName2 = tableName + "2";
            fog.insertEntity({
                "tableName" : testTableName2,
                "entity": {
                    "PartitionKey" : "testPartition",
                    "RowKey" : "2",
                    "MyCustomField" : "Legends of Awesomeness!"
                }
            }).then(function(response){
                assert.equal(response.entity.RowKey, "2");
                return fog.deleteTable(tableService, testTableName2);
            }).then(done());
        });
    });
    
    // Test for deleteEntity with promise
    describe("When deleting an entity with promises", function() {
        it ('it should return true in the successful property.', function(done) {
            var rowKey = "3";
            createEntity(rowKey)
                .then(function(response) {
                    var entityDescriptor = {  
                        "PartitionKey" : "testPartition",
                        "RowKey" : rowKey,
                    };
                    return fog.deleteEntity(tableService, tableName, entityDescriptor);
                }).then(function(response) {
                    assert.equal(response.successful, true);
                    done();
                });
        });
    });
    
    // Test for deleteEntity with simple syntax
    describe("When deleting an entity with promises and a simple syntax", function() {
        it ('it should return true in the successful property.', function(done) {
            var rowKey = "4";
            createEntity(rowKey)
                .then(function(response) {
                    return fog.deleteEntity({
                        "tableName" : tableName, 
                        "entityDescriptor": {  
                            "PartitionKey" : "testPartition",
                            "RowKey" : rowKey,
                        }
                    });
                }).then(function(response) {
                    assert.equal(response.successful, true);
                    done();
                });
        });
    });
    
    // Test queryEntity with promise
    describe("When querying an entity with promises", function() {
        it ('it should return an entity with key of 5.', function(done) {
            var rowKey = "5";
            var partitionKey = "testPartition";
            createEntity(rowKey)
                .then(function(response) {
                    return fog.queryEntity(tableService, tableName, partitionKey, rowKey);
                }).then(function(response) {
                    assert.equal(response.entity.RowKey, rowKey);
                    return fog.deleteEntity({
                        "tableName" : tableName, 
                        "entityDescriptor": {  
                            "PartitionKey" : partitionKey,
                            "RowKey" : rowKey,
                        }
                    });
                }).then(done());
        });
    });
    
    // Test queryEntity with simple syntax
    describe("When querying an entity with simple syntax", function() {
        it ('it should return an entity with key of 6.', function(done) {
            var rowKey = "6";
            var partitionKey = "testPartition";
            createEntity(rowKey)
                .then(function(response) {
                    return  fog.queryEntity({
                            "tableName" : tableName, 
                            "entityDescriptor": {  
                                    "PartitionKey" : partitionKey,
                                    "RowKey" : rowKey,
                                }
                            });
                }).then(function(response) {
                    assert.equal(response.entity.RowKey, rowKey);
                    return fog.deleteEntity({
                        "tableName" : tableName, 
                        "entityDescriptor": {  
                                "PartitionKey" : partitionKey,
                                "RowKey" : rowKey,
                            }
                        });
                }).then(done());
        });
    });
    
    // Test queryEntities with promise
    describe("When querying entities with promises", function() {
        it ('it should return more than one entity.', function(done) {
            var rowKey = "7";
            var partitionKey = "testPartition";
            createEntity(rowKey)
                .then(function(response) {
                    var query = azure.TableQuery
                        .select("MyCustomField")
                        .from(tableName)
                        .where("PartitionKey eq ?", partitionKey);
                    return fog.queryEntities(tableService, query);
                }).then(function(response) {
                    assert(response.entities.length > 1, rowKey);
                    done();
                });
        });
    });
    
    // Test queryEntities with simple syntax
    describe("When querying entities with simple syntax", function() {
        it ('it should return more than one entity.', function(done) {
            var rowKey = "8";
            var partitionKey = "testPartition";
            createEntity(rowKey)
                .then(function(response) {
                    var query = azure.TableQuery
                        .select("MyCustomField")
                        .from(tableName)
                        .where("PartitionKey eq ?", partitionKey);
                    return fog.queryEntities({"tableQuery" : query});
                }).then(function(response) {
                    assert(response.entities.length > 1, rowKey);
                    done();
                });
        });
    });

    // Test for updateEntity with promise
    
    // Test for updateEntity with simple syntax
    
    // Test for mergeEntity with promise
    
    // Test for mergeEntity with simple syntax
    
    // Test insertOrReplaceEntity with promise
    
    // Test insertOrReplaceEntity with simple syntax
    
    // Test insertOrMergEntity with promise
    
    // Test insertOrMergEntity with simple syntax
    
    // Test commitBatch with promise
    
    // Test commitBatch with simple syntax?
    
});    