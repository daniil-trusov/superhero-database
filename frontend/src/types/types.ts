export type Hero = {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
};

export type HeroCard = {
  id: number;
  nickname: string;
  preview_image: string;
};

export type HeroApiResponse = {
  heroes: HeroCard[];
  totalCount: number;
};

export type FormMode = 'edit' | 'create';
