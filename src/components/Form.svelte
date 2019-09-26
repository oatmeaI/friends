<script>
    import { actions as goalActions } from '../stores/goals.ts';

    let nameInput, startDateInput;

    const onSubmit = e => {
        if (e.keyCode && e.keyCode !== 13) {
            return;
        }
        goalActions.createGoal({
            name: nameInput.value,
            startDate: startDateInput.value,
        });
        nameInput.value = '';
        startDateInput.value = '';
    };
</script>

<style>
    .container {
        width: 35%;
        margin: auto;
    }
    input[type='text'] {
        width: 100%;
    }
    .row {
        display: grid;
        grid-template-columns: 3fr 1fr;
    }
    .checkbox {
        padding-top: 5px;
    }
</style>

<div class="container">
    <input id="name" placeholder="Goal" type="text" bind:this={nameInput} on:keydown={onSubmit} />
    <div class="row">
        <span class="checkbox">
            <input id="startDate" type="date" bind:this={startDateInput} on:keydown={onSubmit} />
        </span>
        <button on:click={onSubmit}>Add</button>
    </div>

</div>
