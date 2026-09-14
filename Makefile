.PHONY: all dev build-js build deploy clean

HUGO ?= hugo

all: build

## Start Hugo development server
dev:
	$(HUGO) server -D

## Compile assets/js/nostr-comments.js into static/js/nostr-comments.bundle.js
build-js:
	@mkdir -p static/js
	@bash -c 'export NVM_DIR="$$HOME/.nvm"; [ -s "$$NVM_DIR/nvm.sh" ] && \. "$$NVM_DIR/nvm.sh"; nvm use default || true; node scripts/build-bundle.js'

## Build Hugo static site
build: build-js
	$(HUGO) --minify

## Deploy changes to GitHub (triggers GitHub Pages workflow)
deploy: build
	@status=$$(git status -s); \
	if [ -n "$$status" ]; then \
		echo "Repository has uncommitted changes. Please commit before deploying."; \
		exit 1; \
	fi
	git push origin master

## Clean generated files
clean:
	rm -rf public resources/_gen .hugo_build.lock
