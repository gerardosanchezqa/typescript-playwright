import { test as base } from "@playwright/test";
import { UserService } from "../services/UserService";

const API_BASE_URL = process.env.API_BASE_URL || 'https://reqres.in';

type Services = {
    userService: UserService;
}

export const test = base.extend<Services>({
    userService: async ({ playwright }, use) => {
        const apiContext = await playwright.request.newContext({
            baseURL: API_BASE_URL,
            extraHTTPHeaders: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        const userService = new UserService(apiContext);
        await use(userService);

        await apiContext.dispose();
    }
})

export { expect } from '@playwright/test';