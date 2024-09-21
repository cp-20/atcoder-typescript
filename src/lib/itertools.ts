export const listPermutations = <T>(arr: T[]): T[][] => {
  // use yield

  if (arr.length === 1) {
    return [arr];
  }

  return listPermutations(arr.slice(1)).flatMap((permutation) =>
    arr.map((_, i) => [...permutation.slice(0, i), arr[0], ...permutation.slice(i)]),
  );
};
