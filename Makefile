export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)

start:
	exec browserify \
		--require react \
		--require react-dom \
		--outfile app/dist/vendor.js
	exec watchify \
		--entry app/index.js \
		--external react \
		--external react-dom \
		--transform babelify \
		--debug --verbose \
		--outfile app/dist/bundle.js

clean:
	rm -rf app/dist
