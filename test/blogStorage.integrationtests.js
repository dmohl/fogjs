var assert = require("assert");
var fogjs = require("../src/blobStorage.js");
var azure = require('azure');
var fs = require('fs');
var blobService = azure.createBlobService();
var containerName = "testcontainer";

describe("BlobStorage", function() {

    after(function(done) {
        fogjs.deleteContainer(blobService, containerName)
        .then(done());
    });
      
    describe("When calling with text and the standard JS code", function() {
        it ('it should upload the text as a blob.', function(done) {
            var container = blobService.createContainerIfNotExists(containerName,
                {publicAccessLevel : 'blob'},
                function(error) {
                    if (error) throw error;
                    blobService.createBlockBlobFromText(
                        containerName, 
                        "TestBlobText",
                        "My super awesome text to upload",
                        function(error) {
                            if (error) throw error;
                            assert.equal(1,1);
                            done();
                        });
                });
        });
    });

    describe("When calling with text and with promises", function() {
        it ('it should upload the text as a blob.', function(done) {
            var promise = fogjs.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'});
            promise.then(function() {
                fogjs.createBlockBlobFromText(
                    blobService,
                    containerName, 
                    "TestBlobText2",
                    "My super awesome text to upload"
                ).then(function() {
                    assert.equal(1,1);
                    done();
                });
            });
        });
    });

    describe("When calling with a file and with promises", function() {
        it ('it should upload the file.', function(done) {
            var promise = fogjs.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'});
            promise.then(function() {
                fogjs.createBlockBlobFromFile(
                    blobService,
                    containerName, 
                    "TestBlobFile",
                    "C:\\git\\fogjs\\readme.md"
                ).then(function() {
                    assert.equal(1,1);
                    done();
                });
            });
        });
    });

    describe("When calling with a stream and with promises", function() {
        it ('it should upload the stream into blob storage.', function(done) {
            var promise = fogjs.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'});
            var filePath = "C:\\git\\fogjs\\readme.md";
            fs.stat(filePath, function(error, stat) {
                var length = stat.size;
                var stream = fs.createReadStream(filePath);
                promise.then(function() {
                    fogjs.createBlockBlobFromStream(blobService, containerName, "TestBlobStream", stream, length)
                    .then(function() {
                        assert.equal(1,1);
                        done();
                    });
                });
            });
        });
    });
});    