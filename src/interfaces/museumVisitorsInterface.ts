/**
 * IMuseumVisitors - helps us validate the data from the API
 */
interface IMuseumVisitors {
	month: string;
	america_tropical_interpretive_center?: string;
	avila_adobe?: string;
	chinese_american_museum?: string;
	firehouse_museum?: string;
	hellman_quon?: string;
	pico_house?: string;
	visitor_center_avila_adobe?: string;
	biscailuz_gallery?: string;
	gateway_to_nature_center?: string;
	iamla?: string;
	museum_of_social_justice?: string;
}

/**
 * IAttendanceObject - maintains the structure of the response object
 */
interface IAttendanceObject {
	month: string;
	year: number;
	highest: {
		museum: string;
		visitors: number;
	};
	lowest: {
		museum: string;
		visitors: number;
	};
	ignored?: {
		museum: string;
		visitors: number;
	};
	total: number;
}

/**
 * MuseumsList: a utility list to helps validate the museum provided in the 'ignore' query param
 */
const MuseumsList = [
	'america_tropical_interpretive_center',
	'avila_adobe',
	'chinese_american_museum',
	'firehouse_museum',
	'hellman_quon',
	'pico_house',
	'visitor_center_avila_adobe',
	'biscailuz_gallery',
	'gateway_to_nature_center',
	'iamla',
	'museum_of_social_justice',
];

export { IMuseumVisitors, IAttendanceObject, MuseumsList };
