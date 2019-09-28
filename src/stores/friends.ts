import { writable } from 'svelte/store';
import { today, makeMidnight, week, weekAgo, plusWeeks, threeWeeksAgo, dateFromString } from '../util/dates';
import { omit, generateId } from '../util/utils';
import { retrieve, persist } from '../storage';

export interface Friend {
    lastContacted?: Date;
    name: string;
    id: string;
    notes?: string;
    birthday?: Date;
    frequency: number;
}

const objectMap = (ogObj, cb) => {
    const keys = Object.keys(ogObj);
    const obj = {};
    for (let key of keys) {
        obj[key] = cb(ogObj[key], key);
    }
    return obj;
};

const fixDates = entity =>
    objectMap(entity, property => (property instanceof Date ? makeMidnight(property) : property));

const parseDates = friend =>
    objectMap(friend, (value, key) =>
        ['lastContacted', 'birthday'].includes(key) ? (value ? new Date(value) : null) : value,
    );

export const isBirthday = (friend: Friend) => !(friend.birthday > today) && !(friend.birthday < today); // dates have some janky stuff with equality

const isBefore = (date1: Date, date2: Date) => date1 <= date2;

export const isLonely = (friend: Friend) => isBefore(plusWeeks(friend.lastContacted, friend.frequency), today);

export const dateToInput = date =>
    date instanceof Date && isFinite(date.valueOf()) ? date.toISOString().slice(0, 10) : date;

const isActive = (friend: Friend) => isLonely(friend) || isBirthday(friend);

const createFriend = (friend: Friend) => {
    const id = generateId();
    const newFriend = fixDates({
        ...friend,
        lastContacted: friend.lastContacted || today,
        id,
    });
    friends.update(oldFriends => ({ ...oldFriends, [id]: newFriend }));
};

const updateFriend = (updatedFriend: Friend) => {
    friends.update(oldFriends => ({
        ...oldFriends,
        [updatedFriend.id]: fixDates(updatedFriend),
    }));
};

const deleteFriend = (friend: Friend) => friends.update(oldFriends => omit(oldFriends, friend.id));

async function getstuff() {
    // what is security lol
    // Move this to a config
    // store object id

    const response = await fetch('https://goalie-3a6a.restdb.io/rest/friends', {
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
    await fetch('https://goalie-3a6a.restdb.io/rest/friends/5d8efc1388f7b16b00000b55', {
        method: 'PUT',
        headers: {
            'x-apikey': '5d8d9ae30e26877dd0577bd8',
            'content-type': 'application/json',
            'cache-control': 'no-cache',
        },
        body: JSON.stringify({ data: stuff }),
    });
}

export let friends: any = writable({});

async function init() {
    const fetchedFriends = await getstuff();
    const parsedFriends = Object.values(fetchedFriends).reduce(
        (friends, friend: Friend) => ({
            ...friends,
            [friend.id]: parseDates(friend),
        }),
        {},
    );
    console.log(parsedFriends);
    friends.update(() => parsedFriends);
    friends.subscribe(state => saveStuff(state));
}
export const actions = {
    createFriend,
    updateFriend,
    deleteFriend,
};

export const views = {
    activeFriends: friends => (friends ? Object.values(friends) : []).filter((friend: Friend) => isActive(friend)),
};

init();
