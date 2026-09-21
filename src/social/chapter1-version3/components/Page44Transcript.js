export const PAGE44_TRANSCRIPT = [
  // Task Header
  { "audioWord": "Task", "start": 0.0, "end": 0.54, "pageWordId": "h-1", "matchType": "matched" },
  { "audioWord": "3", "start": 0.54, "end": 0.84, "pageWordId": "h-2", "matchType": "matched" },
  { "audioWord": "is", "start": 0.84, "end": 1.14, "pageWordId": "h-3", "matchType": "unmatched" },
  { "audioWord": "called", "start": 1.14, "end": 1.48, "pageWordId": "h-4", "matchType": "unmatched" },
  { "audioWord": "Find", "start": 1.48, "end": 2.08, "pageWordId": "h-5", "matchType": "matched" },
  { "audioWord": "the", "start": 2.08, "end": 2.3, "pageWordId": "h-6", "matchType": "matched" },
  { "audioWord": "Place.", "start": 2.3, "end": 2.66, "pageWordId": "h-7", "matchType": "matched" },

  // Paragraph
  { "audioWord": "By", "start": 3.34, "end": 3.56, "pageWordId": "p-1", "matchType": "matched" },
  { "audioWord": "crossing", "start": 3.56, "end": 3.92, "pageWordId": "p-2", "matchType": "matched" },
  { "audioWord": "latitude", "start": 3.92, "end": 4.36, "pageWordId": "p-3", "matchType": "matched" },
  { "audioWord": "and", "start": 4.36, "end": 4.74, "pageWordId": "p-4", "matchType": "matched" },
  { "audioWord": "longitude,", "start": 4.74, "end": 5.3, "pageWordId": "p-5", "matchType": "matched" },
  { "audioWord": "we", "start": 5.72, "end": 5.9, "pageWordId": "p-6", "matchType": "matched" },
  { "audioWord": "create", "start": 5.9, "end": 6.22, "pageWordId": "p-7", "matchType": "matched" },
  { "audioWord": "a", "start": 6.22, "end": 6.48, "pageWordId": "p-8", "matchType": "matched" },
  { "audioWord": "global", "start": 6.48, "end": 6.78, "pageWordId": "p-9", "matchType": "matched" },
  { "audioWord": "grid.", "start": 6.78, "end": 7.04, "pageWordId": "p-10", "matchType": "matched" },
  { "audioWord": "Let's", "start": 7.52, "end": 7.82, "pageWordId": "p-11", "matchType": "matched" },
  { "audioWord": "practice", "start": 7.82, "end": 8.24, "pageWordId": "p-12", "matchType": "matched" },
  { "audioWord": "finding", "start": 8.24, "end": 8.7, "pageWordId": "p-13", "matchType": "matched" },
  { "audioWord": "coordinates.", "start": 8.7, "end": 9.34, "pageWordId": "p-14", "matchType": "matched" },

  // "Now, move the coordinates and find the 5 cities on the map."
  // We map "move the coordinates" to the H2 "Move to Coordinates"
  { "audioWord": "Now,", "start": 10.3, "end": 10.7, "pageWordId": "h2-0", "matchType": "unmatched" },
  { "audioWord": "move", "start": 10.86, "end": 11.12, "pageWordId": "h2-1", "matchType": "matched" },
  { "audioWord": "the", "start": 11.12, "end": 11.42, "pageWordId": "h2-2", "matchType": "unmatched" }, // The UI says "Move to Coordinates", audio says "move the coordinates" - let's just map "to" instead of "the" manually below. Actually let's map "the" to "to". Wait, "the" won't match "to" if we just split text. The WordRenderer uses index.
  // "Move to Coordinates" -> words: Move (1), to (2), Coordinates (3)
  { "audioWord": "the", "start": 11.12, "end": 11.42, "pageWordId": "h2-2", "matchType": "matched" }, // maps to "to"
  { "audioWord": "coordinates", "start": 11.42, "end": 11.88, "pageWordId": "h2-3", "matchType": "matched" },
  { "audioWord": "and", "start": 11.88, "end": 12.58, "pageWordId": "h2-4", "matchType": "unmatched" },
  { "audioWord": "find", "start": 12.58, "end": 12.94, "pageWordId": "h2-5", "matchType": "unmatched" },
  { "audioWord": "the", "start": 12.94, "end": 13.18, "pageWordId": "h2-6", "matchType": "unmatched" },
  { "audioWord": "5", "start": 13.18, "end": 13.42, "pageWordId": "h2-7", "matchType": "unmatched" },
  { "audioWord": "cities", "start": 13.42, "end": 13.76, "pageWordId": "h2-8", "matchType": "unmatched" },
  { "audioWord": "on", "start": 13.76, "end": 14.02, "pageWordId": "h2-9", "matchType": "unmatched" },
  { "audioWord": "the", "start": 14.02, "end": 14.16, "pageWordId": "h2-10", "matchType": "unmatched" },
  { "audioWord": "map.", "start": 14.16, "end": 14.34, "pageWordId": "h2-11", "matchType": "unmatched" }
];
