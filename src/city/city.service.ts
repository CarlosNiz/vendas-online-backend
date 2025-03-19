import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
    constructor (
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        const cacheKey = `state_${stateId}`; // Chave consistente
        const citiesCache = await this.cacheManager.get<CityEntity[]>(cacheKey);

        if (Array.isArray(citiesCache)) {
            return citiesCache;
        }

        // Buscar no banco caso não tenha no cache
        const cities = await this.cityRepository.find({   
            where: { stateId }
        });

        // Salvar no cache antes de retornar
        await this.cacheManager.set(cacheKey, cities);
        
        return cities;
    }
}
