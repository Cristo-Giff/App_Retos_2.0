export interface Challenge {
  id: number;
  title: string;
  description?: string;
  day: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradientColors: [string, string];
  challenges: Challenge[];
}

export interface Progress {
  [categoryId: string]: {
    [challengeId: number]: boolean;
  };
}