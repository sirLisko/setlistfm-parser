test:
	./node_modules/.bin/mocha \
		--reporter Spec \
		--ui tdd

test-all:
	make test

.PHONY: test
