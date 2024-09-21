export const gcd = (a: number, b: number): number => {
	if (b === 0) return a;
	return gcd(b, a % b);
};

export const gcdBig = (a: bigint, b: bigint): bigint => {
	if (b === 0n) return a;
	return gcdBig(b, a % b);
};

export const lcm = (a: number, b: number): number => {
	return (a * b) / gcd(a, b);
};

export const lcmBig = (a: bigint, b: bigint): bigint => {
	return (a * b) / gcdBig(a, b);
};
