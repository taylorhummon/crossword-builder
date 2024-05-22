# Crossword Builder Scraper #

This tool scrapes answers from a popular crossword puzzle and saves them in
text files according to the length of answer:
* `words2.txt` has answers of length 2,
* `words3.txt` has answers of length 3,
* etc.



## Installation ##

Create a virtual environment.
```
python3 -m venv .virtual_environment
```

Enter the virtual environment.
```
source .virtual_environment/bin/activate
```

Install the requests and beautiful soup packages in the virtual environment.
```
python -m pip install requests
python -m pip install beautifulsoup4
```


## Usage ##

To download the crossword puzzle answers run:
```
python download.py
```

Once that's done you can dump the results into text files.
```
python dump.py
```

The results will be in the `output/` directory.
