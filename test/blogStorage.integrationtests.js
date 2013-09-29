var assert = require("assert");
var fogjs = require("../src/blobStorage.js");
var azure = require('azure');

describe("When calling with the standard JS code", function(){
    it ('it should upload the text as a blob.', function(done) {
        var blobService = azure.createBlobService();
        var containerName = "testcontainer";
        var container = blobService.createContainerIfNotExists(containerName,
            {publicAccessLevel : 'blob'},
			function(error) {
                if (error) throw error;
				blobService.createBlockBlobFromText(
					containerName, 
					"TestBlob",
					"My super awesome text to upload",
					function(error) {
						if (error) throw error;
						assert.equal(1,1);
						done();
					});
            });
    });
});

describe("When calling with the standard JS code with promises", function(){
    it ('it should upload the text as a blob.', function(done) {
        var blobService = azure.createBlobService();
        var containerName = "testcontainer2";
        var promise = fogjs.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'});
        promise.then(function() {
            fogjs.createBlockBlobFromText(
                blobService,
                containerName, 
                "TestBlob2",
                "My super awesome text to upload"
            ).then(function() {
                assert.equal(1,1);
                done();
            });
		});
    });
});
// TODO: As part of the Fog.js API, provide promises for all the data storage API callbacks using Q.
