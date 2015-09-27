export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)

start:
	rm -rf app/dist
	mkdir app/dist
	exec browserify -r react -r react-dom -o app/dist/vendor.js
	@NODE_ENV="development" NODE_PATH="node_modules:app" exec watchify -e app/index.js -x react -x react-dom -p livereactload -t babelify -dv -o app/dist/bundle.js &
	exec http-server -p 3000 app

clean:
	rm -rf app/dist
