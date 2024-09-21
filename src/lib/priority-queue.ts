export class PriorityQueue<T> {
  private queue: { item: T; priority: number }[];

  constructor(initialItems: { item: T; priority: number }[] = []) {
    this.queue = initialItems;
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  get length() {
    return this.queue.length;
  }

  enqueue(item: T, priority: number) {
    this.queue.push({ item, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift()?.item;
  }

  peek() {
    return this.queue[0].item;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
