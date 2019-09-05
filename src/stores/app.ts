import { writable } from 'svelte/store';

const seeMain = () => state.update(state => ({ ...state, view: 'all', selectedGoal: null }));
const seeDetails = goal => state.update(state => ({ ...state, view: 'detail', selectedGoal: goal.id }));
const seeEdit = goal => state.update(state => ({ ...state, view: 'edit', selectedGoal: goal.id }));

export let state = writable({ view: 'all', selectedGoal: null });
export let actions = {
    seeMain,
    seeDetails,
    seeEdit,
};
