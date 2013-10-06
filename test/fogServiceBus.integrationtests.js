var assert = require("assert");
var fog = require("../src/fogServiceBus.js");
var azure = require("azure");
var serviceBus = azure.createServiceBusService();
var queueName = "testQueue";

describe("Service Bus Tests", function() {
    this.timeout(10000);

    after(function(done) {
        fog.deleteQueue(serviceBus, queueName)
            .then(function(response) {
                done();
            });
    });
   
    // Create queue with a promise.
    describe("When creating a queue with promises", function() {
        it ('it should return success.', function(done) {
            fog.createQueueIfNotExists(serviceBus, queueName)
                .then(function(response) {
                    assert.equal(response.queueCreated, true);
                    done();
                });
        });
    });    
    
    // Create queue with simple syntax
});