export const factorial = (n: number): number => {
	let result = 1;
	for (let i = 2; i <= n; i++) {
		result *= i;
	}
	return result;
};

export const permutations = (n: number, r: number): number => {
	return factorial(n) / factorial(n - r);
};

export const combinations = (n: number, r: number): number => {
	return permutations(n, r) / factorial(r);
};
