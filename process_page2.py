import json
import os

json_file = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\json\page2.json'

with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Define mapping rules. We will map index to pageWordId.
# Using a list of tuples: (audio_word_index, pageWordId)
mapping = {
    0: "t-1", # Who
    1: "t-2", # was
    2: "t-3", # Aryabhata?
    # 3-24 audio only
    25: "s-1", # a -> A
    26: "s-2", # pioneer
    27: "s-3", # of
    28: "s-4", # Indian
    29: "s-5", # astronomy
    30: "s-6", # and -> &
    31: "s-7", # mathematics.
    32: "p1-2", # Around -> around
    33: "p1-3", # 500
    34: "p1-4", # CE,
    35: "p1-5", # Aryabhata -> Āryabhaṭa
    36: "p1-6", # asked
    # 37: some, 38: very, 39: important
    40: "p1-8", # questions.
    41: "p1-10", # What -> what
    42: "p1-11", # shape
    43: "p1-12", # is
    44: "p1-13", # the
    45: "p1-14", # earth? -> Earth,
    46: "p1-15", # Why -> why
    47: "p1-16", # do
    # 48: the
    49: "p1-17", # stars
    50: "p1-18", # appear
    51: "p1-19", # to
    52: "p1-20", # move? -> move,
    53: "p1-21", # And -> and
    54: "p1-22", # how
    # 55: can
    56: "p1-24", # we
    57: "p1-25", # measure
    58: "p1-26", # our
    59: "p1-27", # planet?
    60: "p2A-1", # At
    61: "p2A-2", # just
    62: "p2A-3", # 23
    63: "p2A-4", # years
    64: "p2A-5", # of
    65: "p2A-6", # age,
    66: "p2A-7", # he
    67: "p2A-8", # composed
    # 68: his -> the (text)
    69: "p2A-10", # famous
    # 70: work
    71: "p2B-1", # Aryabhatya -> Āryabhaṭīya
    72: "p2C-1", # in
    73: "p2C-2", # 499
    74: "p2C-3", # CE.
    75: "p2C-4", # It
    76: "p2C-5", # became
    # 77: an, 78: important -> a foundational
    79: "p2C-8", # work
    # 80: that
    81: "p2C-9", # influenced -> influencing
    # 82: many
    83: "p2C-12", # scholars -> scholars.
    # 84: for
    85: "p2C-10", # generations. -> generations
}

out_list = []
for i, w in enumerate(data['words']):
    item = {
        "audioWord": w['text'],
        "start": w['start'],
        "end": w['end']
    }
    if i in mapping:
        item["pageWordId"] = mapping[i]
        item["matchType"] = "matched"
    else:
        item["matchType"] = "audio-only"
    out_list.append(item)

out_path = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\ChapterIntroduction\AryabhataTranscript.js'
with open(out_path, 'a', encoding='utf-8') as f:
    f.write(f"\nexport const PAGE2_TRANSCRIPT = {json.dumps(out_list, indent=2)};\n")

