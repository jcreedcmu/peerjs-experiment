watch:
	node build.mjs watch

build:
	node build.mjs

deploy:
	git push origin  'main:deploy'
