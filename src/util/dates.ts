export const makeMidnight = date => new Date(date.setHours(1, 0, 0, 0));

const _now = makeMidnight(new Date());

export const today = makeMidnight(new Date());

export const plusWeeks = (date, weeks) => {
    const temp = new Date(date);
    return new Date(temp.setTime(temp.getTime() + 7 * weeks * 86400000));
};

export const week = plusWeeks(_now, 1);
export const weekAgo = plusWeeks(_now, -1);
export const twoWeeksAgo = plusWeeks(_now, -2);
export const threeWeeksAgo = plusWeeks(_now, -3);
