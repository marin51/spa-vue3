import { CarId } from '@/domain/car/types';

export type ServiceActionProperties = {
    id: number;
    carId: CarId;
    repair: string;
    updatedAt: DateTime;
};

export type ServiceActionToSave = Omit<ServiceActionProperties, 'id'>;

export type DateTime = {
    nanoseconds: number;
    seconds: number;
};
