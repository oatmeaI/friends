import { week, today } from "./dates";
import { writable } from "svelte/store";

export interface Goal {
  steadyDate?: Date;
  steadyOverride: boolean;
  name: string;
  resets: number;
  lastReset?: Date;
  bestStreak: number;
  id: string;
}

export let goals: any = writable([]);

const createGoal = ({ steady, name }: { steady: boolean; name: string }) => {
  const newGoal = {
    steadyDate: week,
    steadyOverride: steady || false,
    name,
    resets: 0,
    lastReset: null,
    bestStreak: 0,
    id: generateId()
  };
  goals.update(oldGoals => [...oldGoals, newGoal]);
};

const updateGoal = (goal: Goal, name: string) => {
  const index = goals.findIndex(currentGoal => currentGoal.id === goal.id);
  goals[index] = {
    ...goals[index],
    name
  };
};

const deleteGoal = (goal: Goal) => {
  goals = goals.filter(currentGoal => currentGoal !== goal);
};

const goSteady = (goal: Goal) => {
  const index = goals.indexOf(goal);
  goals[index] = {
    ...goals[index],
    steadyOverride: true
  };
};

const goActive = (goal: Goal) => {
  const index = goals.indexOf(goal);
  goals[index] = {
    ...goals[index],
    steadyOverride: false,
    steadyDate: week
  };
};

const resetGoal = (goal: Goal) => {
  const index = goals.findIndex(currentGoal => currentGoal.id === goal.id);
  goals[index] = {
    ...goals[index],
    resets: goals[index].resets + 1,
    steadyOverride: false,
    steadyDate: week,
    lastReset: today
  };
};

const generateId = () => btoa(`${Math.random()}`).substring(0, 12);

export const actions = {
  createGoal,
  updateGoal,
  deleteGoal,
  resetGoal,
  goSteady,
  goActive
};
