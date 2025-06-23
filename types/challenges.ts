export interface DailyTask {
  id: number;
  title: string;
}

export interface DailyChallenge {
  day: number;
  tasks: DailyTask[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradientColors: [string, string];
  challenges: DailyChallenge[];
}

export interface Progress {
  [categoryId: string]: {
    [day: number]: {
      [taskId: number]: boolean;
    };
  };
}