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
    
    // Test for deleteEntity with simple syntax
    
    // Test queryEntity with promise
    
    // Test queryEntity with simple syntax
    
    // Test queryEntities with promise
    
    // Test queryEntities with simple syntax

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