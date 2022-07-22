import MuseumVisitorsAPI from 'src/api/get';
import {
	IMuseumVisitors,
	IAttendanceObject,
} from 'src/interfaces/museumVisitorsInterface';
import logger from 'src/utils/logger';

/**
 * AttendanceService class
 * arguments: takes date in milliseconds and ignore is present
 * returns: attendance object
 *
 * desc: payload is passed to this service from the controller function
 * 		1. _getDataFromAPI(): fetches the data from the museum visitors API
 * 		2. _parseAPIData(): parses the data, picks the queried months data
 * 		3. _constructAttendanceObject(): extracts the required fields and constructs and returns the response obj
 */

export default class AttendanceService {
	/**
	 * @param date
	 * @param ignore
	 * @returns IAttendanceObject
	 */
	public async getAttendance(
		date: number,
		ignore: string | null,
	): Promise<IAttendanceObject> {
		// fetches the data from the API
		const museumVisitorsData: IMuseumVisitors[] =
			await this._getDataFromAPI();
		// passes the raw data to be parsed and returns the response
		return await this._parseAPIData(museumVisitorsData, date, ignore);
	}

	/**
	 * @returns IMuseumVisitors[]
	 */
	private async _getDataFromAPI(): Promise<IMuseumVisitors[]> {
		// calls the api service to get the data from API
		const visitorsData: IMuseumVisitors[] =
			await new MuseumVisitorsAPI().get();

		return visitorsData;
	}

	/**
	 * @param data
	 * @param date
	 * @param ignore
	 * @returns IAttendanceObject
	 */
	private async _parseAPIData(
		data: IMuseumVisitors[],
		date: number,
		ignore: string | null,
	): Promise<IAttendanceObject> {
		// extracts the month and year from the epoch
		const month = new Date(date).getMonth();
		const year = new Date(date).getFullYear();

		let targetEntity: IMuseumVisitors;

		/* 
			iterates the data obj, queries the data - checks if there is a entry present for
			the provided month and year, if yes - stores it in targetEntity
		*/
		data.map((entity) => {
			const entityDate = new Date(entity.month).getMonth();
			const entityMonth = new Date(entity.month).getFullYear();

			if (entityDate == month && entityMonth == year) {
				logger.info(`target: ${JSON.stringify(entity)}`);
				targetEntity = entity;
			}
		});

		// processes the entity only if there exists an entry, else raises an error
		if (targetEntity) {
			const attendanceObject: IAttendanceObject =
				await this._constructAttendanceObject(
					targetEntity,
					ignore,
					month,
					year,
				);

			return attendanceObject;
		} else {
			// logs and throws an error if no such log is present in API data
			logger.info('target entity not found');
			throw `no visitors log found for month:${month} and year:${year}`;
		}
	}

	/**
	 * @param payload
	 * @param ignore
	 * @param month
	 * @param year
	 * @returns IAttendanceObject
	 */
	private async _constructAttendanceObject(
		payload: IMuseumVisitors,
		ignore: string | null,
		month: number,
		year: number,
	): Promise<IAttendanceObject> {
		// holds the total visitors count
		let total: number = 0;
		let ignored: { museum: string; visitors: number };

		// deletes the month from the obj - makes processing simpler
		delete payload['month'];

		/*
		* if ignore query param is given - constructs an 'ignored' obj
			and appends it to the attendance obj
		* deletes the entry from the obj
		*/
		if (ignore) {
			const ignoredMuseum: { museum: string; visitors: number } = {
				museum: ignore,
				visitors: payload[ignore],
			};
			ignored = ignoredMuseum;

			logger.info(`Ignored: ${JSON.stringify(ignoredMuseum)}`);
			delete payload[ignore];
		}

		// stores the entries as an array
		let entries = Object.entries(payload);
		// sorts the array
		let sorted = entries.sort((a, b) => a[1] - b[1]);

		// attendance object
		const attendanceObj: IAttendanceObject = {
			month: month.toString(),
			year,
			// the first entry of the sorted array has the lowest
			lowest: {
				museum: sorted[0][0],
				visitors: sorted[0][1],
			},
			// the last entry of the sorted array has the highest
			highest: {
				museum: sorted.slice(-1)[0][0],
				visitors: sorted.slice(-1)[0][1],
			},
			ignored,
			total,
		};

		// iterates through the payload obj to get the total visitors count
		Object.values(payload).forEach((item) => {
			total += parseInt(item);
		});

		attendanceObj.total = total;
		logger.info(`attendance log: ${JSON.stringify(attendanceObj)}`);

		return attendanceObj;
	}
}
