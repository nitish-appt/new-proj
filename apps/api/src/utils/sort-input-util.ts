import * as Filters from '../filter-inputs/index.js';
import { logger } from '../utils/index.js';
import { AppDataSource } from '../db/index.js';
import { EntityTarget } from 'typeorm';
import { ArgumentValidationError } from 'type-graphql';
import { Maybe } from "../types.js";

type StringDict = {
  [key: string]: string;
};

export function getSortCriteria<Entity>(
  input: Maybe<Filters.SortInput[]>,
  entity: EntityTarget<Entity>
): StringDict {
  try {
    if (input) {
      if (input.length > 0) {
        const sortCriteria: StringDict = input.reduce(
          (
            accumulator: StringDict,
            cursor: Filters.SortInput
            // index: number
          ) => {
            accumulator[cursor.property] = cursor.direction;
            return accumulator;
          },
          {}
        );
        const entityProperties: string[] = AppDataSource.getMetadata(
          entity
        ).columns.map((column) => column.propertyName);

        const sortCriteriaKeys: string[] = Object.keys(sortCriteria);

        const invalidColumns: string[] = sortCriteriaKeys.reduce(
          (result: string[], item: string) => {
            if (!entityProperties.includes(item)) result.push(item);
            return result;
          },
          []
        );

        if (invalidColumns.length === 0) {
          return sortCriteria;
        }
        throw new ArgumentValidationError(
          (invalidColumns || []).map((element) => ({
            property: element,
            constraints: {
              invalidColumn: `'${element}' is not a valid column`,
            },
          }))
        );
      }
    }
    return { createdOn: 'desc' };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
