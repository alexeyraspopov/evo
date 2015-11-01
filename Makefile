.PHONY: start test lint bundle clean

export PATH:=$(shell pwd)/node_modules/.bin:$(PATH)
export NODE_PATH:=node_modules:app

INCLUDE_VENDOR=-r react -r react-dom
EXCLUDE_VENDOR=-x react -x react-dom
TRANSFORMERS=-g envify -t babelify
WEB_ENTRY=-e app/index.web.js $(EXCLUDE_VENDOR) $(TRANSFORMERS)

start: export NODE_ENV=development
start: export STATIC=dist
start: export PORT=3000
start: clean
	mkdir dist

	exec browserify $(INCLUDE_VENDOR) -g envify -o dist/vendor.js
	exec watchify $(WEB_ENTRY) -p livereactload -dv -o dist/bundle.js &
	exec postcss --use autoprefixer --use postcss-import -o dist/bundle.css app/main.css -w &
	exec nodemon --exec babel-node -- server/index.node.js

test: export NODE_ENV=development
test: lint
	# TBD

lint:
	exec eslint -c .eslintrc ./

bundle: export NODE_ENV=production
bundle: export STATIC=.
bundle: export PORT=80
bundle: clean test
	mkdir bundle

	exec browserify $(INCLUDE_VENDOR) -g envify | exec uglifyjs --compress > bundle/vendor.js
	exec browserify $(WEB_ENTRY) | exec uglifyjs --compress > bundle/bundle.js
	exec browserify -e server/index.node.js -x server/params.node.json $(TRANSFORMERS) --bare | exec uglifyjs --compress > bundle/server.js
	exec postcss --use autoprefixer --use postcss-import --use cssnano -o bundle/bundle.css app/main.css
	# TODO: params should be generated
	cp server/params.node.json bundle/params.node.json

clean:
	rm -rf dist bundle
