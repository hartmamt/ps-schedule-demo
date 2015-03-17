var convict = require('convict');
var fs = require('fs');

var env = process.env.NODE_ENV || 'development';

var conf = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test', 'remote'],
    default: 'development',
    env: 'NODE_ENV'
  },
  getScheduleUrl: {
    doc: 'The REST Endpoint to call.',
    default: '',
    env: 'SCHEDULE_URL'
  },
  username: {
    doc: 'Endpoint username',
    default: '',
    env: 'SIS_USERNAME'
  },
  password: {
    doc: 'Endpoint password',
    default: '',
    env: 'SIS_PASSWORD'
  }
});

/* eslint-disable */
if (fs.existsSync(__dirname + '/' + env + '.json')){
  conf.loadFile(__dirname + '/' + env + '.json').validate();
/* eslint-enable */
} else {
  //either pull data from mongo or serve 404 error
  console.log('Config file not found, using ENV');
}

conf.validate();

module.exports = conf;
