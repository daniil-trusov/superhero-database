import axios from 'axios';
import type { Hero, HeroApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

async function getHeroes(page = 1, limit = 5): Promise<HeroApiResponse> {
  const response = await api.get<HeroApiResponse>('/heroes', {
    params: { page, limit },
  });
  return response.data;
}

async function getHeroById(id: number): Promise<Hero> {
  const response = await api.get<Hero>(`/heroes/${id}`);
  return response.data;
}

async function createHero(data: FormData): Promise<Hero> {
  const response = await api.post<Hero>('/heroes/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

async function updateHero(id: number, data: FormData): Promise<Hero> {
  const response = await api.put<Hero>(`/heroes/${id}/edit`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

async function deleteHero(id: number): Promise<{ message: string }> {
  const response = await api.delete<{ message: string }>(`/heroes/${id}`);
  return response.data;
}

export const heroesApi = {
  getHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
};
