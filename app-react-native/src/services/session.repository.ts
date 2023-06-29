import AsyncStorage from "@react-native-async-storage/async-storage";

class SessionRepository {

    private readonly key = 'LOGGED_USER';

    public async setLoggedUser(user: any) {
        await AsyncStorage.setItem(this.key, JSON.stringify(user));
    }

    public async getLoggedUser() {
        const userJson = await AsyncStorage.getItem(this.key);
        if (userJson) return JSON.parse(userJson);
        else return null;
    }

    public async removeLoggedUser() {
        await AsyncStorage.removeItem(this.key);
    }

}

export const session = new SessionRepository();