import { remap, time } from "./util";
import { WORDS_PER_SECOND, WORDS_PER_HOUR } from "./init";
import { words } from "./data";

type Index = {
  [letter: string]: {
    index: number;
    interval: number;
  };
};

export const info = () => {
  return `There are ${
    words.length
  } words. Running at ${WORDS_PER_SECOND} words per second, the work will repeat every ${
    words.length / WORDS_PER_HOUR
  } hour${words.length / WORDS_PER_HOUR === 1 ? "" : "s"}.`;
};

export const schedule = () => {
  const index = words.reduce((memo: Index, word, i) => {
    const letter = word.charAt(0);

    if (!!memo[letter] || letter === "") {
      return memo;
    }

    memo[letter] = { index: i, interval: remap(i, 0, words.length, 0, 2) };
    return memo;
  }, {});

  return [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
    .map((offset) => {
      return Object.keys(index).map((letter) => {
        return { letter, at: time(index[letter].interval + offset) };
      });
    })
    .reduce((acc, val) => acc.concat(val), []);
};
