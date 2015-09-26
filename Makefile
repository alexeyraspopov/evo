export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)

start:
	exec browserify \
		--require react \
		--require react-dom \
		--outfile app/dist/vendor.js
	@NODE_ENV="development" NODE_PATH="node_modules:app" exec watchify \
		--entry app/index.js \
		--external react \
		--external react-dom \
		--transform babelify \
		--transform envify \
		--debug --verbose \
		--outfile app/dist/bundle.js &
	exec http-server -p 3000 app

clean:
	rm -rf app/dist
