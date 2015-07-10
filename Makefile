#
# Node Module
#

node_modules: package.json
	@npm install



#
# Tests
#

istanbul: node_modules
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/.bin/_mocha --report lcovonly -- -R spec



#
# Clean up
#

clean-coverage:
	@rm -rf ./coverage



#
# Instructions
#

test-cov: istanbul clean-coverage
