import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

interface UserCredentials {
  email: string;
  password: string;
}

interface RegistrationData extends UserCredentials {
  fullName: string; 
}

interface AuthenticationResponse {
  authToken: string; 
  userId: string;
}

async function registerNewUser(details: RegistrationData): Promise<AuthenticationResponse | null> {
  try {
    const response = await axios.post(`${BASE_URL}/register`, details);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}

async function loginUserWithCredentials(credentials: UserCredentials): Promise<AuthenticationResponse | null> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

function storeUserSession(authToken: string): void {
  localStorage.setItem('userAuthToken', authToken); 
}

function retrieveUserSessionToken(): string | null {
  return localStorage.getItem('userAuthToken');
}

export { registerNewUser, loginUserWithCredentials, storeUserSession, retrieveUserSessionToken };