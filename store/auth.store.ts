import { User } from "@/interfaces";
import { getCurrentUser } from "@/lib/appwrite";
import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  fetchAuthenticatedUser: async () => {
    try {
      const user = await getCurrentUser();
      if (user) set({ isAuthenticated: true, user: user as User });
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      set({ isLoading: false });
    }
  }
}))


export default useAuthStore;