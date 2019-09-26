<script>
    import { actions as appActions } from '../stores/app.ts';
    import { actions as goalActions } from '../stores/goals.ts';
    export let selectedGoal;
    let editNameInput, editDateInput;

    const onSubmit = () => {
        goalActions.updateGoal(selectedGoal, editNameInput.value, editDateInput.value);
        appActions.seeMain();
    };
</script>

<style>
    section {
        width: 35%;
        margin: auto;
    }
    input[type='text'] {
        width: 300px;
    }
    .actions {
        width: 300px;
        text-align: right;
    }
</style>

<section>
    <h1>Edit Goal</h1>
    <input type="text" bind:this={editNameInput} value={selectedGoal.name} />
    <input type="date" bind:this={editDateInput} value={selectedGoal.startDate.toISOString().slice(0, 10)} />
    <div class="actions">
        <button on:click={appActions.seeMain}>Cancel</button>
        <button on:click={onSubmit}>Save</button>
    </div>
</section>
