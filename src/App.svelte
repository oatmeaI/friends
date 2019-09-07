<script>
    // TODO - data persistence - some sort of cloud nosql??
    // TODO - max active goals
    // TODO - readme
    // TODO - onboarding
    // TODO - could be cool to have 'undo' by storing snapshots of state everytime an action happens - would be easy with subscriptions
    // TODO - keyboard shortcuts for everythaaaaaang

    import Main from './views/Main.svelte';
    import Edit from './views/Edit.svelte';
    import Detail from './views/Detail.svelte';
    import { state as appStore } from './stores/app.ts';
    import { goals as goalsStore } from './stores/goals.ts';

    let appState, selectedGoal, goalState;
    appStore.subscribe(state => (appState = state));
    goalsStore.subscribe(goals => (goalState = goals));

    $: {
        selectedGoal = appState.selectedGoal ? goalState[appState.selectedGoal] : null;
    }
</script>

<style>
    main {
        width: 900px;
        margin-left: auto;
        margin-right: auto;
        background: #eeeeee;
        min-height: 98%;
        padding: 10px 15px;
    }

    :global(body) {
        font-family: Monaco;
        font-size: 14px;
    }

    h1 {
        margin: auto;
        text-align: center;
        margin-bottom: 15px;
    }
</style>

<main>
    <h1>Goalie</h1>
    {#if appState.view === 'all'}
        <Main {selectedGoal} />
    {:else if appState.view === 'edit'}
        <Edit {selectedGoal} />
    {:else if appState.view === 'detail'}
        <Detail {selectedGoal} />
    {/if}
</main>
