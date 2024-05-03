import { AxiosResponse } from "axios";
import $api from "../api";
import { User } from "../models/User";

export class UserService {
  static async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return $api.get<User[]>('/users')
  }
}