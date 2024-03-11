import { SignJWT } from 'jose';
import { UserI } from '@services';

export function setStorageToken(token: string, remember: boolean) {
    if (remember) {
        localStorage.setItem('token', token);
        return;
    }
    sessionStorage.setItem('token', token);
}

export function getStorageToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
}

export function clearStorageToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
}

export async function createJWTToken(user: UserI): Promise<string> {
    try {
        const secret = new TextEncoder().encode(
            process.env.SECRET_KEY || 'af3b9e4d249a7f063e21863f8053d7b614fa5b2b31fbc993c86a6fb36f7d12ab',
        );
        const alg = 'HS256';

        const jwt = await new SignJWT({ user })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(secret);

        return jwt;
    } catch (error) {
        console.error('Error creating JWT token:', error);
        throw error;
    }
}
