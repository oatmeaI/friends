import { week, today } from '../util/dates';
import { writable } from 'svelte/store';
import { omit, generateId } from '../util/utils';
import { retrieve, persist } from '../storage';

export interface Goal {
    steadyDate?: Date;
    steadyOverride: boolean;
    name: string;
    resets: number;
    lastReset?: Date;
    bestStreak: number;
    id: string;
}

const createGoal = ({ steady, name }: { steady: boolean; name: string }) => {
    const id = generateId();
    const newGoal = {
        steadyDate: week,
        steadyOverride: steady || false,
        name,
        resets: 0,
        lastReset: null,
        bestStreak: 0,
        id,
    };
    goals.update(oldGoals => ({ ...oldGoals, [id]: newGoal }));
};

const updateGoal = (goal: Goal, name: string) =>
    goals.update(oldGoals => ({ ...oldGoals, [goal.id]: { ...goal, name } }));

const deleteGoal = (goal: Goal) => goals.update(oldGoals => omit(oldGoals, goal.id));

const goSteady = (goal: Goal) =>
    goals.update(oldGoals => ({ ...oldGoals, [goal.id]: { ...goal, steadyOverride: true } }));

const goActive = (goal: Goal) =>
    goals.update(oldGoals => ({ ...oldGoals, [goal.id]: { ...goal, steadyOverride: false, steadyDate: week } }));

const resetGoal = (goal: Goal) =>
    goals.update(oldGoals => ({
        ...oldGoals,
        [goal.id]: { ...goal, resets: goal.resets + 1, steadyOverride: false, steadyDate: week, lastReset: today },
    }));

console.log();

export let goals: any = writable(
    Object.values(retrieve('goals', {})).reduce(
        (goals, goal: Goal) => ({
            ...goals,
            [goal.id]: {
                ...goal,
                steadyDate: goal.steadyDate ? new Date(goal.steadyDate) : null,
                lastReset: goal.lastReset ? new Date(goal.lastReset) : null,
            },
        }),
        {},
    ),
);
goals.subscribe(state => persist('goals', state));

export const actions = {
    createGoal,
    updateGoal,
    deleteGoal,
    resetGoal,
    goSteady,
    goActive,
};
