<script>
    import { actions as appActions } from '../stores/app.ts';
    import { actions as friendActions } from '../stores/friends.ts';
    import { isBirthday, isLonely, dateToInput } from '../stores/friends.ts';
    import { dateFromString } from '../util/dates.ts';

    export let friend;
</script>

<li>
    <h2>
        {#if isBirthday(friend)}🎉{/if}
        {#if isLonely(friend)}😭{/if}
        {friend.name}
    </h2>
    <input
        placeholder="Last time contacted"
        type="date"
        on:change={e => friendActions.updateFriend({ ...friend, lastContacted: dateFromString(e.target.value) })}
        value={dateToInput(friend.lastContacted)} />
    {friend.notes || ''}
    <button on:click={() => appActions.seeEdit(friend)}>Edit</button>
</li>
