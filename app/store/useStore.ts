// import { create } from "zustand";

// interface Store {
//   users: any[];
//   setUsers: (users: any[]) => void;
// }

// export const useStore = create<Store>((set) => ({
//   users: [],
//   setUsers: (users) => set({ users }),
// }));















import { create } from "zustand";
import { User, Post } from "@/types";

interface AppState {
  users: User[];
  posts: Post[];
  localPosts: Post[];
  setUsers: (users: User[]) => void;
  setPosts: (posts: Post[]) => void;
  addLocalPost: (post: Post) => void;
  clearPosts: () => void;
}

export const useStore = create<AppState>((set) => ({
  users: [],
  posts: [],
  localPosts: [],
  setUsers: (users) => set({ users }),
  setPosts: (posts) => set({ posts }),
  addLocalPost: (post) =>
    set((state) => ({ localPosts: [post, ...state.localPosts] })),
  clearPosts: () => set({ posts: [], localPosts: [] }),
}));
