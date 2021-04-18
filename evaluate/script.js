const qs = document.querySelector
const ce = document.createElement

const submission = qs('#submission')
const urlInput = qs('#submission > input')
const testAllButton = qs('#submission > button')

const status = { ok: '✔️', fail: '❌', inProgress: '⏳', notStarted: '❔' }


// /hamsters
const tests = [
	addEvaluator('GET', '/hamsters', null, (statusCode, body, messageElement) => {
		if( statusCode != '200' ) {
			messageElement.innerHTML = 'Response status is not 200.'
			return false
		}
		if( !Array.isArray(body) ) {
			messageElement.innerHTML = 'Does not respond with an array.'
			return false
		}
		if( body.length < 1 ) {
			messageElement.innerHTML = 'Array does not have any data.'
			return false
		}
		// check if contents ok

		return true
	})
]


function addEvaluator(method, resourceWithParams, body, checkResponse) {
	let div = ce('div'), code = ce('code'), span1 = ce('span'), span2 = ce('span'), span3 = ce('span')
	span1.innerHTML = status.notStarted
	span2 = `${method} ${resourceWithParams}`
	code.appendChild(span1)
	code.appendChild(span2)
	div.appendChild(code)
	div.appendChild(span3)

	return async function() {
		span1.innerHTML = status.inProgress
		try {
			const response = await fetch(resourceWithParams, { method, body: JSON.stringify(body) })
			const statusCode = response.status
			const json = await response.json()
			if( checkResponse(statusCode, json, span3) ) {
				span1.innerHTML = status.ok
			} else {
				span1.innerHTML = status.fail
			}
		} catch {
			span1.innerHTML = status.fail
		}
	}
}
