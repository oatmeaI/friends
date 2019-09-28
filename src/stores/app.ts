import { writable } from 'svelte/store';

const seeMain = () => state.update(state => ({ ...state, view: 'all', selectedFriend: null }));
const seeDetails = friend => state.update(state => ({ ...state, view: 'detail', selectedFriend: friend.id }));
const seeEdit = friend => state.update(state => ({ ...state, view: 'edit', selectedFriend: friend.id }));

export let state = writable({ view: 'all', selectedFriend: null });
export let actions = {
    seeMain,
    seeDetails,
    seeEdit,
};
