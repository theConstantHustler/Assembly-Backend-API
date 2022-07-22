const axios = require('axios');

/**
 * TEST CASES
 */
describe('GET / - attendance api endpoint', () => {
	// when date and ignore are given and have proper data
	it('should have ignored obj', async () => {
		const response = await axios.get(
			'https://dukls79rad.execute-api.ap-south-1.amazonaws.com/api/visitors?date=1404198000000&ignore=avila_adobe',
		);
		expect(response.data).toEqual({
			attendance: {
				month: '6',
				year: 2014,
				lowest: {
					museum: 'hellman_quon',
					visitors: '120',
				},
				highest: {
					museum: 'america_tropical_interpretive_center',
					visitors: '13490',
				},
				ignored: {
					museum: 'avila_adobe',
					visitors: '32378',
				},
				total: 28157,
			},
		});
		expect(response.status).toBe(200);
	});

	// when date is given and has a proper epoch
	it('should not have ignored obj', async () => {
		const response = await axios.get(
			'https://dukls79rad.execute-api.ap-south-1.amazonaws.com/api/visitors?date=1404198000000',
		);
		expect(response.data).toEqual({
			attendance: {
				month: '6',
				year: 2014,
				lowest: {
					museum: 'hellman_quon',
					visitors: '120',
				},
				highest: {
					museum: 'avila_adobe',
					visitors: '32378',
				},
				total: 60535,
			},
		});
		expect(response.status).toBe(200);
	});
});
