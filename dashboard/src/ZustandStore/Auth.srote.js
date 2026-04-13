import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useLoginInfo = create(
  persist(
    (set) => ({
      user: 0,
      addUserInfo: (userData) => set((state) => ({ user: userData })),
    }),
    {
      name: "User",
    },
  ),
);

export { useLoginInfo };
