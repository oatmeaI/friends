export const makeMidnight = date => new Date(date.setHours(0, 0, 0, 0));

export const dateFromString = string => new Date(`${string} 00:00:00`);

const _now = makeMidnight(new Date());

export const today = makeMidnight(_now);

export const plusWeeks = (date, weeks) => {
    const temp = new Date(date);
    return new Date(temp.setTime(temp.getTime() + 7 * weeks * 86400000));
};

export const week = plusWeeks(_now, 1);
export const weekAgo = plusWeeks(_now, -1);
export const twoWeeksAgo = plusWeeks(_now, -2);
export const threeWeeksAgo = plusWeeks(_now, -3);
