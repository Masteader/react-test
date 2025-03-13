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
