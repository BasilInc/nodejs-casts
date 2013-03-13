TESTS = $(shell find test -name "*.server.js")

test-server:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS)

test-client:
	testacular start testacular.conf.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha $(TESTS) && testacular start testacular.conf.js

dependencies:
	sudo npm install -g testacular && sudo npm install -g grunt-cli

angular:
	cd public/vendor/angular && npm install && grunt package

.PHONY: test