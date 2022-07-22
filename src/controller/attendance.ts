import { APIGatewayProxyHandler } from 'aws-lambda';
import {
	MuseumsList,
	IAttendanceObject,
} from 'src/interfaces/museumVisitorsInterface';
import APIResponses from 'src/utils/httpResponse';
import logger from 'src/utils/logger';
import AttendanceService from '../service/attendanceService';

/**
 * handler function
 * arguments: event and context
 * returns: attendance JSON
 *
 * desc: this handler function checks for the validity of the query params and passes the
 * 		payload to the service class.
 **/

export const handler: APIGatewayProxyHandler = async (event, _context) => {
	// fetch the params from the URL
	const queryDate: number = parseInt(event.queryStringParameters?.date);
	const queryIgnoreMuseum: string | null =
		event.queryStringParameters?.ignore;

	// check for the presence of 'date', if not raises an 400 error
	if (!queryDate) {
		logger.warn('query params(date) is missing');
		return APIResponses._400({
			error: "'date (in milliseconds)' is expected in query params",
		});
	}

	// in case when the 'ignore' param is present, checks if the value provides is valid, raises error otherwise
	if (queryIgnoreMuseum) {
		if (!MuseumsList.includes(queryIgnoreMuseum)) {
			logger.warn('museum name does not exist');
			return APIResponses._400({
				error: `museum name \'${queryIgnoreMuseum}\' does not exist`,
			});
		}
	}

	try {
		const attendance: IAttendanceObject =
			await new AttendanceService().getAttendance(
				queryDate,
				queryIgnoreMuseum,
			);
		// returns 200 if we get the JSON
		return APIResponses._200({
			attendance,
		});
	} catch (error) {
		// in case of errors, logging them and sending a 400 status response
		return APIResponses._400({
			error,
		});
	}
};
