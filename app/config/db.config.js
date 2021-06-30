require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const clusterCode = process.env.DB_CLUSTER_NAME_AND_CODE;
const dbUri = `mongodb+srv://${dbUser}:${dbPass}@${clusterCode}.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

module.exports = {
    dbUri,
    mongooseOptions,
};