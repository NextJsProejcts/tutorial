import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { UsersApi } from "../../services/apis/users";
import { withEnvironment } from "../config/extensions/with-environment";
import { withRootStore } from "../config/extensions/with-root";
import { User } from "@/utils/models/models/users";

export const UsersStoreModel = types
  .model("UsersStore")
  .volatile(() =>
  ({
    users: [] as User[],
    loading: false as Boolean
  }))
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    saveUsers: (data: User[]) => {
      self.users = data;
    },
    changeLoading: (state: Boolean) => {
      self.loading = state;
    },
  }))
  .actions((self) => ({
    getUsers: async () => {
      const api = new UsersApi(self.environment.api);
      self.changeLoading(true);
      const result = await api.getUsers()
      self.changeLoading(false);

      if (result.type === "ok") {
        self.saveUsers(result.data ?? []);
      } else {
        console.log(result.type)
      }
      return result;
    },
    postUsers: async (body?:any) => {
        const api = new UsersApi(self.environment.api);
        const result = await api.postUsers(body)
  
        if (result.type === "ok") {

        } else {
          console.log(result.type)
        }
      },
    deleteUser: async (username: string) => {
        const api = new UsersApi(self.environment.api);
        const result = await api.deleteUsers(username)
  
        if (result.type === "ok") {
            
        } else {
          console.log(result.type)
        }
      },
    resetUsers:()=>{
        self.saveUsers([]);
    }
  }))

export interface UsersStore extends Instance<typeof UsersStoreModel> { }
export interface UsersSnapshotOut extends SnapshotOut<typeof UsersStoreModel> { }
export interface UsersSnapshotIn extends SnapshotIn<typeof UsersStoreModel> { }
export const createUsersDefaultModel = () => types.optional(UsersStoreModel, {})
