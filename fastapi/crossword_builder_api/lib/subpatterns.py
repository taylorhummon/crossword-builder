
def compute_subpatterns(
    pattern: str
) -> list[str]:
    subpatterns = [
        subsubpattern
        for subpattern in compute_subpatterns_trim_left(pattern)
        for subsubpattern in compute_subpatterns_trim_right(subpattern)
    ]
    subpatterns.sort(key = lambda subpattern: len(subpattern))
    return subpatterns

def compute_subpatterns_trim_left(
    pattern: str
) -> list[str]:
    index = _find_index(pattern)
    trim_points = []
    trim_points.append(0)
    for i in range(index):
        if pattern[i] == ".":
            trim_points.append(i + 1)
    return [
        pattern[trim_point:len(pattern)]
        for trim_point in reversed(trim_points)
    ]

def compute_subpatterns_trim_right(
    pattern: str
) -> list[str]:
    index = _find_index(pattern)
    trim_points = []
    for i in range(index + 1, len(pattern)):
        if pattern[i] == ".":
            trim_points.append(i)
    trim_points.append(len(pattern))
    print(f"trim_points: {trim_points}")
    return [
        pattern[0:trim_point]
        for trim_point in trim_points
    ]

def _find_index(
    pattern: str
) -> int:
    index = pattern.index("@")
    if index != pattern.rindex("@"):
        raise Exception("found multiple @ in pattern")
    return index
