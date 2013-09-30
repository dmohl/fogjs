var assert = require("assert");
var fogBlob = require("../src/blobStorage.js");
var azure = require('azure');
var fs = require('fs');
var blobService = azure.createBlobService();
var containerName = "testcontainer";

describe("BlobStorage", function() {
    this.timeout(5000);

    after(function(done) {
        blobService.deleteContainer(containerName, function() {
            done();
        });
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

    var createBlob = function(blobName) {
        var promise = fogBlob.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'});
        return promise.then(function() {
            return fogBlob.createBlockBlobFromText(
                blobService,
                containerName, 
                blobName,
                "My super awesome text to upload"
            );
        });
    };

    describe("When calling with text and with promises", function() {
        it ('it should upload the text as a blob.', function(done) {
            createBlob("TestBlobText2").then(function() {
                    assert.equal(1,1);
                    done();
                });
        });
    });

    describe("When calling with a file and with promises", function() {
        it ('it should upload the file.', function(done) {
            var promise = fogBlob.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'});
            promise.then(function() {
                fogBlob.createBlockBlobFromFile(
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
            var promise = fogBlob.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'});
            var filePath = "C:\\git\\fogjs\\readme.md";
            fs.stat(filePath, function(error, stat) {
                var length = stat.size;
                var stream = fs.createReadStream(filePath);
                promise.then(function() {
                    fogBlob.createBlockBlobFromStream(blobService, containerName, "TestBlobStream", stream, length)
                    .then(function() {
                        assert.equal(1,1);
                        done();
                    });
                });
            });
        });
    });
    
    describe("When deleting a container with promises", function() {
        it ('it should delete successfully.', function(done) {
            var deleteContainerName = "deletecontainertest";
            var promise = fogBlob.createContainerIfNotExists(blobService, deleteContainerName, {publicAccessLevel : 'blob'});
            fogBlob.deleteContainer(blobService, deleteContainerName).then(done());
        });
    });
    
    describe("When getting a blob to text with promises", function() {
        it ('it should have the value My super awesome text to upload.', function(done) {
            var blobName = "GetBlobTest";
            createBlob(blobName).then(function() {
                fogBlob.getBlobToText(blobService, containerName, blobName)
                    .then(function(response) {
                        assert.equal(response.text, "My super awesome text to upload");
                        done();
                    });
            });
        });
    });
    
    describe("When getting a blob to file with promises", function() {
        it ('it should have the value My super awesome text to upload.', function(done) {
            var blobName = "GetBlobFileTest";
            var fileName = "C:\\git\\fogjs\\test\\myGetBobToFileTest.txt";
            createBlob(blobName).then(function() {
                fogBlob.getBlobToFile(blobService, containerName, blobName, fileName)
                    .then(function(response) {
                        fs.readFile(fileName, "utf8", function (err, data) {
                            fs.unlink(fileName);
                            assert.equal(data, "My super awesome text to upload");
                            done();
                        });
                    });
            });
        });
    });
    
    describe("When getting a blob to stream with promises", function() {
        it ('it should have the value My super awesome text to upload.', function(done) {
            var blobName = "GetBlobStreamTest";
            var fileName = "C:\\git\\fogjs\\test\\myGetBobToStreamTest.txt";
            createBlob(blobName).then(function() {
                fogBlob.getBlobToStream(blobService, containerName, blobName, fs.createWriteStream(fileName))
                    .then(function(response) {
                        fs.readFile(fileName, "utf8", function (err, data) {
                            fs.unlink(fileName);
                            assert.equal(data, "My super awesome text to upload");
                            done();
                        });
                    });
            });
        });
    });
    
    describe("When deleting a blob with promises", function() {
        it ('it should finish without an error.', function(done) {
            var blobName = "DeleteBlobTest";
            createBlob(blobName)
                .then(function() {
                    return fogBlob.deleteBlob(blobService, containerName, blobName);
                }).then(function(response) {
                    assert.equal(true, response.isSuccessful);
                    done();
                });
        });
    });    
    
    describe("When creating, getting, and deleting a blob with simple syntax", function() {
        this.timeout("10000");
        it ('it should finish without an error.', function(done) {
            var blobName = "simpleSyntaxBlob";
            var containerName = "simplesyntaxcontainer";
            fogBlob.createBlockBlobFromText({
                "containerName": containerName, 
                "blobName" : blobName, 
                "blobText": "My super awesome text to upload"
            }).then(function() {
                return fogBlob.getBlobToText({
                    "containerName": containerName, 
                    "blobName" : blobName
                });
            }).then(function(response) {
                assert.equal("My super awesome text to upload", response.text);
                return fogBlob.deleteBlob({
                    "containerName": containerName, 
                    "blobName" : blobName
                });                    
            }).then(function(response) {
                assert.equal(true, response.isSuccessful);
                done();
            });
        });
    });    
});    