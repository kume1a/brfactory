export class StorageService {
  static async get(key: string): Promise<string | null> {
    if (typeof document !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  static async set(key: string, value: string): Promise<void> {
    if (typeof document === 'undefined') {
      return;
    }

    return localStorage.setItem(key, value);
  }

  static async remove(key: string): Promise<void> {
    if (typeof document === 'undefined') {
      return;
    }

    return localStorage.removeItem(key);
  }
}
