export function prepend(value, array) {
    const newArray = array.slice();
    newArray.unshift(value);
    return newArray;
}
