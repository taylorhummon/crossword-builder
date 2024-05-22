import pickle
import re

MINIMUM_MULTIPLICITY = 2
MINIMUM_WORD_LENGTH = 2
MAXIMUM_WORD_LENGTH = 10

def process():
    dictionary = load_dictionary()
    words_by_length = {}
    for n in range(MINIMUM_WORD_LENGTH, MAXIMUM_WORD_LENGTH + 1):
        words_by_length[n] = []
    for key, count in dictionary.items():
        if (count >= MINIMUM_MULTIPLICITY and uses_letters_only(key)):
            words_by_length[len(key)].append(key)
    for n in range(MINIMUM_WORD_LENGTH, MAXIMUM_WORD_LENGTH + 1):
        words_by_length[n].sort()
        with open(f"output/words{n}.txt", "w") as file:
            for word in words_by_length[n]:
                file.write(word)
                file.write("\n")

def load_dictionary():
    with open("output/dictionary.pkl", "rb") as f:
        return pickle.load(f)

def uses_letters_only(s):
    return re.fullmatch(r'[A-Z]*', s) is not None

process()
