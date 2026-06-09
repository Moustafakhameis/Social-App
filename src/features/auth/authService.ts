import axios from "axios";
import type { LoginDto, RegisterDto, AuthResponse, ProfileData, ChangePasswordDto } from "./authTypes";

const dummyClient = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const authService = {
  login: async (data: LoginDto): Promise<AuthResponse> => {
    // Since we transitioned to DummyJSON and its /auth/login requires specific seeded credentials,
    // we simulate a successful login here and fetch user #1 to act as our logged-in profile.
    const response = await dummyClient.get('/users/1');
    const user = response.data;
    
    return {
      message: "success",
      token: "simulated-dummy-jwt-token",
      user: {
        _id: user.id.toString(),
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        dateOfBirth: user.birthDate,
        gender: user.gender,
        photo: user.image,
        createdAt: new Date().toISOString()
      }
    };
  },

  register: async (data: RegisterDto): Promise<AuthResponse> => {
    // Call the requested DummyJSON /users/add endpoint (simulated)
    const response = await dummyClient.post('/users/add', {
      firstName: data.name.split(' ')[0] || data.name,
      lastName: data.name.split(' ').slice(1).join(' ') || '',
      email: data.email,
      password: data.password,
      birthDate: data.dateOfBirth,
      gender: data.gender
    });
    
    const newUser = response.data;

    return {
      message: "success",
      token: "simulated-dummy-jwt-token",
      user: {
        _id: newUser.id.toString(),
        name: `${newUser.firstName} ${newUser.lastName}`.trim(),
        email: newUser.email,
        dateOfBirth: newUser.birthDate,
        gender: newUser.gender,
        photo: newUser.image,
        createdAt: new Date().toISOString()
      }
    };
  },

  getProfile: async (): Promise<ProfileData> => {
    // Return dummy user #1 as our profile
    const response = await dummyClient.get('/users/1');
    const user = response.data;
    
    return {
      _id: user.id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      dateOfBirth: user.birthDate,
      gender: user.gender,
      photo: user.image,
      createdAt: new Date().toISOString()
    };
  },

  changePassword: async (data: ChangePasswordDto): Promise<AuthResponse> => {
    // Simulated success
    return { message: "success", token: "simulated-dummy-jwt-token" };
  },

  uploadPhoto: async (formData: FormData): Promise<AuthResponse> => {
    // Simulated success
    return { message: "success", token: "simulated-dummy-jwt-token" };
  },
};
