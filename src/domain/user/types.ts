export type UserId = string;

export type UserProperties = {
    id: UserId;
    name: string;
};

export type UserToSave = Omit<UserProperties, 'id'>;
