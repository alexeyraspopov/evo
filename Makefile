export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)

start: clean
	mkdir dist

	@NODE_ENV="development" \
	exec browserify -r react -r react-dom -o dist/vendor.js

	@NODE_ENV="development" NODE_PATH="node_modules:app" \
	exec watchify \
		-e app/index.web.js \
		-x react -x react-dom \
		-p livereactload \
		-t babelify \
		-dv -o dist/bundle.js &

	@NODE_ENV="development" NODE_PATH="node_modules:app" \
	exec nodemon --exec babel-node -- index.node.js

bundle: clean
	mkdir bundle

	@NODE_ENV="production" \
	exec browserify -r react -r react-dom -o bundle/vendor.js

	@NODE_ENV="production" NODE_PATH="node_modules:app" \
	exec browserify -e app/index.web.js -x react -x react-dom -t babelify -o bundle/bundle.js

	@NODE_ENV="production" NODE_PATH="node_modules:app" \
	exec browserify -e index.node.js -t babelify --bare -o bundle/server.js

clean:
	rm -rf dist bundle
