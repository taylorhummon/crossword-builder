# Crossword Builder Front End #

This is the front end for the Crossword Builder app.


## Installing Dependencies ##

Make sure you have [Node.JS](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.
Then install dependencies:
```
cd crossword-builder/front_end/
yarn
```


## Running the Crossword Builder API ##

Follow the instructions in [crossword-builder/back_end/README.md](../back_end/README.md) to
get the Crossword Builder API running.


## Running the Crossword Builder Front End ##

To spin up an instance of the front end in development mode, run:
```
yarn dev
```

You should then be able to view the app at [http://localhost:3000](http://localhost:3000) in your
browser.


### Testing

To execute the front end's test suite, run:
```
yarn test
```


### Linting and Checking Types

To lint, run:
```
yarn lint
```

And to execute the type checker, run:
```
yarn check-types
```


### Building

To build the app and preview the result, run:
```
yarn build &&
yarn preview
```
