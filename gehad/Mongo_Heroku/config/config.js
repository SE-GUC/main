let config = {};
config.db = {};

config.db.host = '<USERNAME>:<PASSWORD>@cluster0-shard-00-00-qzraw.mongodb.net:27017,cluster0-shard-00-01-qzraw.mongodb.net:27017,cluster0-shard-00-02-qzraw.mongodb.net:27017';
config.db.name = '<DATABASENAME>';
config.db.auth='ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
module.exports = config;