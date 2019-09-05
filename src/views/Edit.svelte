<script>
    import { actions as appActions } from '../stores/app.ts';
    import { actions as goalActions } from '../stores/goals.ts';
    export let selectedGoal;
    let editNameInput;

    const onSubmit = () => {
        goalActions.updateGoal(selectedGoal, editNameInput.value);
        appActions.seeMain();
    };
</script>

<input type="text" bind:this={editNameInput} value={selectedGoal.name} />
<button on:click={onSubmit}>Save</button>
