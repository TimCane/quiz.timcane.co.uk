export class StateDictionary<T> {
    private map: Map<string, T>;
  
    constructor() {
      this.map = new Map();
    }
  
    get(...args: string[]): T | undefined {
      const key = this.buildKey(...args);
      return this.map.get(key);
    }
  
    set(value: T, ...args: string[]) {
      const key = this.buildKey(...args);
      this.map.set(key, value);
  
      return value;
    }
  
    loadFromCache (cacheArgs: string[], queryfunc: () => T): T {
      let cached = this.get(...cacheArgs);
  
      if (!cached) {
        cached = this.set(queryfunc(), ...cacheArgs);
      }
  
      return cached;
    }
  
    private buildKey(...args: string[]) {
      return args.join('|');
    }
  }
  