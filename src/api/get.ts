import axios from 'axios';
import { IMuseumVisitors } from 'src/interfaces/museumVisitorsInterface';
import logger from 'src/utils/logger';

/**
 * MuseumVisitorsAPI class
 *
 * desc: uses 'axios' to fetch the data from API
 */
export default class MuseumVisitorsAPI {
	/**
	 * @returns IMuseumVisitors[]
	 */
	public async get(): Promise<IMuseumVisitors[]> {
		const response: any = await axios.get(process.env.MUSEUM_VISITOR_API);

		if (response) {
			logger.info(`response from Museum API: ${response.status}`);
			return response.data;
		}
	}
}
