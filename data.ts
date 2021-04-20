import _words from "russian-words";

// Temporarily move and trim the last word and put in front
// https://github.com/solovets/russian-words/pull/1
const last = _words.pop();
_words.unshift(last.trim());

export const words: string[] = _words;
