module.exports = function sortByTimeDescending(array) {
    const sortedArray = array.slice().sort((a, b) => {
        const timeA = new Date(a.data).getTime();
        const timeB = new Date(b.data).getTime();
        return timeB - timeA;
    });

    return sortedArray;
};

