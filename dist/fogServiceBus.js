var q=require("q"),azure=require("azure"),exports={},cachedDefaultServiceBus,defaultServiceBus=function(){return cachedDefaultServiceBus||(cachedDefaultServiceBus=azure.createServiceBusService()),cachedDefaultServiceBus};exports.createQueueIfNotExists=function(e,t,r){var o=q.defer(),s=function(e,t,r){if(e)o.reject(Error(e));else{var s={queueCreated:t,response:r};o.resolve(s)}},i=function(e){r?e.createQueueIfNotExists(t,r,s):e.createQueueIfNotExists(t,s)};return e&&e.queuePath?(t=e.queuePath,r=e.options,i(defaultServiceBus())):i(e),o.promise},exports.deleteQueue=function(e,t,r){var o=q.defer(),s=function(e,t){e?o.reject(Error(e)):o.resolve(t)};return r?e.deleteQueue(t,r,s):e.deleteQueue(t,s),o.promise},exports.createTopicIfNotExists=function(e,t,r){var o=q.defer(),s=function(e,t,r){if(e)o.reject(Error(e));else{var s={topicCreated:t,response:r};o.resolve(s)}},i=function(e){r?e.createTopicIfNotExists(t,r,s):e.createTopicIfNotExists(t,s)};return e&&e.topicPath?(t=e.topicPath,r=e.options,i(defaultServiceBus())):i(e),o.promise},exports.deleteTopic=function(e,t,r){var o=q.defer(),s=function(e,t){e?o.reject(Error(e)):o.resolve(t)};return r?e.deleteTopic(t,r,s):e.deleteTopic(t,s),o.promise},exports.sendQueueMessage=function(e,t,r,o){var s=q.defer(),i=function(e,t){e?s.reject(Error(e)):s.resolve(t)},n=function(e){o?e.sendQueueMessage(t,r,o,i):e.sendQueueMessage(t,r,i)};return e&&e.queuePath?(t=e.queuePath,r=e.message,o=e.options,exports.createQueueIfNotExists(defaultServiceBus(),t).then(function(){n(defaultServiceBus())})):n(e),s.promise},exports.receiveQueueMessage=function(e,t,r){var o=q.defer(),s=function(e,t,r){if(e)o.reject(Error(e));else{var s={receivedMessage:t,response:r};o.resolve(s)}},i=function(e){r?e.receiveQueueMessage(t,r,s):e.receiveQueueMessage(t,s)};return e&&e.queuePath?(t=e.queuePath,r=e.options,exports.createQueueIfNotExists(defaultServiceBus(),t).then(function(){i(defaultServiceBus())})):i(e),o.promise},exports.createSubscription=function(e,t,r,o){var s=q.defer(),i=function(e,t,r){if(e)s.reject(Error(e));else{var o={createSubscriptionResult:t,response:r};s.resolve(o)}},n=function(e){o?e.createSubscription(t,r,o,i):e.createSubscription(t,r,i)};return e&&e.topicPath?(t=e.topicPath,r=e.subscriptionPath,o=e.options,exports.createTopicIfNotExists(e).then(function(){n(defaultServiceBus())})):n(e),s.promise},exports.deleteSubscription=function(e,t,r,o){var s=q.defer(),i=function(e,t){e?s.reject(Error(e)):s.resolve(t)},n=function(e){o?e.deleteSubscription(t,r,o,i):e.deleteSubscription(t,r,i)};return e&&e.topicPath?(t=e.topicPath,r=e.subscriptionPath,o=e.options,exports.createSubscription(e).then(function(){n(defaultServiceBus())})):n(e),s.promise},exports.sendTopicMessage=function(e,t,r,o){var s=q.defer(),i=function(e,t,r){if(e)s.reject(Error(e));else{var o={receiveTopicMessageResult:t,response:r};s.resolve(o)}},n=function(e){o?e.sendTopicMessage(t,r,o,i):e.sendTopicMessage(t,r,i)};return e&&e.topicPath?(t=e.topicPath,r=e.message,o=e.options,exports.createTopicIfNotExists(e).then(function(){n(defaultServiceBus())})):n(e),s.promise},exports.receiveSubscriptionMessage=function(e,t,r,o){var s=q.defer(),i=function(e,t,r){if(e)s.reject(Error(e));else{var o={receiveTopicMessageResult:t,response:r};s.resolve(o)}},n=function(e){o?e.receiveSubscriptionMessage(t,r,o,i):e.receiveSubscriptionMessage(t,r,i)};return e&&e.topicPath?(t=e.topicPath,r=e.subscriptionPath,o=e.options,n(defaultServiceBus())):n(e),s.promise},exports.deleteMessage=function(e,t,r){var o=q.defer(),s=function(e,t){e?o.reject(Error(e)):o.resolve(t)},i=function(e){r?e.deleteMessage(t,r,s):e.deleteMessage(t,s)};return e&&e.message?(t=e.message,r=e.options,i(defaultServiceBus())):i(e),o.promise},exports.unlockMessage=function(e,t,r){var o=q.defer(),s=function(e,t){e?o.reject(Error(e)):o.resolve(t)},i=function(e){r?e.unlockMessage(t,r,s):e.unlockMessage(t,s)};return e&&e.message?(t=e.message,r=e.options,i(defaultServiceBus())):i(e),o.promise},exports.getQueue=function(e,t,r){var o=q.defer(),s=function(e,t,r){if(e)o.reject(Error(e));else{var s={getQueueResult:t,response:r};o.resolve(s)}},i=function(e){r?e.getQueue(t,r,s):e.getQueue(t,s)};return e&&e.queuePath?(t=e.queuePath,r=e.options,exports.createQueueIfNotExists(e).then(function(){i(defaultServiceBus())})):i(e),o.promise},exports.listQueues=function(e,t){var r=q.defer(),o=function(e,t,o){if(e)r.reject(Error(e));else{var s={listQueuesResult:t,response:o};r.resolve(s)}},s=function(e){t?e.listQueues(t,o):e.listQueues(o)};return!e||e&&e.options?(e&&e.options&&(t=e.options),s(defaultServiceBus())):s(e),r.promise},exports.getTopic=function(e,t,r){var o=q.defer(),s=function(e,t,r){if(e)o.reject(Error(e));else{var s={getTopicResult:t,response:r};o.resolve(s)}},i=function(e){r?e.getTopic(t,r,s):e.getTopic(t,s)};return e&&e.topicPath?(t=e.topicPath,r=e.options,exports.createTopicIfNotExists(e).then(function(){i(defaultServiceBus())})):i(e),o.promise},exports.listTopics=function(e,t){var r=q.defer(),o=function(e,t,o){if(e)r.reject(Error(e));else{var s={listTopicsResult:t,response:o};r.resolve(s)}},s=function(e){t?e.listTopics(t,o):e.listTopics(o)};return!e||e&&e.options?(e&&e.options&&(t=e.options),s(defaultServiceBus())):s(e),r.promise},exports.getSubscription=function(e,t,r,o){var s=q.defer(),i=function(e,t,r){if(e)s.reject(Error(e));else{var o={getSubscriptionResult:t,response:r};s.resolve(o)}},n=function(e){o?e.getSubscription(t,r,o,i):e.getSubscription(t,r,i)};return e&&e.topicPath?(t=e.topicPath,r=e.subscriptionPath,o=e.options,exports.createTopicIfNotExists(e).then(function(){n(defaultServiceBus())})):n(e),s.promise},exports.listSubscriptions=function(e,t,r){var o=q.defer(),s=function(e,t,r){if(e)o.reject(Error(e));else{var s={listSubscriptionsResult:t,response:r};o.resolve(s)}},i=function(e){r?e.listSubscriptions(t,r,s):e.listSubscriptions(t,s)};return e&&e.topicPath?(r=e.options,t=e.topicPath,exports.createTopicIfNotExists(e).then(function(){i(defaultServiceBus())})):i(e),o.promise},module.exports=exports;