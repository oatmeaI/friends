import { week, today } from '../util/dates';
import { writable } from 'svelte/store';
import { omit, generateId } from '../util/utils';

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

export let goals: any = writable(JSON.parse(localStorage.getItem('goals')));
goals.subscribe(state => localStorage.setItem('goals', JSON.stringify(state))); //replace direct localstorage calls with an interface

export const actions = {
    createGoal,
    updateGoal,
    deleteGoal,
    resetGoal,
    goSteady,
    goActive,
};
