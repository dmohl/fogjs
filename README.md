FogJS is a port of Fog (for F#). The main project page for Fog can be found at http://fogjs.azurewebsites.net/.

FogJS
=======

**FogJS** brings the cloud down to earth by adding a few features and abstractions to the Node.js Windows Azure API.

Building Azure apps with FogJS that need to interact with Azure Table Storage, Blob Storage, Queue Storage, Caching, and/or the Service Bus is very easy. 
The examples that follow use this approach. Fog also provides more fine-grained interaction if that is desired, but adds a few features such as promises. 
See the integration tests for examples.

Syntax
=======

**Blob Storage**

Thanks to Q.js, you can use the typical API methods while also avoiding nested callbacks. Here's a quick example:

    var fogBlob = require("../src/blobStorage.js");
    var azure = require('azure');
    var blobService = azure.createBlobService();
    var containerName = "testcontainer";
    
    fogBlob.createContainerIfNotExists(blobService, containerName, {publicAccessLevel : 'blob'})
        .then(function() {
            return fogBlob.createBlockBlobFromText(
                blobService,
                containerName, 
                "testblob",
                "My super awesome text to upload"
            );
        });

You can simplify things even more by taking advantage of convention to eliminate the need to create a blobServer and create the container.
This allows the previous example to be condensed to this:

    var fogBlob = require("../src/blobStorage.js"); 

    var containerName = "testcontainer";
    fogBlob.createBlockBlobFromText({
        "containerName": containerName, 
        "blobName" : "testblob", 
        "blobText": "My super awesome text to upload"
    });

Here's an example of chaining together a create, followed by a get, followed by a delete. 

    var fogBlob = require("../src/blobStorage.js"); 

    var containerName = "testcontainer";
    var blobName = "testblob";
    
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
        console.log("The blob contains the text: " + response.text);
        return fogBlob.deleteBlob({
            "containerName": containerName, 
            "blobName" : blobName
        });                    
    }).then(function(response) {
        console.log("done");
    });

**Table Storage**

Coming soon...

**Queue Storage**

Coming soon...

**Service Bus**

Coming soon...

**Caching**

Coming soon...

How To Get It
=======

Fog will be available via NPM once it's released.

Releases
=======
* 0.0.1 - Fog is not yet released.

MIT License
=======

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.