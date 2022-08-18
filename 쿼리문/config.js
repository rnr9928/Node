const dot = require('dotenv').config();

const config = {
    dev : {
        user : "root",
        password : process.env.DB_PASSWORD,
        database : 'test9',
        multipleStatements: true,
    },
        dev2 : {
            username : "root",
            password : process.env.DB_PASSWORD,
            database : 'test10',
            host : '127.0.0.1',
            dialect: 'mysql',
        },

};


module.exports = config;