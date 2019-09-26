<script>
    import Form from '../components/Form.svelte';
    import { today, weekAgo, twoWeeksAgo, threeWeeksAgo, plusWeeks } from '../util/dates.ts';
    import { actions as goalActions, goals as goalsStore } from '../stores/goals.ts';
    import { actions as appActions, state as appStore } from '../stores/app.ts';

    let appState,
        goalState,
        allGoals,
        activeGoals,
        steadyGoals,
        probationGoals,
        editNameInput,
        filterOn = false,
        showProbation = true,
        showSteady = false;

    goalsStore.subscribe(goals => {
        goalState = goals;
        allGoals = goals ? Object.values(goals) : [];
    });

    $: {
        activeGoals = allGoals.filter(goal => goal.startDate >= weekAgo).slice(0, filterOn ? 3 : undefined);
        probationGoals = allGoals.filter(goal => {
            console.log({ ...goal }, { twoWeeksAgo, weekAgo }, goal.startDate >= twoWeeksAgo, goal.startDate < weekAgo);
            return goal.startDate >= threeWeeksAgo && goal.startDate < weekAgo;
        });
        steadyGoals = allGoals.filter(goal => goal.startDate <= threeWeeksAgo);
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

<Form />
<section>
    <h1>Active Goals</h1>
    <button class="sideButton" on:click={() => (filterOn = !filterOn)}>{filterOn ? 'Show All' : 'Hide Extra'}</button>
    <ul>
        {#each activeGoals as goal, index (goal.id)}
            <li>
                <h2>{goal.name}</h2>
                Probation at: {plusWeeks(goal.startDate, 1).toLocaleDateString()}
                <div class="controls">
                    <button on:click={() => goalActions.resetGoal(goal)}>Reset</button>
                    <button on:click={() => appActions.seeEdit(goal)}>Revise</button>
                    <button on:click={() => goalActions.deleteGoal(goal)}>Not Working</button>
                </div>
            </li>
        {/each}
    </ul>
</section>
<section>
    <h1>Probation Goals</h1>
    <button class="sideButton" on:click={() => (showProbation = !showProbation)}>
        {showProbation ? 'Hide' : 'Show'}
    </button>
    {#if showProbation}
        <ul>
            {#each probationGoals as goal, index (goal.id)}
                <li>
                    <h2>{goal.name}</h2>
                    Steady at: {plusWeeks(goal.startDate, 3).toLocaleDateString()}
                    <div class="controls">
                        <button on:click={() => goalActions.resetGoal(goal)}>Reset</button>
                        <button on:click={() => appActions.seeEdit(goal)}>Revise</button>
                        <button on:click={() => goalActions.deleteGoal(goal)}>Not Working</button>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</section>
<section>
    <h1>Steady Goals</h1>
    <button class="sideButton" on:click={() => (showSteady = !showSteady)}>{showSteady ? 'Hide' : 'Show'}</button>
    {#if showSteady}
        <ul>
            {#each steadyGoals as goal, index (goal.id)}
                <li>
                    <h2>{goal.name}</h2>
                    <div class="controls">
                        <button on:click={() => goalActions.resetGoal(goal)}>Reset</button>
                        <button on:click={() => appActions.seeEdit(goal)}>Revise</button>
                        <button on:click={() => goalActions.deleteGoal(goal)}>Not Working</button>
                    </div>
                </li>
            {/each}
        </ul>
    {/if}
</section>
