.PHONY: start test lint bundle clean

export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)
export NODE_PATH:=node_modules:app

start: export NODE_ENV=development
start: clean
	mkdir dist

	exec browserify -r react -r react-dom -o dist/vendor.js

	exec watchify \
		-e app/index.web.js \
		-x react -x react-dom \
		-p livereactload \
		-t babelify \
		-dv -o dist/bundle.js &

	exec nodemon --exec babel-node -- index.node.js

test: export NODE_ENV=development
test: lint
	# TBD

lint:
	# TBD

bundle: export NODE_ENV=production
bundle: clean test
	mkdir bundle

	exec browserify -r react -r react-dom -o bundle/vendor.js
	exec browserify -e app/index.web.js -x react -x react-dom -t babelify -o bundle/bundle.js
	exec browserify -e index.node.js -x ./params.node.json -t babelify --bare -o bundle/server.js
	# TODO: params should be generated
	cp ./params.node.json bundle/params.node.json

clean:
	rm -rf dist bundle
