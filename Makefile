install:
	npm i

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test