.PHONY: start test lint bundle clean

export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)
export NODE_PATH:=node_modules:app

start: clean
	# FIXME: can't use it now
	export NODE_ENV=development

	mkdir dist

	exec browserify -r react -r react-dom -o dist/vendor.js

	exec watchify \
		-e app/index.web.js \
		-x react -x react-dom \
		-p livereactload \
		-t babelify \
		-dv -o dist/bundle.js &

	exec nodemon --exec babel-node -- index.node.js

test: lint
	export NODE_ENV=development

	# TBD

lint:
	# TBD

bundle: clean test
	export NODE_ENV=production

	mkdir bundle

	exec browserify -r react -r react-dom -o bundle/vendor.js
	exec browserify -e app/index.web.js -x react -x react-dom -t babelify -o bundle/bundle.js
	exec browserify -e index.node.js -t babelify --bare -o bundle/server.js

clean:
	rm -rf dist bundle
