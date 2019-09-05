<script>
    // TODO - persist data - maybe start with localstorage, build persistence layer, then consider how to move forward
    // Persist locally & allow data porting & cloud sync would be rad
    import Main from './views/Main.svelte';
    import Edit from './views/Edit.svelte';
    import Detail from './views/Detail.svelte';
    import { state as appStore } from './stores/app.ts';
    import { goals as goalsStore } from './stores/goals.ts';

    let appState, selectedGoal, goalState;
    appStore.subscribe(state => (appState = state));
    goalsStore.subscribe(goals => (goalState = goals));

    $: {
        selectedGoal = goalState[appState.selectedGoal];
    }
</script>

{#if appState.view === 'all'}
    <Main {selectedGoal} />
{:else if appState.view === 'edit'}
    <Edit {selectedGoal} />
{:else if appState.view === 'detail'}
    <Detail {selectedGoal} />
{/if}
