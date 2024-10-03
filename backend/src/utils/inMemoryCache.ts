class InMemoryCache {
    private cache: Map<string, { value: any; expiry: number }> = new Map();

    async get(key: string): Promise<any> {
        const item = this.cache.get(key);
        if (item && item.expiry > Date.now()) {
            return item.value;
        }
        return null;
    }

    async set(key: string, value: any, ttl: number): Promise<void> {
        const expiry = Date.now() + ttl * 1000;
        this.cache.set(key, { value, expiry });
    }

    async del(key: string): Promise<void> {
        this.cache.delete(key);
    }
}

export const inMemoryCache = new InMemoryCache();
