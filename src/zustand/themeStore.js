import { create } from "zustand";

const useThemeStore = create((set) => {
  // get saved mode or default
  const savedMode = localStorage.getItem("mode") || "light";

  // apply theme immediately when store is created
  if (savedMode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return {
    mode: savedMode,

    toggleTheme: () =>
      set((state) => {
        const newMode = state.mode === "light" ? "dark" : "light";
        localStorage.setItem("mode", newMode);

        if (newMode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }

        return { mode: newMode };
      }),
  };
});

export default useThemeStore;
