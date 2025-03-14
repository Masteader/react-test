export class Exercise {
  id: number;
  name: string;
  weight: number;
  type: number;

  constructor(id: number, name: string, weight: number, type: number) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.type = type;
  }
}
export class TrainingDays {
  id: number;
  name: string;
  workoutTrainingDays: { workoutId: number; trainingDayId: number; id: number }[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.workoutTrainingDays = data.workoutTrainingDays || [];
  }
}

export class TrainingDay {
  id: number;
  name: string;
  exercises: Exercise[];

  constructor(id: number, name: string, exercises: Exercise[] = []) {
    this.id = id;
    this.name = name;
    this.exercises = exercises;
  }
}

export class Workout {
  id: number;
  name: string;
  trainingDays: TrainingDay[];

  constructor(id: number, name: string, trainingDays: TrainingDay[] = []) {
    this.id = id;
    this.name = name;
    this.trainingDays = trainingDays;
  }
}
