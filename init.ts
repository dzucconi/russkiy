import words from "an-array-of-english-words";
import { FrameInterval } from "frame-interval";
import { remap } from "./util";

export const RUNTIME_IN_HOURS = 2;
export const WORDS_PER_HOUR = words.length / RUNTIME_IN_HOURS;
export const WORDS_PER_MINUTE = WORDS_PER_HOUR / 60;
export const WORDS_PER_SECOND = WORDS_PER_MINUTE / 60;
export const EL = "root";

export const init = () => {
  const el = document.getElementById(EL);
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
