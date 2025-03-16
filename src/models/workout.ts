

export class Day {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class UserDay {
  userWorkoutId: number;
  dayId: number;
  day: Day;
  id: number;

  constructor(userWorkoutId: number, dayId: number, day: Day, id: number) {
    this.userWorkoutId = userWorkoutId;
    this.dayId = dayId;
    this.day = day;
    this.id = id;
  }

  static fromJSON(json: any): UserDay {
    return new UserDay(
      json.userWorkoutId,
      json.dayId,
      new Day(json.day.id, json.day.name),
      json.id
    );
  }
}

export class Workout {
  id: number;
  name: string;
  trainingDays: UserDay[];

  constructor(id: number, name: string, trainingDays: UserDay[] = []) {
    this.id = id;
    this.name = name;
    this.trainingDays = trainingDays;
  }
}
