import { readFileSync } from 'node:fs';
const inputs = readFileSync('/dev/stdin', 'utf8');
const lines = inputs.split('\n');

export const getLines = () => lines;

export const getLine = (i: number) => lines[i];

export const getLineNumbers = (i: number) => lines[i].split(' ').map(Number);

export const getLinesNumber = (i: number, n: number) => lines.slice(i, i + n).map(Number);

export const getMatrix = (i: number, n: number) => lines.slice(i, i + n).map((v) => v.split(' ').map(Number));
