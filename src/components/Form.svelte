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
    <input placeholder="Name" type="text" bind:value={friend.name} />
    <input
        placeholder="Last time contacted"
        type="date"
        on:change={e => (friend.lastContacted = dateFromString(e.target.value))}
        value={dateToInput(friend.lastContacted)} />
    <textarea bind:value={friend.notes} placeholder="Notes" />
    <input
        placeholder="Birthday"
        type="date"
        on:change={e => (friend.birthday = dateFromString(e.target.value))}
        value={dateToInput(friend.birthday)} />
    <input placeholder="Frequency" type="number" bind:value={friend.frequency} />
    <div class="row">
        <button on:click={onSubmit}>Add</button>
        {#if onCancel}
            <button on:click={onCancel}>Cancel</button>
        {/if}
    </div>

</div>
