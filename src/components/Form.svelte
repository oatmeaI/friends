<script>
    import { dateToInput } from '../stores/friends.ts';
    import { dateFromString } from '../util/dates.ts';
    export let friend,
        onSubmit,
        onCancel = undefined;
    let inputState = friend;
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
</style>

<div class="container">
    <input placeholder="Name" type="text" bind:value={inputState.name} />
    <input
        placeholder="Last time contacted"
        type="date"
        on:change={e => (inputState.lastContacted = dateFromString(e.target.value))}
        value={dateToInput(inputState.lastContacted)} />
    <textarea bind:value={inputState.notes} placeholder="Notes" />
    <input
        placeholder="Birthday"
        type="date"
        on:change={e => (inputState.birthday = dateFromString(e.target.value))}
        value={dateToInput(inputState.birthday)} />
    <input placeholder="Frequency" type="number" bind:value={inputState.frequency} />
    <div class="row">
        <button on:click={onSubmit}>Add</button>
        {#if onCancel}
            <button on:click={onCancel}>Cancel</button>
        {/if}
    </div>

</div>
