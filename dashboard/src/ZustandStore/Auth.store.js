import { create } from "zustand";
import { persist } from 'zustand/middleware'

const useLoginInfo = create(
  persist(
    (set) => ({
      user: null,
      addUserInfo: (userData) => set(() => ({ user: userData })),
    }),
    {
      name: "User",
    },
  ),
);

export { useLoginInfo };
