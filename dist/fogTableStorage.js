var q=require("q"),azure=require("azure"),exports={},defaultTableService=azure.createTableService();exports.createTableIfNotExists=function(e,t,r){var o=q.defer(),i=function(e,t,r){if(e)o.reject(Error(e));else{var i={created:t,response:r};o.resolve(i)}};return r?e.createTableIfNotExists(t,r,i):e.createTableIfNotExists(t,i),o.promise},exports.deleteTable=function(e,t,r){var o=q.defer(),i=function(e,t,r){e?o.reject(Error(e)):o.resolve(r)};return r?e.deleteTable(t,r,i):e.deleteTable(t,i),o.promise},exports.insertEntity=function(e,t,r,o){var i=q.defer(),n=function(e,t,r){if(e)i.reject(Error(e));else{var o={entity:t,response:r};i.resolve(o)}},s=function(e){o?e.insertEntity(t,r,o,n):e.insertEntity(t,r,n)};return e&&e.tableName?(t=e.tableName,r=e.entity,o=e.options,exports.createTableIfNotExists(defaultTableService,t).then(function(){s(defaultTableService)})):s(e),i.promise},exports.deleteEntity=function(e,t,r,o){var i=q.defer(),n=function(e,t,r){if(e)i.reject(Error(e));else{var o={successful:t,response:r};i.resolve(o)}},s=function(e){o?e.deleteEntity(t,r,o,n):e.deleteEntity(t,r,n)};return e&&e.tableName?(t=e.tableName,r=e.entityDescriptor,o=e.options,exports.createTableIfNotExists(defaultTableService,t).then(function(){s(defaultTableService)})):s(e),i.promise},exports.queryEntity=function(e,t,r,o,i){var n=q.defer(),s=function(e,t,r){if(e)n.reject(Error(e));else{var o={entity:t,response:r};n.resolve(o)}},c=function(e){i?e.queryEntity(t,r,o,i,s):e.queryEntity(t,r,o,s)};return e&&e.tableName?(t=e.tableName,r=e.entityDescriptor.PartitionKey,o=e.entityDescriptor.RowKey,i=e.options,exports.createTableIfNotExists(defaultTableService,t).then(function(){c(defaultTableService)})):c(e),n.promise},exports.queryEntities=function(e,t,r){var o=q.defer(),i=function(e,t,r,i){if(e)o.reject(Error(e));else{var n={entities:t,queryResultContinuation:r,response:i};o.resolve(n)}},n=function(e){r?e.queryEntities(t,r,i):e.queryEntities(t,i)};return e&&e.tableQuery?(t=e.tableQuery,r=e.options,n(defaultTableService)):n(e),o.promise},exports.updateEntity=function(e,t,r,o){var i=q.defer(),n=function(e,t,r){if(e)i.reject(Error(e));else{var o={entity:t,response:r};i.resolve(o)}},s=function(e){o?e.updateEntity(t,r,o,n):e.updateEntity(t,r,n)};return e&&e.tableName?(t=e.tableName,r=e.entity,o=e.options,s(defaultTableService)):s(e),i.promise},exports.mergeEntity=function(e,t,r,o){var i=q.defer(),n=function(e,t,r){if(e)i.reject(Error(e));else{var o={entity:t,response:r};i.resolve(o)}},s=function(e){o?e.mergeEntity(t,r,o,n):e.mergeEntity(t,r,n)};return e&&e.tableName?(t=e.tableName,r=e.entity,o=e.options,s(defaultTableService)):s(e),i.promise},exports.insertOrReplaceEntity=function(e,t,r,o){var i=q.defer(),n=function(e,t,r){if(e)i.reject(Error(e));else{var o={entity:t,response:r};i.resolve(o)}},s=function(e){o?e.insertOrReplaceEntity(t,r,o,n):e.insertOrReplaceEntity(t,r,n)};return e&&e.tableName?(t=e.tableName,r=e.entity,o=e.options,s(defaultTableService)):s(e),i.promise},exports.insertOrMergeEntity=function(e,t,r,o){var i=q.defer(),n=function(e,t,r){if(e)i.reject(Error(e));else{var o={entity:t,response:r};i.resolve(o)}},s=function(e){o?e.insertOrMergeEntity(t,r,o,n):e.insertOrMergeEntity(t,r,n)};return e&&e.tableName?(t=e.tableName,r=e.entity,o=e.options,s(defaultTableService)):s(e),i.promise},module.exports=exports;