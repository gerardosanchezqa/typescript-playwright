import { APIRequestContext, APIResponse } from "@playwright/test";
import { CreateUserPayload, CreateUserResponse, UserData, UserListResponse } from "../types/user"

export class UserService {
    constructor(private request: APIRequestContext) {}

    async createUser(payload: CreateUserPayload): Promise<{ status: number, createdUser: CreateUserResponse }> {
        const response = await this.request.post(`/api/users`, {
            data: payload,
        });
        return {
            status: response.status(),
            createdUser: await response.json(),
        };
    }

    async getAllUsers(): Promise<{ status: number, userList: UserListResponse }> {
        const response = await this.request.get(`/api/users`);
        return {
            status: response.status(),
            userList: await response.json(),
        };
    }

    async getUserById(userId: string): Promise<{ status: number, user: UserData }> {
        const response = await this.request.get(`/api/users/${userId}`);
        return {
            status: response.status(),
            user: await response.json(),
        };
    }

    async deleteUser(userId: string): Promise<APIResponse> {
        return await this.request.delete(`/api/users/${userId}`);
    }
}