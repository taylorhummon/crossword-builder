import requests
from bs4 import BeautifulSoup
import time
from random import random
import pickle

NUMBER_OF_PAGES_TO_FETCH = 50

def fetch(pageCount):
    dictionary = dict()
    for i in range(1, pageCount + 1):
        wait_a_moment()
        words = words_from_soup(retrieve_soup(i))
        add_to_dictionary(dictionary, words)
        print(f"fetched page #{i}")
    with open("output/dictionary.pkl", "wb") as f:
        pickle.dump(dictionary, f)
    print("done!")

def wait_a_moment():
    time.sleep(random())

def retrieve_soup(i):
    url = f"https://nytcrosswordanswers.org/nyt-crossword-puzzles/page/{i}/"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    return soup

def words_from_soup(soup):
    words = []
    spans = soup.select("div.nywrap ul li span")
    for span in spans:
        words.append(span.get_text().upper())
    return words

def add_to_dictionary(dictionary, words):
    for word in words:
        if word in dictionary:
            dictionary[word] += 1
        else:
            dictionary[word] = 1

fetch(NUMBER_OF_PAGES_TO_FETCH)
