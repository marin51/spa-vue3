import { ServiceActionProperties } from '@/domain/serviceAction/types';

export type CarId = string;

export type CarProperties = {
    id: string;
    make: string;
    serviceActions: ServiceActionProperties[];
    updatedAt: DateTime;
};

export type DateTime = {
    nanoseconds: number;
    seconds: number;
};

export type CarToSave = Omit<CarProperties, 'id'>;
