import words from "an-array-of-english-words";
import { FrameInterval } from "frame-interval";

export const remap = (
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) => {
  return (
    outputMin +
    ((value - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin)
  );
};

const el = document.getElementById("root");

const RUNTIME_IN_HOURS = 2;
const WORDS_PER_HOUR = words.length / RUNTIME_IN_HOURS;
const WORDS_PER_MINUTE = WORDS_PER_HOUR / 60;
const WORDS_PER_SECOND = WORDS_PER_MINUTE / 60;

const _INDEX: { [letter: string]: number } = words.reduce((memo, word, i) => {
  const letter = word.charAt(0);

  if (typeof memo[letter] === "number") {
    return memo;
  }

  memo[letter] = i;
  return memo;
}, {});

console.info(
  `There are ${
    words.length
  } words. Running at ${WORDS_PER_SECOND} words per second, it will complete in ~${
    words.length / WORDS_PER_HOUR
  } hours.`
);

const date = new Date();
const now =
  date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 60 / 60;
const interval = now % 2;
const offset = Math.floor(remap(interval, 0, 2, 0, words.length));

const fi = new FrameInterval(WORDS_PER_SECOND, ({ frame }) => {
  el.innerHTML = words[(frame + offset) % words.length];
});

fi.start();
