import { writable } from 'svelte/store';
import { today, makeMidnight } from '../util/dates';
import { omit, generateId } from '../util/utils';
import { retrieve, persist } from '../storage';

export interface Goal {
    startDate?: Date;
    name: string;
    id: string;
}

const createGoal = ({ startDate, name }: { startDate?: string; name: string }) => {
    const id = generateId();
    const newGoal = {
        startDate: startDate ? makeMidnight(new Date(startDate)) : today,
        name,
        id,
    };
    goals.update(oldGoals => ({ ...oldGoals, [id]: newGoal }));
};

const updateGoal = (goal: Goal, name: string, startDate: Date) =>
    goals.update(oldGoals => ({
        ...oldGoals,
        [goal.id]: { ...goal, name, startDate: makeMidnight(new Date(startDate)) },
    }));

const deleteGoal = (goal: Goal) => goals.update(oldGoals => omit(oldGoals, goal.id));

const resetGoal = goal => goals.update(oldGoals => ({ ...oldGoals, [goal.id]: { ...goal, startDate: today } }));

async function getstuff() {
    // what is security lol
    // Move this to a config
    // store object id

    const response = await fetch('https://goalie-3a6a.restdb.io/rest/goals', {
        headers: {
            'x-apikey': '5d8d9ae30e26877dd0577bd8',
            'content-type': 'application/json',
            'cache-control': 'no-cache',
        },
    });
    const data = await response.json();
    const goals = data[0].data;
    return goals;
}

async function saveStuff(stuff) {
    const response = await fetch('https://goalie-3a6a.restdb.io/rest/goals/5d8d9c9b6ea1113b0000404e', {
        method: 'PUT',
        headers: {
            'x-apikey': '5d8d9ae30e26877dd0577bd8',
            'content-type': 'application/json',
            'cache-control': 'no-cache',
        },
        body: JSON.stringify({ data: stuff }),
    });
    console.log(await response.json());
}

export let goals: any = writable({});

async function init() {
    const fetchedgoals = await getstuff();
    goals.update(() =>
        Object.values(fetchedgoals).reduce(
            (goals, goal: Goal) => ({
                ...goals,
                [goal.id]: {
                    ...goal,
                    startDate: goal.startDate ? makeMidnight(new Date(goal.startDate)) : today,
                },
            }),
            {},
        ),
    );
    goals.subscribe(state => saveStuff(state));
}
export const actions = {
    createGoal,
    updateGoal,
    deleteGoal,
    resetGoal,
};

init();
