export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)

start:
	rm -rf dist
	mkdir dist

	exec browserify -r react -r react-dom -o dist/vendor.js

	@NODE_ENV="development" NODE_PATH="node_modules:app" \
	exec watchify \
		-e app/index.js \
		-x react -x react-dom \
		-p livereactload \
		-t babelify \
		-dv -o dist/bundle.js &

	exec http-server -p 3000 app

start-server:
	exec nodemon --exec babel-node -- index.js

clean:
	rm -rf dist
