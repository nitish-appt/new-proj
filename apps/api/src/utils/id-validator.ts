import constants from '../constants.js';
import { isNullOrEmpty } from './is-null-or-empty.js';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { messages } from './messages.js';

export function IdValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Id Validator',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate(value: any, args: ValidationArguments) {
          return (
            !isNullOrEmpty(value) && value.length === constants.ID_FIELD_LENGTH
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        defaultMessage(args: ValidationArguments) {
          return messages.INVALID_ID;
        },
      },
    });
  };
}