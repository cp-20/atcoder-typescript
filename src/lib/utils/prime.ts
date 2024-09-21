export const getPrimes = (n: number): number[] => {
	const primes = [];
	const isPrime = Array(n).fill(true);
	for (let i = 2; i < n; i++) {
		if (isPrime[i]) {
			primes.push(i);
			for (let j = i * i; j < n; j += i) {
				isPrime[j] = false;
			}
		}
	}
	return primes;
};
