import json

json_file = r'c:\futurax\Futura-Edtech\src\social\chapter1-version3\components\json\page2.json'
with open(json_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

mapping = {
    0: "t-1",
    1: "t-2",
    2: "t-3",
    25: "s-1",
    26: "s-2",
    27: "s-3",
    28: "s-4",
    29: "s-5",
    30: "s-6",
    31: "s-7",
    32: "p1-2",
    33: "p1-3",
    34: "p1-4",
    35: "p1-5",
    36: "p1-6",
    37: "p1-7",
    38: "p1-8",
    39: "p1-9",
    40: "p1-10",
    41: "p1-12",
    42: "p1-13",
    43: "p1-14",
    44: "p1-15",
    45: "p1-16",
    46: "p1-17",
    47: "p1-18",
    # 48 is audio-only "the"
    49: "p1-19",
    50: "p1-20",
    51: "p1-21",
    52: "p1-22",
    53: "p1-23",
    54: "p1-24",
    55: "p1-25",
    56: "p1-26",
    57: "p1-27",
    58: "p1-28",
    59: "p1-29",
    60: "p2A-1",
    61: "p2A-2",
    62: "p2A-3",
    63: "p2A-4",
    64: "p2A-5",
    65: "p2A-6",
    66: "p2A-7",
    67: "p2A-8",
    68: "p2A-9",
    69: "p2A-10",
    # 70 is audio-only "work"
    71: "p2B-1",
    72: "p2C-1",
    73: "p2C-2",
    74: "p2C-3",
    75: "p2C-4",
    76: "p2C-5",
    77: "p2C-6",
    78: "p2C-7",
    79: "p2C-8",
    80: "p2C-9",
    81: "p2C-10",
    82: "p2C-11",
    83: "p2C-12",
    84: "p2C-13",
    85: "p2C-14",
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

# write just the JSON array to a text file
with open('temp_page2_transcript.json', 'w', encoding='utf-8') as f:
    json.dump(out_list, f, indent=2)
