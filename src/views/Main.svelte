<script>
    import Form from '../components/Form.svelte';
    import Friend from '../components/Friend.svelte';
    import { today, weekAgo, twoWeeksAgo, threeWeeksAgo, plusWeeks } from '../util/dates.ts';
    import {
        actions as friendActions,
        friends as friendStore,
        views as friendViews,
        isBirthday,
    } from '../stores/friends.ts';
    import { actions as appActions, state as appStore } from '../stores/app.ts';

    let appState,
        friendState,
        allFriends,
        contactToday,
        steadyGoals,
        probationGoals,
        editNameInput,
        showAll = false;

    const emptyFriend = {
        name: '',
        lastContacted: null,
        notes: '',
        birthday: null,
        frequency: 1,
    };

    friendStore.subscribe(friends => (friendState = friends));

    $: {
        contactToday = friendViews.activeFriends(friendState);
        allFriends = friendState ? Object.values(friendState) : [];
    }
</script>

<style>
    .controls {
        margin-top: 5px;
    }
    h2 {
        margin-bottom: 5px;
        margin-top: 0;
    }
    ul {
        margin-top: 0;
    }
    h1,
    li {
        margin-bottom: 15px;
    }
    section {
        margin-bottom: 25px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .sideButton {
        height: 35px;
        width: 115px;
        margin-left: -240px;
        margin-top: 15px;
    }
</style>

<Form onSubmit={() => friendActions.createFriend(emptyFriend)} friend={emptyFriend} />
<section>
    <h1>Contact Today</h1>
    <div />
    <ul>
        {#each contactToday as friend, index (friend.id)}
            <Friend {friend} />
        {/each}
    </ul>
</section>

<section>
    <h1>All</h1>
    <button class="sideButton" on:click={() => (showAll = !showAll)}>{showAll ? 'Hide' : 'Show'}</button>
    {#if showAll}
        <ul>
            {#each allFriends as friend, index (friend.id)}
                <Friend {friend} />
            {/each}
        </ul>
    {/if}
</section>
