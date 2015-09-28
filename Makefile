export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)
local DIST="dist"

start:
	rm -rf DIST
	mkdir DIST

	exec browserify -r react -r react-dom -o DIST/vendor.js

	@NODE_ENV="development" NODE_PATH="node_modules:app" \
	exec watchify \
		-e app/index.js \
		-x react -x react-dom \
		-p livereactload \
		-t babelify \
		-dv -o DIST/bundle.js &

	exec http-server -p 3000 app

start-server:
	exec nodemon --exec babel-node -- index.js

clean:
	rm -rf DIST
