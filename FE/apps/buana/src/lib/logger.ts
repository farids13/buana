import winston, { Logger } from 'winston';

const logger: Logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.colorize(), 
    winston.format.simple() 
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/server.log' })
  ],
});

export default logger;
