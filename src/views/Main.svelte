<script>
    import Form from '../components/Form.svelte';
    import { today } from '../util/dates.ts';
    import { actions as goalActions, goals as goalsStore } from '../stores/goals.ts';
    import { actions as appActions, state as appStore } from '../stores/app.ts';

    export let selectedGoal;
    let appState, goalState, allGoals, activeGoals, steadyGoals, editNameInput;

    goalsStore.subscribe(goals => {
        goalState = goals;
        allGoals = Object.values(goals);
        console.log('hjere');
    });

    $: {
        activeGoals = allGoals.filter(goal => !goal.steadyOverride && new Date(goal.steadyDate) > today);
        steadyGoals = allGoals.filter(goal => goal.steadyOverride || new Date(goal.steadyDate) < today);
        console.log(allGoals, activeGoals, steadyGoals);
    }
</script>

<Form />
<h1>Active Goals</h1>
{#each activeGoals as goal, index (goal.id)}
    <h2>{goal.name}</h2>
    Steady at: {goal.steadyDate}
    <button on:click={() => goalActions.resetGoal(goal)}>Reset</button>
    <button on:click={() => appActions.seeEdit(goal)}>Revise</button>
    <button on:click={() => goalActions.deleteGoal(goal)}>Not Working</button>
    <button on:click={() => goalActions.goSteady(goal)}>Go Steady</button>
    <button on:click={() => appActions.seeDetails(goal)}>See Details</button>
{/each}

<h1>Steady Goals</h1>
{#each steadyGoals as goal, index (goal.id)}
    <h2>{goal.name}</h2>
    <button on:click={() => goalActions.resetGoal(goal)}>Reset</button>
    <button on:click={() => appActions.seeEdit(goal)}>Revise</button>
    <button on:click={() => goalActions.deleteGoal(goal)}>Not Working</button>
    <button on:click={() => goalActions.goActive(goal)}>Go Active</button>
    <button on:click={() => appActions.seeDetails(goal)}>See Details</button>
{/each}
