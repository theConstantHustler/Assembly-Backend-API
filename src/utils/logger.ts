import { createLogger, transports, format } from 'winston';

/**
 * desc: 'logger' imported from 'winston' package.
 * reason: The reason to use this is because since JS is single threaded, console.log() blocks
 * 			that thread - which isn't advisable. Also,brings a structure to the logs
 */
const logger = createLogger({
	transports: [new transports.Console()],
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level}: ${message}`;
		}),
	),
});

export default logger;
