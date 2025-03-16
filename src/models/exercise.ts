export class Exercise {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export class UserExercise {
    userDayId: number;
    exerciseId: number;
    exercise: Exercise;
    id: number;

    constructor(userDayId: number, exerciseId: number, exercise: Exercise, id: number) {
        this.userDayId = userDayId;
        this.exerciseId = exerciseId;
        this.exercise = exercise;
        this.id = id;
    }
}