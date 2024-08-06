# Crossword Builder Back End #

This is the back end for the Crossword Builder app.


## Installation

Ensure that you have python 3.12 or higher installed.
```
python --version
```

If not, you can use a tool like [pyenv](https://github.com/pyenv/pyenv) to install a recent
version of python.

We're using [poetry](https://python-poetry.org/) to manage this project's dependencies in a
virtual environment. Install that tool following its 
[installation instructions](https://python-poetry.org/docs/#installation) and, while you're at it,
peruse its [basic usage](https://python-poetry.org/docs/basic-usage/). Once poetry is installed,
you can install dependency packages with:
```
cd crossword-builder/back-end/
poetry install
```


## Entering the virtual environment

You can enter the virtual environment created by poetry by running:
```
poetry shell
```


## Development ##

To start an instance of the API in development mode, enter the virtual environment and run:
```
fastapi dev crossword_builder_api/main.py
```

To check out the live API documentation, visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
in a web browser.


## Testing ##

To execute the API's testsuite, enter the virtual environment and run:
```
pytest
```


## Setting up your editor

To set up VSCode (or whatever editor you prefer), you'll need to know where poetry stores its 
virtual environment. You can find this out by running:
```
poetry show -v
```
