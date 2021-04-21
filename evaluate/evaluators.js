export const ev = {
	status200: (status, element) => {
		if( status == '200' ) return true;
		element.innerHTML = 'Response status is not 200.'
		return false
	},

	isArray: (body, element) => {
		if( Array.isArray(body) ) return true;
		element.innerHTML = 'Does not respond with an array.'
		return false
	},

	arrayHasData: (body, element) => {
		if( body.length >= 1 ) return true;
		element.innerHTML = 'Array does not have any data.'
		return false
	},

	isHamster: (object, element) => {
		console.log('isHamster', object);
		// Test if object has certain properties
		if( object && ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games'].every(o => object.hasOwnProperty(o)) )
			return true
		element.innerHTML = 'Did not respond with a hamster object.'
		return false
	},

	objectHasId: (object, element) => {
		if( object && object.id )
			return true
		element.innerHTML = 'Must respond with an object that has an id property: { id: "id from database here" }'
		return false
	}
}
