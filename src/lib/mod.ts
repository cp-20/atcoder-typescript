import { lcmBig } from './utils/lcm-gcd';

let mod = 1000000007n;

export const setMod = (newVal: bigint): void => {
  mod = newVal;
};

export interface Mod {
  p: bigint;
  q: bigint;
}

export const newMod = (p: bigint, q: bigint = 1n): Mod => ({
  p: p % mod,
  q: q % mod,
});

export const addMod = (a: Mod, b: Mod): Mod => {
  const q = lcmBig(a.q, b.q);
  return newMod(a.p * (q / a.q) + b.p * (q / b.q), q);
};

export const subMod = (a: Mod, b: Mod): Mod => {
  const q = lcmBig(a.q, b.q);
  return newMod(a.p * (q / a.q) - b.p * (q / b.q), q);
};

export const mulMod = (a: Mod, b: Mod): Mod => {
  return newMod(a.p * b.p, a.q * b.q);
};

export const divMod = (a: Mod, b: Mod): Mod => {
  return newMod(a.p * b.q, a.q * b.p);
};

export const moduloInverse = (a: Mod): bigint => {
  let b = a.q;
  let m = mod;
  let u = 1n;
  let v = 0n;
  while (m) {
    const t = b / m;
    b -= t * m;
    [b, m] = [m, b];
    u -= t * v;
    [u, v] = [v, u];
  }
  return ((u + mod) * a.p) % mod;
};
