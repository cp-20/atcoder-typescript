export const lowerBound = <A, T>(arr: A[], target: T, comp: (a: A, b: T) => number): number => {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (comp(arr[mid], target) < 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

export const lowerBoundNumber = (arr: number[], target: number): number => lowerBound(arr, target, (a, b) => a - b);

export const upperBound = <A, T>(arr: A[], target: T, comp: (a: A, b: T) => number): number => {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (comp(arr[mid], target) <= 0) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};

export const upperBoundNumber = (arr: number[], target: number): number => upperBound(arr, target, (a, b) => a - b);
