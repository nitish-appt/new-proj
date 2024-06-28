import axios from "axios";
import { messages } from "../messages";
import { User } from "../models/user-model";

export async function fetchAllUsers(criteria: any): Promise<any> {
  const query = ``;
  const variables = {
    criteria,
  };

  const response = await axios.post("baseUrl", { query, variables });

  if (response && response.data && response.status === 200) {
    if (response.data.errors) {
      throw new Error(response.data.errors[0].validations);
    }

    const users: [] = response?.data?.data || [];

    return {
      users,
    };
  }
  throw new Error(messages.FETCH_USERS_API_ERR);
}

export async function registerUser(criteria: any): Promise<any> {
  const query = ``;
  const variables = {
    criteria,
  };

  const response = await axios.post("baseUrl", { query, variables });

  if (response && response.data && response.status === 200) {
    if (response.data.errors) {
      throw new Error(response.data.errors[0].validations);
    }

    const user: User = response?.data?.data || [];

    return {
      user,
    };
  }
  throw new Error(messages.FETCH_USERS_API_ERR);
}
