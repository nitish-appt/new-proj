import _ from 'lodash-es';
import * as TypeGraphQL from 'type-graphql';
import * as TypeDI from 'typedi';
import * as TypeORM from 'typeorm';
import constants from '../constants.js';
import { AppDataSource } from '../db/index.js';
import * as Entities from '../entities/index.js';
import * as Filters from '../filter-inputs/index.js';
import { BaseFilterOutput } from '../filter-inputs/index.js';
import * as Inputs from '../inputs/index.js';
import { formatText, getSortCriteria, logger, messages, createToken,  } from '../utils/index.js';
import bcrypt from "bcrypt";
import { LoginOutput, Maybe } from "../types.js";

@TypeGraphQL.InputType()
export class UserCriteriaInput extends Filters.BaseCriteriaInput(
  Filters.UserFilterInput
) {}

@TypeGraphQL.ObjectType()
export class UserFilterOutput extends BaseFilterOutput(
  Entities.User
) {}

@TypeGraphQL.Resolver()
@TypeDI.Service()
class UserResolver {
    private readonly userRepository: TypeORM.Repository<Entities.User>;
    constructor() {
        this.userRepository = AppDataSource.getRepository(Entities.User);
    }

    @TypeGraphQL.Authorized()
    @TypeGraphQL.Query(()=>[Entities.User])
    async users() {
        try {
            const users: Entities.User[] | [] = await this.userRepository.find();
            return users;
          } catch (error) {
            logger.error(error);
            throw error;
          }
    }

    @TypeGraphQL.Authorized()
    @TypeGraphQL.Query(()=>Entities.User)
    async userById(@TypeGraphQL.Arg('id') id: string): Promise<Entities.User | string> {
        try {
            const user: Maybe<Entities.User> = await this.userRepository.findOne({
              where: {
                id
              } as TypeORM.FindOptionsWhere<Entities.User>,
            });
            if (user) {
                return user;
            }
            throw new Error(messages.INVALID_ID);
          } catch (error) {
            logger.error(error);
            throw error;
          }
    }

  @TypeGraphQL.Authorized()
  @TypeGraphQL.Query(() => Entities.User)
  async filterUser(
    @TypeGraphQL.Arg('filter') filter: Filters.UserFilterInput
  ): Promise<Entities.User | string> {
    try {
      let filterToBeUpdated = {};
      if (filter) {
        filterToBeUpdated = { ...filter };
        
      }
      const user: Maybe<Entities.User> =
        await this.userRepository.findOne({
          where: filterToBeUpdated as TypeORM.FindOptionsWhere<Entities.User>,
        });
      if (!user) {
        throw new Error(messages.INVALID_FILTER_INPUT);
      }
      return user;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  @TypeGraphQL.Authorized()
  @TypeGraphQL.Query(() => UserFilterOutput)
  async filterUsersBy(
    @TypeGraphQL.Arg('criteria') criteria: UserCriteriaInput
  ): Promise<UserFilterOutput | string> {
    try {
      const { paginate, filter, sort }: any = criteria;
      let filterToBeUpdated = {};
      if (filter) {
        filterToBeUpdated = { ...filter };
        
      }
      const [users, count] = await this.userRepository.findAndCount({
        where: filterToBeUpdated as TypeORM.FindOptionsWhere<Entities.User>,
        skip: paginate?.offset,
        take: paginate?.take,
        order: getSortCriteria<Entities.User>(
          sort,
          Entities.User
        ) as TypeORM.FindOptionsOrder<Entities.User>,
      });

      if (
        !_.isUndefined(paginate?.offset) &&
        !_.inRange(count, 0, 1) &&
        !_.inRange(paginate?.offset, 0, count)
      ) {
        throw new TypeGraphQL.ArgumentValidationError([
          {
            property: 'offset',
            constraints: {
              invalidInput: formatText(messages.INVALID_OFFSET_INPUT, count),
            },
          },
        ]);
      }

      return {
        items: users as Entities.User[],
        pagination: {
          take: paginate?.take || constants.LIMIT,
          offset: paginate?.offset,
          totalCount: count as number,
        },
      } as UserFilterOutput;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

    @TypeGraphQL.Authorized()
    @TypeGraphQL.Mutation(() => Entities.User)
    async createUser(@TypeGraphQL.Arg('data') data: Inputs.UserInput): Promise<Entities.User | string> {
        try {
              const userToCreate = this.userRepository.create(
                data as Entities.User
              );
              const user: Maybe<Entities.User> = await this.userRepository.save(
                userToCreate
              );
              if (user) {
                return user;
              }
              throw new Error(messages.DEFAULT_ERR_MSG);
          } catch (error) {
            logger.error(error);
            throw error;
          }
    }

    @TypeGraphQL.Authorized()
    @TypeGraphQL.Mutation(() => Entities.User)
    async updateUser(
        @TypeGraphQL.Arg('id') id: string,
        @TypeGraphQL.Arg('data') data:  Inputs.UserInput,
    ): Promise<Entities.User | string> {
        try {
            const selectedUser = await this.userRepository.findOne({
              where: {
                id
              } as TypeORM.FindOptionsWhere<Entities.User>,
            });
            if (!selectedUser) {
              throw new Error(messages.INVALID_ID);
            }
            const updatedUser: Maybe<Entities.User> = await this.userRepository.save(
                Object.assign(selectedUser, data)
            );
            if (updatedUser) {
              return updatedUser;
            }
            throw new Error(messages.DEFAULT_ERR_MSG);
          } catch (error) {
            logger.error(error);
            throw error;
          }
    }

    @TypeGraphQL.Authorized()
    @TypeGraphQL.Mutation(() => String)
    async deleteUser(@TypeGraphQL.Arg('id') id: string): Promise<string> {
        try {
            const userToDelete: Maybe<Entities.User> =
              await this.userRepository.findOne({
                where: { id } as TypeORM.FindOptionsWhere<Entities.User>,
              });
            if (userToDelete) {
              await this.userRepository.remove(userToDelete);
              return id;
            }
            throw new Error(messages.DEL_FAIL_MSG);
          } catch (error) {
            logger.error(error);
            throw error;
          }
    }

    @TypeGraphQL.Mutation(() => Entities.User)
      async register(
        @TypeGraphQL.Arg("data") data: Inputs.UserInput
      ): Promise<Entities.User | string> {
        try {
          data.password = await bcrypt.hash(data.password, 10);

          const userToCreate: Entities.User = this.userRepository.create(data);
    
          const user: Maybe<Entities.User> = await this.userRepository.save(
            userToCreate
          );
    
          if (user) {
            return user;
          }
          throw new Error(messages.REG_FAIL_MSG);
        } catch (error) {
          logger.error(error);
          throw error;
        }
      }
      
      @TypeGraphQL.Mutation(() => LoginOutput, { nullable: true })
      async login(
        @TypeGraphQL.Arg("data") data: Inputs.LoginInput
      ): Promise<Maybe<LoginOutput>> {
        try {
          const user: Maybe<Entities.User> = await this.userRepository.findOne({
            where: {
              email: data.email,
            } as TypeORM.FindOptionsWhere<Entities.User>,
          });
          if (user) {
            const validPassword: boolean = await bcrypt.compare(
              data.password,
              user.password
            );
    
            if (!validPassword) {
              throw new Error(messages.INVALID_PASSWORD_MSG);
            }
    
            const accessToken: Maybe<string> = createToken(user.email);
    
            if (user && accessToken) {
              return {
                accessToken: accessToken,
              } as LoginOutput;
            }
          }
          return;
        } catch (error) {
          logger.error(error);
          throw error;
        }
      }

}
export { UserResolver };