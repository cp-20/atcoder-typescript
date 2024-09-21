import { DoubleLinkedList } from './double-linked-list';

export class Queue<T> {
  private list: DoubleLinkedList<T>;

  constructor(initialItems: T[] = []) {
    this.list = new DoubleLinkedList(initialItems);
  }

  get length() {
    return this.list.length;
  }

  enqueue(item: T) {
    this.list.insertTail(item);
  }

  dequeue() {
    const head = this.list.head;
    this.list.deleteHead();
    return head?.value;
  }

  peek() {
    return this.list.head?.value;
  }

  isEmpty() {
    return this.list.length === 0;
  }
}
