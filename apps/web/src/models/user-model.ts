import { Expose, Transform } from 'class-transformer';

export class User {
    @Expose()
    id: string;
    
    @Expose()
    firstName : string;
    
    @Expose()
    lastName : string;
    
    @Expose()
    email : string;
    
    @Expose()
    password : string;
    
    @Expose()
    @Transform((property) => {
        if (property && property.value) {
            return new Date(property.value);
        }
        return null;
    })
    updatedOn: Date;

    @Expose()
    @Transform((property) => {
        if (property && property.value) {
            return new Date(property.value);
        }
        return null;
    })
    createdOn: Date;
}
