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
    <div>
        Last Contacted:
        <input
            placeholder="Last time contacted"
            type="date"
            on:change={e => friendActions.updateFriend({ ...friend, lastContacted: dateFromString(e.target.value) })}
            value={dateToInput(friend.lastContacted)} />
    </div>
    <div>{friend.notes || ''}</div>
    <div>
        Birthday:
        {#if friend.birthday}
            {friend.birthday.toLocaleDateString()}
        {:else}
            <input
                type="date"
                on:change={e => friendActions.updateFriend({ ...friend, birthday: dateFromString(e.target.value) })} />
        {/if}
    </div>
    <div>
        <button on:click={() => appActions.seeEdit(friend)}>Edit</button>
    </div>
</li>
