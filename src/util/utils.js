export const omit = (obj, key) => {
    delete obj[key];
    return obj;
};



export const generateId = () => btoa(`${Math.random()}`).substring(0, 12);
