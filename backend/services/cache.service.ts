import { Singleton } from "alosaur/mod.ts";
import { Cache, IndexSignatureKey } from "local_cache/mod.ts";

@Singleton()
export class CacheService<K extends IndexSignatureKey, V> extends Cache<K, V> {
    constructor() {
        let ttl = -1; // Endless ttl
        if (Deno.env.get("ENV") === 'local') {
            // ttl of 3 seconds
            ttl = 3000
        }
        super(ttl);
        console.debug("Create new cache service");
    }
}