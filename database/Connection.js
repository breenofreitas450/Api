
var tp = require('tedious-promises');
var _ = require('lodash');

// Create connection to database
var config = {
    userName: 'user_trial',
    password: '7412LIVE!@#$%¨&*()',
    server: 'virtual2.febracorp.org.br',
    options: {
        port: 1433,
        database: 'CONTOSO',
        encript: true
    }
}

tp.setConnectionConfig(config);
tp.setDefaultColumnRenamer(_.camelCase); // global scope

module.exports = tp;

