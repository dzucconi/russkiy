export const pad = (n: number): string => (n < 10 ? `0${n}` : `${n}`);

export const time = (dt: number) => {
  dt = dt * 60 * 60;
  const hours = Math.floor(dt / (60 * 60));
  dt = dt - hours * 60 * 60;
  const minutes = Math.floor(dt / 60);
  dt = dt - minutes * 60;
  const seconds = Math.round(dt);
  return [hours, minutes, seconds].map(pad).join(":");
};

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
