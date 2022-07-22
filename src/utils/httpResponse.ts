/**
 * APIResponses object
 *
 * desc: acts as a helper object - stores our response body templates
 */
const APIResponses = {
	_200: (data: { [key: string]: any }) => {
		return {
			statusCode: 200,
			body: JSON.stringify(data, null, 2),
		};
	},
	_400: (data: { [key: string]: any }) => {
		return {
			statusCode: 400,
			body: JSON.stringify(data, null, 2),
		};
	},
};

export default APIResponses;
