var assert = require("assert");
var fog = require("../src/fogServiceBus.js");
var azure = require("azure");
var serviceBus = azure.createServiceBusService();
var queueName = "testQueue";
var topicName = "testTopic";
var subscriptionPath = "testSubPath";

describe("Service Bus Tests", function() {
    this.timeout(10000);

    after(function(done) {
        fog.deleteQueue(serviceBus, queueName)
            .then(function(response) {
                done();
            });
        fog.deleteTopic(serviceBus, topicName);    
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
    
    // Create queue with alternate syntax
    describe("When creating a queue with alternate syntax", function() {
        it ('it should return success.', function(done) {
            var queueName2 = "testName2";
            fog.createQueueIfNotExists({"queuePath" : queueName2})
                .then(function(response) {
                    assert.equal(response.queueCreated, true);
                    fog.deleteQueue(serviceBus, queueName2);
                    done();
                });
        });
    });   

    // Send a message to a valid queue with a promise.
    describe("When sending a message to a queue with promises", function() {
        this.timeout(20000);
        it ('it should not throw an error.', function(done) {
            fog.createQueueIfNotExists(serviceBus, queueName)
            .then(function(response) {
                return fog.sendQueueMessage(serviceBus, queueName, "Test Message");
            }).then(function() {
                done();
            });
        });
    });    

    // Send a message to an invalid queue with a promise.
    describe("When sending a message to an invalid queue with promises", function() {
        it ('it should throw an error.', function(done) {
            fog.sendQueueMessage(serviceBus, "InvalidQueue", "Test Message")
            .catch(function(response) {
                done();
            });
        });
    });    

    // Send a message to a valid queue with simple syntax.
    describe("When sending a message to a queue with simple syntax", function() {
        it ('it should not throw an error.', function(done) {
            fog.sendQueueMessage({ "queuePath" : queueName, "message" : "Test Message"})
            .then(function() {
                done();
            });
        });
    });    

    describe("When receiving a message from a queue with a promise", function() {
        it ('it should get the message "Test Message"', function(done) {
            fog.createQueueIfNotExists({"queuePath" : queueName})
            .then(function(response) {
                return fog.receiveQueueMessage(serviceBus, queueName);
            }).then(function(response) {
                assert.equal(response.receivedMessage.body, "Test Message");
                done();
            });
            
            fog.sendQueueMessage({ "queuePath" : queueName, "message" : "Test Message"});
        });
    });      
    
    describe("When receiving a message from a queue with simple syntax", function() {
        it ('it should get the message "Test Message"', function(done) {
            fog.receiveQueueMessage({"queuePath": queueName})
            .then(function(response) {
                assert.equal(response.receivedMessage.body, "Test Message");
                done();
            });
            
            fog.sendQueueMessage({ "queuePath" : queueName, "message" : "Test Message"});
        });
    });      
    
    // Create topic with a promise.
    describe("When creating a topic with promises", function() {
        it ('it should return success.', function(done) {
            fog.createTopicIfNotExists(serviceBus, topicName)
                .then(function(response) {
                    assert.equal(response.topicCreated, true);
                    done();
                });
        });
    });    
    
    // Create topic with alternate syntax
    describe("When creating a topic with alternate syntax", function() {
        it ('it should return success.', function(done) {
            var topicName2 = "testTopic2";
            fog.createTopicIfNotExists({"topic" : topicName2})
                .then(function(response) {
                    assert.equal(response.topicCreated, true);
                    fog.deleteTopic(serviceBus, topicName2);
                    done();
                });
        });
    });       
    
    // Create subscription with promises
    describe("When subscribing to a topic with a promise", function() {
        it ('it should return new topic information.', function(done) {
            fog.createTopicIfNotExists({"topic" : topicName})
            .then(function(response) {
                return fog.createSubscription(serviceBus, topicName, subscriptionPath);
            }).then(function(response) {
                assert(response.createSubscriptionResult);
                done();
            });
        });
    });      
        
    // Create subscription with simple syntax
    describe("When subscribing to a topic with simple syntax", function() {
        it ('it should return new topic information.', function(done) {
            fog.createSubscription({ "topicPath" : topicName, "subscriptionPath" : "testSub2"})
            .then(function(response) {
                assert(response.createSubscriptionResult);
                done();
            });
        });
    });      
});