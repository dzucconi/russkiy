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

const RUNTIME_IN_HOURS = 2;
const WORDS_PER_HOUR = words.length / RUNTIME_IN_HOURS;
const WORDS_PER_MINUTE = WORDS_PER_HOUR / 60;
const WORDS_PER_SECOND = WORDS_PER_MINUTE / 60;

const init = () => {
  const el = document.getElementById("root");
  const date = new Date();
  const now =
    date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 60 / 60;
  const interval = now % 2;
  const offset = Math.floor(remap(interval, 0, 2, 0, words.length));

  const fi = new FrameInterval(WORDS_PER_SECOND, ({ frame }) => {
    el.innerHTML = words[(frame + offset) % words.length];
  });

  fi.start();
};

init();

type Index = {
  [letter: string]: {
    index: number;
    interval: number;
  };
};

const INDEX = words.reduce((memo: Index, word, i) => {
  const letter = word.charAt(0);
  if (!!memo[letter]) {
    return memo;
  }

  memo[letter] = { index: i, interval: remap(i, 0, words.length, 0, 2) };
  return memo;
}, {});

console.info(
  `There are ${
    words.length
  } words. Running at ${WORDS_PER_SECOND} words per second, it will complete in ~${
    words.length / WORDS_PER_HOUR
  } hours.`
);

const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

const time = (dt: number) => {
  dt = dt * 60 * 60;
  const hours = Math.floor(dt / (60 * 60));
  dt = dt - hours * 60 * 60;
  const minutes = Math.floor(dt / 60);
  dt = dt - minutes * 60;
  const seconds = Math.round(dt);
  return [hours, minutes, seconds].map(pad).join(":");
};

const SCHEDULE = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map((offset) => {
  Object.keys(INDEX).map((letter) => {
    console.info(`| ${letter} | ${time(INDEX[letter].interval + offset)} |`);
  });
});

console.info(SCHEDULE);
