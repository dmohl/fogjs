var fog = {};
var blobStorage = require("./fogBlobStorage");
var tableStorage = require("./fogTableStorage");
var serviceBus = require("./fogServiceBus");

fog.blobStorage = blobStorage;
fog.tableStorage = tableStorage;
fog.serviceBus = serviceBus;

module.exports = fog;
