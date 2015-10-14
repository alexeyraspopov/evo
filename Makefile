.PHONY: start test lint bundle clean check-updates

export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)
export NODE_PATH:=node_modules:app

INCLUDE_VENDOR=-r react -r react-dom
EXCLUDE_VENDOR=-x react -x react-dom
WEB_ENTRY=-e app/index.web.js $(EXCLUDE_VENDOR) -t babelify -g envify

start: export NODE_ENV=development
start: clean
	mkdir dist

	exec browserify $(INCLUDE_VENDOR) -t envify -o dist/vendor.js
	exec watchify $(WEB_ENTRY) -p livereactload -dv -o dist/bundle.js &
	exec nodemon --exec babel-node -- index.node.js

test: export NODE_ENV=development
test: lint
	# TBD

lint:
	exec eslint -c .eslintrc ./

bundle: export NODE_ENV=production
bundle: clean test
	mkdir bundle

	exec browserify $(INCLUDE_VENDOR) -g envify -o bundle/vendor.js
	exec browserify $(WEB_ENTRY) -o bundle/bundle.js
	exec browserify -e index.node.js -x ./params.node.json -t babelify -g envify --bare -o bundle/server.js
	# TODO: params should be generated
	cp ./params.node.json bundle/params.node.json

clean:
	rm -rf dist bundle

check-updates:
	exec ncu
