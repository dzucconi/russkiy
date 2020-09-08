import { init, EL } from "./init";
import { info, schedule } from "./schedule";

(() => {
  if (window.location.search.includes("?schedule")) {
    document.getElementById(EL).innerHTML = `
      <p>${info()}</p>
      <p>${schedule()
        .map(({ letter, at }) => {
          return `<span>${letter}</span> begins at ${at}`;
        })
        .join("<br />")}</p>
    `;
    return;
  }

  init();
})();
