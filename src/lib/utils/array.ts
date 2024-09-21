import { randInt } from "./rand";

type Range = {
	(end: number): number[];
	(start: number, end: number): number[];
	(start: number, end: number, step: number): number[];
};
export const range: Range = (a: number, b?: number, c?: number) => {
	const start = b === undefined ? 0 : a;
	const end = b === undefined ? a : b;
	const step = c === undefined ? 1 : c;

	const result = [];
	for (let i = start; i < end; i += step) {
		result.push(i);
	}
	return result;
};

export const randomRange = (start: number, end: number, count: number) => {
	const result = [];
	for (let i = 0; i < count; i++) {
		result.push(randInt(start, end));
	}
	return result;
};

export const sum = (arr: number[]) => arr.reduce((acc, x) => acc + x, 0);

export const sumBig = (arr: bigint[]) => arr.reduce((acc, x) => acc + x, 0n);

export const sum998 = (arr: number[]) =>
	arr.reduce((acc, x) => (acc + x) % 998244353, 0);

export const sumBig998 = (arr: bigint[]) =>
	arr.reduce((acc, x) => (acc + x) % 998244353n, 0n);

export const mean = (arr: number[]) => sum(arr) / arr.length;

export const reshape = <T>(arr: T[], row: number, col: number) =>
	range(row).map((i) => arr.slice(i * col, (i + 1) * col));

export const transpose = <T>(arr: T[][]) =>
	range(arr[0].length).map((i) => arr.map((row) => row[i]));

export const array2D = <T>(row: number, col: number, fill: T) =>
	range(row).map(() => range(col).map(() => fill));

export const array3D = <T>(row: number, col: number, depth: number, fill: T) =>
	range(row).map(() => array2D(col, depth, fill));

export const minIndex = (arr: number[]) => arr.indexOf(Math.min(...arr));

export const maxIndex = (arr: number[]) => arr.indexOf(Math.max(...arr));

export const shuffle = <T>(arr: T[]) => {
	const result = arr.slice();
	for (let i = 0; i < arr.length; i++) {
		const j = randInt(i, arr.length);
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
};
