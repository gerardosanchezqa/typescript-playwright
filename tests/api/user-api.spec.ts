import { test, expect } from "../../src/fixtures/apiFixtures"

test.describe('ReqRes Users API Suite', () => {
    test('Post api/users - Create user', async ({ userService }) => {
        const payload = { name: 'Gerardo', job: 'SDET' };
        const { status, createdUser } = await userService.createUser(payload);

        expect(status).toBe(201);
        expect(createdUser.name).toBe(payload.name);
        expect(createdUser.job).toBe(payload.job);
        expect(createdUser.id).toBeDefined();
        expect(createdUser.createdAt).toBeDefined();
    })

    test('Get all users', async ({ userService}) => {
        const { status, userList } = await userService.getAllUsers();

        expect(status).toBe(200);
        const michael = userList.data.find((user) => user.first_name === 'Janet');
        expect(michael).toBeTruthy();
    })
})