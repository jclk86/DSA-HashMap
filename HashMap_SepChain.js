"use strict";

class HashMap_SepChain {
  constructor(initialCapacity = 8) {
    this.length = 9;
    this._hashTable = [];
    this._capacity = initialCapacity;
  }

  get(key) {
    // Because this slot has a linked list with its own
    // indices.
    // Notice: no findslot in method
    // because this method holds a base version of findSlot
    // gets string ascii
    // then hash modulus the capacity should give you index to use
    const hash = HashMap_SepChain._hashString(key);
    const index = hash % this._capacity;
    const slot = this._hashTable[index];

    if (slot === undefined) {
      throw new Error("Key Error");
    }
    // iteratate over slot
    for (let i = 0; i < slot.length; i++) {
      if (slot[i].key === key) {
        return slot[i].value;
      }
    }
  }

  // function that takes a string and hashes it
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap_SepChain.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap_SepChain.SIZE_RATIO);
    }
    // Uses this again to substitute for a baser version of findSlot
    const hash = HashMap_SepChain._hashString(key);
    const index = hash % this._capacity;
    // setting that slot to an empty value if nothing in it
    // looks like this sets each slot to an array already
    if (!this._hashTable[index]) {
      this._hashTable[index] = [];
    }
    // by the time it goes down here, the first item already set the slot to array
    // essentially, treating it like an array
    for (let i = 0; i < this._hashTable[index].length; i++) {
      if (this._hashTable[index][i].key === key) {
        return (this._hashTable[index][i].value = value);
      }
    }
    // pushes another value to the index position of the HASHTABLE
    // into a slot, that is an array
    this.length++;
    this._hashTable[index].push({
      key,
      value
    });
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this.length = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        slot.forEach(obj => this.set(obj.key, obj.value));
      }
    }
  }

  delete(key) {
    const hash = HashMap_SepChain._hashString(key);
    const index = hash % this._capacity;
    const slot = this._hashTable[index];

    if (slot === undefined) {
      throw new Error("Key Error");
    }
    // essentially go through the array within the slot
    // and delete it via splice
    for (let i = 0; i < slot.length; i++) {
      if (slot[i].key === key) {
        this.length--;
        this._hashTable[index].splice(i, 1);
        break;
      }
    }
  }
}

module.exports = { HashMap_SepChain };

// for linked list or closed address, the index is a pointer to the first node of a linked list. Use linked list traversal once you use the get() method of the hashMap()
// Separate chaining is used for large number of data.

// 2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10
// into the hash map with collisions resolved by separate chaining.Let the hash table have a length m = 9, and let the hash function be k mod m.

const HashMapSep = new HashMap_SepChain();

HashMapSep.set("5", 5);
HashMapSep.set("28", 28);
HashMapSep.set("19", 19);
HashMapSep.set("15", 15);
HashMapSep.set("20", 20);
HashMapSep.set("33", 33);
HashMapSep.set("12", 12);
HashMapSep.set("17", 17);
HashMapSep.set("10", 10);

console.log(HashMapSep);
