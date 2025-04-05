export type CountryType = {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca2: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  translations: {
    por: {
      official: string;
      common: string;
    };
  };
};

export const getCountries = async (): Promise<CountryType[]> => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2,flags,translations"
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar países");
    }

    const data: CountryType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    return [];
  }
};

import { Place } from "../types/Place";

const API_URL = "http://localhost:3001/places";

export const getPlaces = async (): Promise<Place[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar lugares");
    }

    const data: Place[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar lugares:", error);
    return [];
  }
};

export const addPlace = async (place: Omit<Place, "id">): Promise<Place> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar lugar");
    }

    const data: Place = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao adicionar lugar:", error);
    throw error;
  }
};

export const updatePlace = async (
  id: string,
  place: Omit<Place, "id">
): Promise<Place> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar lugar");
    }

    const data: Place = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar lugar:", error);
    throw error;
  }
};

export const deletePlace = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir lugar");
    }
  } catch (error) {
    console.error("Erro ao excluir lugar:", error);
    throw error;
  }
};
