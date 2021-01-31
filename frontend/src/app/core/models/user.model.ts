export class UserEntity {
    public id: number;
    public username: string;
    public password: string;

    constructor(id?: number, username?: string, password?: string) {
            this.id = id;
            this.username = password;
    }
} 