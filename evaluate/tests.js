const ev = (await import('./evaluators.js')).ev

// Test för varje resurs i uppgiften
export const tests = (addEvaluator, data) => [
	addEvaluator('GET', () => '/hamsters', () => null, (statusCode, body, messageElement) => {
		data.hamsters = body  // all objects in collection
		return ev.status200(statusCode, messageElement)
			&& ev.isArray(body, messageElement)
			&& ev.arrayHasData(body, messageElement)
		// check if contents ok
	}),

	addEvaluator('POST', () => '/hamsters/', getNewObject, (statusCode, body, messageElement) => {
		data.newId = body && body.id
		console.log('tests.js POST data=', data);
		return ev.status200(statusCode, messageElement)
			&& ev.objectHasId(body, messageElement)
	}),

	addEvaluator('GET', () => ('/hamsters/' + data.newId), () => null, (statusCode, body, messageElement) => {
		return ev.status200(statusCode, messageElement)
			&& ev.isHamster(body, messageElement)
	}),

]

function getNewObject() {
	return {
	   "name":"Banan",
	   "age":5,
	   "favFood":"morot",
	   "loves":"springa i hamsterhjulet",
	   "imgName":"hamster-2.jpg",
	   "wins":0,
	   "defeats":0,
	   "games":0
	}
}
