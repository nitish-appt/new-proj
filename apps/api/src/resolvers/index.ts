
import { UserResolver } from "./user-resolver.js"; 


type NonEmptyArray<T> = [T, ...T[]];
const resolvers: NonEmptyArray<any> = [

    UserResolver, 
];

export { resolvers };