let findSocketIdx = (id, room) => {
    let idx = null;
    for (let i = 0; i < room.length; i++) {
        if (room[i].id === id) {
            idx = i;
        }
    }
    return(idx);
}

module.exports = findSocketIdx;
