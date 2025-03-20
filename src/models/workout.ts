

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
  name: string;

  constructor(userWorkoutId: number, dayId: number, day: Day, id: number, name: string) {
    this.userWorkoutId = userWorkoutId;
    this.dayId = dayId;
    this.day = day;
    this.id = id;
    this.name = name;

  }


}

export class Workout {
  userId: number;
  workoutId: number;
  id: number;
  workout: Workouts;

  constructor(id: number, userId: number, workoutId: number, workout: Workouts) {
    this.id = id;
    this.userId = userId;
    this.workoutId = workoutId;
    this.workout = workout;
  }
}
export class Workouts {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;

  }
}