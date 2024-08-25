import { User } from "@/utils/models/models/users";

export type GetUsersListResult = { type?:string; data: User[] };

export type ResultState = { type?: string };
