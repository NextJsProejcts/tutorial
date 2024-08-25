import { ApiResponse, create } from "apisauce"
import { responsApi } from "../../models/enum/respons.enum";
import { Api } from "../config/api";
import { ResultState, GetUsersListResult } from "../config/api.respons";
import User from "@/app/(private)/users/user/page";
import { Environment } from "@/utils/store/config/environment";
import { config } from "process";

export class UsersApi {
  private api: Api = new Api();
  constructor(api?: Api) {
    if(api){
      this.api = api;
    }else{
      this.api.setup();      
    }
  }

  async postUsers(body: any): Promise<ResultState> {
    try {
      // make the api call
      const response: ApiResponse<any> = this.api.apisauce ? await this.api.apisauce.post(
        "TestAPI",body,
      ) : <any>{}

      if(!response.ok){
        return { type: responsApi.bad }
      }else{
        return { type: responsApi.ok }
      }
    } catch (e: any) {
      console.log(e.message)
      return { type: responsApi.bad }
    }
  }

  async getUsers(): Promise<GetUsersListResult> {
    try {
      const response: ApiResponse<any> = this.api.apisauce ? await this.api.apisauce.get(
        "TestAPI",{
        }
      ) : <any>{}

      // the typical ways to die when calling an api
      if (!response.ok) {
        return {type:responsApi.bad,data:[]}
      }

      const users = response.data;
      return {
        type: "ok",
        data:users
      }
    } catch (e: any) {
      console.log(e.message)
      return { type: responsApi.bad ,data:[]}
    }

  }

  async deleteUsers(username:string): Promise<ResultState> {
    try {
      // make the api call
      const response: ApiResponse<any> = this.api.apisauce ? await this.api.apisauce.delete(
        `TestAPI/${username}`) : <any>{}

      // the typical ways to die when calling an api
      if (!response.ok) {
        return { type: responsApi.bad }
      }else{
        return { type: responsApi.ok }
      }
    } catch (e: any) {
      console.log(e.message)
      return { type: responsApi.bad }
    }
  }
}
