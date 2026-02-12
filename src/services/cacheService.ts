
/**
 * Unified Cache Service for Voxel Empire
 * Handles localStorage with optional expiration and type safety.
 */

interface CacheItem<T> {
    value: T;
    timestamp: number;
    expiry?: number; // in milliseconds
}

class CacheService {
    private prefix = 'voxel_cache_';

    /**
     * Set a value in the cache
     * @param key The key to store the value under
     * @param value The value to store
     * @param expiry Optional expiry time in milliseconds
     */
    set<T>(key: string, value: T, expiry?: number): void {
        const item: CacheItem<T> = {
            value,
            timestamp: Date.now(),
            expiry
        };
        localStorage.setItem(this.prefix + key, JSON.stringify(item));
    }

    /**
     * Get a value from the cache
     * @param key The key to retrieve
     * @returns The value or null if not found or expired
     */
    get<T>(key: string): T | null {
        const raw = localStorage.getItem(this.prefix + key);
        if (!raw) return null;

        try {
            const item: CacheItem<T> = JSON.parse(raw);

            // Check for expiration
            if (item.expiry && Date.now() - item.timestamp > item.expiry) {
                this.remove(key);
                return null;
            }

            return item.value;
        } catch (e) {
            console.error('Cache parse error:', e);
            return null;
        }
    }

    /**
     * Remove an item from the cache
     * @param key The key to remove
     */
    remove(key: string): void {
        localStorage.removeItem(this.prefix + key);
    }

    /**
     * Clear all cache items managed by this service
     */
    clearAll(): void {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}

export const cacheService = new CacheService();
