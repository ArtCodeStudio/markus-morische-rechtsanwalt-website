import { Singleton } from "alosaur/mod.ts";
import { Cache, IndexSignatureKey } from "local_cache/mod.ts";

@Singleton()
export class CacheService<K extends IndexSignatureKey, V> extends Cache<K, V> {
    constructor() {
        // global ttl of 30 seconds
        super(30000);
        console.debug("Create new cache service");
    }
}