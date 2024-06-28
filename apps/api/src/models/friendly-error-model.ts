import { unwrapResolverError } from '@apollo/server/errors';
import { ArgumentValidationError } from 'type-graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import get from 'lodash-es/get.js';
import { ValidationError } from 'class-validator';
import _ from 'lodash-es';
import {
  ErrorType,
  FormattedErrorType,
  ValidationsType,
  ErrorMap,
} from '../types';
import {messages, isNullOrEmpty} from '../utils/index.js';

function handleCommonError(error: ErrorType): FormattedErrorType {
  const validations: string = error.message;
  const message = 'Default';
  return {
    validations,
    message,
    code: Date.now(),
  };
}

function handleGraphQLError(error: GraphQLError): FormattedErrorType {
  if (error instanceof ArgumentValidationError) {
    if (_.hasIn(error, 'validationErrors')) {
      const validationErrors: ValidationError[] = error.validationErrors;
      const validations: ValidationsType[] = (validationErrors || []).map(
        (validationError: ValidationError) => ({
          propertyName: validationError?.property,
          description: validationError?.constraints,
          children: validationError?.children,
        })
      );
      const message = 'Default';
      return {
        validations,
        message,
        code: Date.now(),
      };
    }
  }
  return handleCommonError(error);
}

function getErrorType(error: unknown): string {
  if (error instanceof GraphQLError) {
    return 'GraphQLError';
  }
  return 'CommonError';
}

function formatError(errorType: string, error: unknown): FormattedErrorType {
  const errorMap: ErrorMap = {
    CommonError: handleCommonError,
    GraphQLError: handleGraphQLError,
  };

  const func = get(errorMap, errorType) || get(errorMap, 'CommonError');

  return func(error);
}

export function getFormattedError(
  formattedError: GraphQLFormattedError,
  error: unknown
): FormattedErrorType {
  if (!isNullOrEmpty(formattedError) && !isNullOrEmpty(error)) {
    const errorType: string = getErrorType(error);

    const formattedErrorResponse: FormattedErrorType = formatError(
      errorType,
      unwrapResolverError(error)
    );

    return formattedErrorResponse;
  }
  return {
    validations: messages.UNKNOWN_ERR_MSG,
    message: 'Default',
    code: Date.now(),
  };
}
