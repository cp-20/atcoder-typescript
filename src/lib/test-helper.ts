import { mean } from './utils/array';

export const bench = (fn: () => void, count = 5) => {
  Bun.gc(true);

  const result = new Array(count).fill(0).map(() => {
    const start = Bun.nanoseconds();
    fn();
    const end = Bun.nanoseconds();

    return end - start;
  });

  return mean(result);
};

export const report = (result: { time: number; [key: string]: unknown }[]) => {
  const enhanced = result.map((x) => ({
    ...x,
    time: (x.time / 1e6).toFixed(2) + 'ms',
  }));

  console.table(enhanced);
};
