import { create } from "zustand";

type FavoritesState = {
  favorites: string[];
  loadFavorites: () => void;
  toggleFavorite: (codigo: string) => void;
  isFavorite: (codigo: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  loadFavorites: () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("favorites");

    if (!stored) {
      set({ favorites: [] });
      return;
    }

    try {
      const parsed: unknown = JSON.parse(stored);

      if (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      ) {
        set({ favorites: parsed });
      } else {
        set({ favorites: [] });
      }
    } catch {
      set({ favorites: [] });
    }
  },

  toggleFavorite: (codigo: string) => {
    const currentFavorites = get().favorites;

    const updatedFavorites = currentFavorites.includes(codigo)
      ? currentFavorites.filter((id) => id !== codigo)
      : [...currentFavorites, codigo];

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    set({ favorites: updatedFavorites });
  },

  isFavorite: (codigo: string) => {
    return get().favorites.includes(codigo);
  },
}));