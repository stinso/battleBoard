const winston = require('winston');
const colorizer = winston.format.colorize();
 
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    new winston.transports.Console(
      { format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.printf(msg => 
        colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
      )) }
    ),
  ],
});

module.exports = logger