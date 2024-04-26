export class Token {
    private static token: string | null = null;

    static setToken(token: string | null): void {
        this.token = token; // Update the token variable
    }

    static getToken(): string | null {
        // Check if the token variable is already set, if not, retrieve it from localStorage
        if (typeof localStorage !== 'undefined') {
            if (this.token === null) {
                this.token = localStorage.getItem('token');
            }
        }
        return this.token;
    }
}