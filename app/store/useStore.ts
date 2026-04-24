import { create } from "zustand";

interface Store {
  users: any[];
  setUsers: (users: any[]) => void;
}

export const useStore = create<Store>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));