import { Inject, Injectable } from '@nestjs/common';    
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {

    constructor (
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getCache<T>(key: string, functionRequest: () => Promise<T>): Promise<T> {
        const allData = await this.cacheManager.get<T>(key);
    
        if (allData) {
            return allData;
        }
    
        // Buscar no banco caso não tenha no cache
        const data = await functionRequest();
    
        // Salvar no cache antes de retornar
        await this.cacheManager.set(key, data);
        
        return data;
    }    
}
