<script>
    import { actions as goalActions } from '../stores/goals.ts';

    let nameInput, steadyInput;

    const onSubmit = e => {
        if (e.keyCode && e.keyCode !== 13) {
            return;
        }
        goalActions.createGoal({
            steady: steadyInput.checked,
            name: nameInput.value,
        });
        steadyInput.checked = false;
        nameInput.value = '';
    };
</script>

<style>
    .container {
        width: 35%;
        margin: auto;
    }
    label {
        display: inline;
        font-weight: bold;
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
            <input id="steady" type="checkbox" bind:this={steadyInput} />
            <label for="steady">Start Steady</label>
        </span>
        <button on:click={onSubmit}>Add</button>
    </div>

</div>
