import { Role } from "../dto/role";
import { session } from "./session.repository";

class RoleService {

    private readonly url = 'http://192.168.15.41:3000/roles';

    private async getHeaders() {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Login Inválido!');

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        };
    }

    public async getRolesList() {
        const response = await fetch(this.url, {
            method: 'GET',
            headers: await this.getHeaders()
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        if (response.status === 200) {
            return await response.json();
        } else {
            const error = await response.json();
            return error.message; 
        }
    }

    public async getRole(id: number): Promise<Role | null> {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'GET', headers: await this.getHeaders()
        });
        
        if (response.status === 200) return response.json();

        throw new Error(await response.json());
    }


    public async createRole(name: string, description: string) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: await this.getHeaders(),
            body: JSON.stringify({ name, description })
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        return await response.json();
    }

    public async updateRole(id: number, name: string, description: string) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify({ name, description })
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        return await response.json();
    }

    public async remove(id: number) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: await this.getHeaders()
        });

        if (response.status === 401) {
            throw new Error('Login Inválido!');
        }

        return await response.json();
    }

}

export const roleService = new RoleService();