import { session } from "./session.repository";

class AuthService {

    private readonly url = 'http://192.168.15.41:3000';

    public async login(username: string, password: string) {
        const response = await fetch(`${this.url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const logged = await response.json();

        if (logged && logged.token) {
            await session.setLoggedUser(logged);
            return true;
        } else {
            return false;
        }
    }

}

export const authService = new AuthService();