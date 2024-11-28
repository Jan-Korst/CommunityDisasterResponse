import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
interface UserCredentials {
  email: string;
  password: string;
}
interface RegistrationDetails extends UserCredentials {
  name: string;
}
interface AuthResponse {
  token: string;
  userId: string;
}
async function registerUser(details: RegistrationDetails): Promise<AuthResponse | null> {
  try {
    const response = await axios.post(`${BASE_URL}/register`, details);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
}
async function loginUser(credentials: UserCredentials): Promise<AuthResponse | null> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}
function saveSession(token: string): void {
  localStorage.setItem('authToken', token);
}
function getSessionToken(): string | null {
  return localStorage.getItem('authToken');
}
export { registerUser, loginUser, saveSession, getSessionToken };