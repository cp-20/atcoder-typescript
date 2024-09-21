export type DoubleLinkedListNode<T> = {
  value: T;
  prev: DoubleLinkedListNode<T> | undefined;
  next: DoubleLinkedListNode<T> | undefined;
};

export class DoubleLinkedList<T> {
  static IndexOutOfRangeError = new Error('Index out of range');

  private _head: DoubleLinkedListNode<T> | undefined;
  private _tail: DoubleLinkedListNode<T> | undefined;
  private _length: number = 0;

  public get head() {
    return this._head;
  }

  public get tail() {
    return this._tail;
  }

  public get length() {
    return this._length;
  }

  constructor(initial: T[]) {
    if (initial.length === 0) {
      this._head = undefined;
      this._tail = undefined;
      this._length = 0;
      return;
    }

    this._length = initial.length;

    this._head = { value: initial[0], prev: undefined, next: undefined };

    let current = this._head;
    for (let i = 1; i < initial.length; i++) {
      const next: DoubleLinkedListNode<T> = {
        value: initial[i],
        prev: current,
        next: undefined,
      };
      current.next = next;
      current = next;
    }
    this._tail = current;
  }

  public toArray() {
    const result: T[] = [];
    let current = this._head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  public getNodeFromHead(index: number) {
    if (index < 0 || index >= this._length) throw DoubleLinkedList.IndexOutOfRangeError;

    let current = this._head;
    for (let i = 0; i < index; i++) {
      if (!current) return undefined;
      current = current.next;
    }

    return current?.value;
  }

  public getNodesFromHead(start: number, end: number) {
    if (start < 0 || end >= this._length || start > end) throw DoubleLinkedList.IndexOutOfRangeError;

    let current = this._head;
    for (let i = 0; i < start; i++) {
      if (!current) return [];
      current = current.next;
    }

    const result: T[] = [];
    for (let i = start; i <= end; i++) {
      if (!current) return result;
      result.push(current.value);
      current = current.next;
    }

    return result;
  }

  public getNodeFromTail(index: number) {
    if (index < 0 || index >= this._length) throw DoubleLinkedList.IndexOutOfRangeError;

    let current = this._tail;
    for (let i = 0; i < index; i++) {
      if (!current) return undefined;
      current = current.prev;
    }

    return current?.value;
  }

  public getNodesFromTail(start: number, end: number) {
    if (start < 0 || end >= this._length || start > end) throw DoubleLinkedList.IndexOutOfRangeError;

    let current = this._tail;
    for (let i = 0; i < start; i++) {
      if (!current) return [];
      current = current.prev;
    }

    const result: T[] = [];
    for (let i = start; i <= end; i++) {
      if (!current) return result;
      result.push(current.value);
      current = current.prev;
    }

    return result;
  }

  public getNode(index: number) {
    if (index < 0 || index >= this._length) throw DoubleLinkedList.IndexOutOfRangeError;

    if (index < this._length / 2) return this.getNodeFromHead(index);
    return this.getNodeFromTail(this._length - 1 - index);
  }

  public getNodes(start: number, end: number) {
    if (start < 0 || end >= this._length || start > end) throw DoubleLinkedList.IndexOutOfRangeError;

    if (start < this._length - end - 1) return this.getNodesFromHead(start, end);

    return this.getNodesFromTail(this._length - 1 - end, this._length - 1 - start).reverse();
  }

  public insertHead(value: T) {
    this._length++;

    const newHead: DoubleLinkedListNode<T> = {
      value,
      prev: undefined,
      next: this._head,
    };
    if (this._head) this._head.prev = newHead;
    else this._tail = newHead;
    this._head = newHead;
  }

  public insertTail(value: T) {
    this._length++;

    const newTail: DoubleLinkedListNode<T> = {
      value,
      prev: this._tail,
      next: undefined,
    };
    if (this._tail) this._tail.next = newTail;
    else this._head = newTail;
    this._tail = newTail;
  }

  public deleteHead() {
    this._length = Math.max(0, this._length - 1);

    if (!this._head) return;
    this._head = this._head.next;
    if (this._head) this._head.prev = undefined;
    else this._tail = undefined;
  }

  public deleteTail() {
    this._length = Math.max(0, this._length - 1);

    if (!this._tail) return;
    this._tail = this._tail.prev;
    if (this._tail) this._tail.next = undefined;
    else this._head = undefined;
  }

  public reverse() {
    let current = this._head;
    while (current) {
      const next = current.next;
      current.next = current.prev;
      current.prev = next;
      if (!next) this._tail = this._head;
      this._head = current;
      current = next;
    }
  }
}
