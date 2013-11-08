var assert = require("assert");
var fog = require("../src/fogServiceBus.js");
var azure = require("azure");
var serviceBus = azure.createServiceBusService();
var queueName = "testQueue";
var topicName = "testTopic";
var subscriptionPath = "testSubPath";

describe("Service Bus Tests", function() {
    this.timeout(10000);

    var handleError = function(error) {
        console.log(error);
        assert(!error, error);
    };
 
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
        this.timeout(15000);
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
        this.timeout(15000);
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
            fog.createTopicIfNotExists({"topicPath" : topicName2})
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
            fog.createTopicIfNotExists({"topicPath" : topicName})
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
    
    // Delete subscription with promise
    describe("When deleting a subscription with promises", function() {
        it ('it should not fail.', function(done) {
            fog.createSubscription({ "topicPath" : topicName, "subscriptionPath" : "testSub3"})
            .then(function(response) {
                return fog.deleteSubscription(serviceBus, topicName, subscriptionPath);
            }).then( function(response) {
                done();
            });
        });
    });      
    
    // Delete subscription with simple syntax
    describe("When deleting a subscription with simple syntax", function() {
        this.timeout(20000);
        it ('it should not fail.', function(done) {
            fog.deleteSubscription({ "topicPath" : topicName, "subscriptionPath" : "testSub4"})
            .then( function(response) {
                done();
            });
        });
    });      
        
    // Sending a topic message with promise
    describe("When sending a topic message with promises", function() {
        this.timeout(15000);
        it ('it should have a receivetopicmessageresult that has some value.', function(done) {
            fog.createTopicIfNotExists({"topicPath" : topicName})
            .then( function() { 
                return fog.sendTopicMessage(serviceBus, topicName, "message 1"); 
            }).then( function(response) {
                assert(response.receiveTopicMessageResult);
                done();
            });
        });
    });      
    
    // Sending a topic message with simple syntax
    describe("When sending a topic message with simple syntax", function() {
        it ('it should have a receivetopicmessageresult that has some value.', function(done) {
            fog.sendTopicMessage({ "topicPath" : topicName, "message" : "message 2"}) 
            .then( function(response) {
                assert(response.receiveTopicMessageResult);
                done();
            });
        });
    });      
    
    // Receiving a subscription message with promise
    describe("When receiving a message with promises", function() {
        this.timeout(20000);
        it ('it should have a body in the receivetopicmessageresult with a value of "message 2".', function(done) {
            var subscription = "testSub1.1";
            fog.createSubscription({ "topicPath" : topicName, "subscriptionPath" : subscription})            
            .then(function() {
                return fog.sendTopicMessage(serviceBus, topicName, "message 2");
            }).then(function() {
                return fog.receiveSubscriptionMessage(serviceBus, topicName, subscription);
            }).then(function(response) {
                assert.equal(response.receiveTopicMessageResult.body, "message 2");
                fog.deleteSubscription({ "topicPath" : topicName, "subscriptionPath" : subscription});
                done();
            }).fail(handleError);
        });
    });   
    
    // Receiving a subscription message with alternate syntax
    describe("When receiving a message with alternate syntax", function() {
        this.timeout(20000);
        it ('it should have a body in the receivetopicmessageresult with a value of "message 2".', function(done) {
            var subscription = "testSub1.2";
            fog.createSubscription({ "topicPath" : topicName, "subscriptionPath" : subscription})            
            .then(function() {
                return fog.sendTopicMessage({ "topicPath" : topicName, "message" : "message 2"});
            }).then(function() {
                fog.receiveSubscriptionMessage({ "topicPath": topicName, "subscriptionPath" : subscription})
                .then( function(response) {
                    assert.equal(response.receiveTopicMessageResult.body, "message 2");
                    fog.deleteSubscription({ "topicPath" : topicName, "subscriptionPath" : subscription});
                    done();
                }).fail(handleError);
            });
        });
    });   
    
    // Delete message with promise
    describe("When deleting a message with promise", function() {
        it ('it should not throw an exception', function(done) {
            var queueNameTest = "myTestQueuePath1";
            fog.receiveQueueMessage({"queuePath": queueNameTest, "options" : { isPeekLock: true, timeoutIntervalInS: 5 }})
            .then(function(response) {
                return fog.deleteMessage(serviceBus, response.receivedMessage);
            }).then(function(reponse) {
                done();
            }).fail(handleError);
            
            fog.sendQueueMessage({ "queuePath" : queueNameTest, "message" : "Test Message"});
        });
    });
    
    // Delete message with alternate syntax
    describe("When deleting a message with alternate syntax", function() {
        it ('it should not throw an exception', function(done) {
            var queueNameTest2 = "myTestQueuePath2";
            fog.receiveQueueMessage({"queuePath": queueNameTest2, "options" : { isPeekLock: true, timeoutIntervalInS: 5 }})
            .then(function(response) {
                return fog.deleteMessage({"message" : response.receivedMessage});
            }).then(function(reponse) {
                done();
            }).fail(handleError);
            
            fog.sendQueueMessage({ "queuePath" : queueNameTest2, "message" : "Test Message"});
        });
    });

    // Unlock message with promise
    describe("When unlocking a message with promise", function() {
        it ('it should not throw an exception', function(done) {
            var queueNameTest = "myTestQueuePath3";
            fog.receiveQueueMessage({"queuePath": queueNameTest, "options" : { isPeekLock: true, timeoutIntervalInS: 5 }})
            .then(function(response) {
                return fog.unlockMessage(serviceBus, response.receivedMessage);
            }).then(function(reponse) {
                done();
            }).fail(handleError);
            
            fog.sendQueueMessage({ "queuePath" : queueNameTest, "message" : "Test Message"});
        });
    });

    // Unlock message with alternate syntax
    describe("When unlocking a message with alternate syntax", function() {
        it ('it should not throw an exception', function(done) {
            var queueNameTest2 = "myTestQueuePath4";
            fog.receiveQueueMessage({"queuePath": queueNameTest2, "options" : { isPeekLock: true, timeoutIntervalInS: 5 }})
            .then(function(response) {
                return fog.unlockMessage({"message" : response.receivedMessage});
            }).then(function(reponse) {
                done();
            }).fail(handleError);
            
            fog.sendQueueMessage({ "queuePath" : queueNameTest2, "message" : "Test Message"});
        });
    });

    // get queue with promise
    describe("When getting a queue with promise", function() {
        it ('it should have a queue result', function(done) {
            fog.createQueueIfNotExists(serviceBus, queueName)
            .then(function(response) {
                return fog.getQueue(serviceBus, queueName);
            }).then(function(response) {
                assert(response.getQueueResult);
                done();
            }).fail(handleError);
        });
    });
    
    // get queue with simple syntax    
    describe("When getting a queue with simple syntax", function() {
        it ('it should have a queue result', function(done) {
            fog.getQueue({"queuePath" : queueName})
            .then(function(response) {
                assert(response.getQueueResult);
                done();
            }).fail(handleError);
        });
    });

    // list queues with promise
    describe("When listing queues with promise", function() {
        it ('it should have a queue list as a result', function(done) {
            fog.listQueues(serviceBus)
            .then(function(response) {
                assert(response.listQueuesResult);
                done();
            }).fail(handleError);
        });
    });
    
    // list queues with alternate syntax
    describe("When listing queues with alternate syntax", function() {
        it ('it should have a queue list as a result', function(done) {
            fog.listQueues()
            .then(function(response) {
                assert(response.listQueuesResult);
                done();
            }).fail(handleError);
        });
    });
    
    // get topic with promise
    describe("When getting a topic with promise", function() {
        it ('it should have a topic result', function(done) {
            fog.createTopicIfNotExists(serviceBus, topicName)
            .then(function(response) {
                return fog.getTopic(serviceBus, topicName);
            }).then(function(response) {
                assert(response.getTopicResult);
                done();
            }).fail(handleError);
        });
    });
    
    // get topic with alternate syntax
    describe("When getting a topic with simple syntax", function() {
        it ('it should have a topic result', function(done) {
            fog.getTopic({ "topicPath" : topicName })
            .then(function(response) {
                assert(response.getTopicResult);
                done();
            }).fail(handleError);
        });
    });
    
    // list topics with promise
    describe("When listing topics with promise", function() {
        it ('it should have a topic list as a result', function(done) {
            fog.listTopics(serviceBus)
            .then(function(response) {
                assert(response.listTopicsResult);
                done();
            }).fail(handleError);
        });
    });
    
    // list topics with alternate syntax
    describe("When listing topics with alternate syntax", function() {
        it ('it should have a topic list as a result', function(done) {
            fog.listTopics()
            .then(function(response) {
                assert(response.listTopicsResult);
                done();
            }).fail(handleError);
        });
    });
    
    // get subscription with promise
    describe("When getting a subscription with promise", function() {
        this.timeout(20000);
        it ('it should have a subscription result', function(done) {
            fog.createTopicIfNotExists({"topicPath" : topicName})
            .then(function(response) {
                return fog.createSubscription(serviceBus, topicName, subscriptionPath);
            }).then(function(response) {
                return fog.getSubscription(serviceBus, topicName, subscriptionPath);
            }).then(function(response) {
                assert(response.getSubscriptionResult);
                done();
            }).fail(handleError);
        });
    });
    
    // get subscription with alternate syntax
    describe("When getting a subscription with simple syntax", function() {
        this.timeout(20000);
        it ('it should have a subscription result', function(done) {
            fog.getSubscription({ "topicPath" : topicName, "subscriptionPath" : subscriptionPath })
            .then(function(response) {
                assert(response.getSubscriptionResult);
                done();
            }).fail(handleError);
        });
    });
    
    // list subscriptions with promise
    describe("When listing subscriptions with promise", function() {
        it ('it should have a subscription list as a result', function(done) {
            fog.listSubscriptions(serviceBus, topicName)
            .then(function(response) {
                assert(response.listSubscriptionsResult);
                done();
            }).fail(handleError);
        });
    });
    
    // list subscriptions with alternate syntax
    describe("When listing subscriptions with alternate syntax", function() {
        it ('it should have a subscription list as a result', function(done) {
            fog.listSubscriptions({ "topicPath" : topicName })
            .then(function(response) {
                assert(response.listSubscriptionsResult);
                done();
            }).fail(handleError);
        });
    });
    
});