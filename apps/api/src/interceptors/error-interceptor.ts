import { logger } from '../utils/logger.js';
import { MiddlewareFn } from 'type-graphql';

export const ErrorInterceptor: MiddlewareFn<any> = async (
    // { context: any, info: any },
    _,
    next
) => {
    try {
        return await next();
    } catch (error) {
        logger.error(error);
        throw error;
    }
};
