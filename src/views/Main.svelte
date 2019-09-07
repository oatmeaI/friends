<script>
    import Form from '../components/Form.svelte';
    import { today } from '../util/dates.ts';
    import { actions as goalActions, goals as goalsStore } from '../stores/goals.ts';
    import { actions as appActions, state as appStore } from '../stores/app.ts';

    let appState, goalState, allGoals, activeGoals, steadyGoals, editNameInput;

    goalsStore.subscribe(goals => {
        goalState = goals;
        allGoals = goals ? Object.values(goals) : [];
    });

    $: {
        activeGoals = allGoals.filter(goal => !goal.steadyOverride && new Date(goal.steadyDate) > today);
        steadyGoals = allGoals.filter(goal => goal.steadyOverride || new Date(goal.steadyDate) < today);
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
    }
</style>

<Form />
<section>
    <h1>Active Goals</h1>
    <ul>
        {#each activeGoals as goal, index (goal.id)}
            <li>
                <h2>{goal.name}</h2>
                Steady at: {goal.steadyDate.toLocaleDateString()}
                <div class="controls">
                    <button on:click={() => goalActions.resetGoal(goal)}>Reset</button>
                    <button on:click={() => appActions.seeEdit(goal)}>Revise</button>
                    <button on:click={() => goalActions.deleteGoal(goal)}>Not Working</button>
                    <button on:click={() => goalActions.goSteady(goal)}>Go Steady</button>
                    <button on:click={() => appActions.seeDetails(goal)}>See Details</button>
                </div>
            </li>
        {/each}
    </ul>
</section>
<section>
    <h1>Steady Goals</h1>
    <ul>
        {#each steadyGoals as goal, index (goal.id)}
            <li>
                <h2>{goal.name}</h2>
                <div class="controls">
                    <button on:click={() => goalActions.resetGoal(goal)}>Reset</button>
                    <button on:click={() => appActions.seeEdit(goal)}>Revise</button>
                    <button on:click={() => goalActions.deleteGoal(goal)}>Not Working</button>
                    <button on:click={() => goalActions.goActive(goal)}>Go Active</button>
                    <button on:click={() => appActions.seeDetails(goal)}>See Details</button>
                </div>
            </li>
        {/each}
    </ul>
</section>
