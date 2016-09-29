let createRoomArr = (roomArr) => {
	let roomUserArr = [];
    roomArr.forEach((person, index) => {
        if (person.userName) {
            let personObj = {
                userName: person.userName,
                userID: person.userID
            };
            roomUserArr.push(personObj);
        } else {
            let personObj = {
                userName: `Guest User No. ${index + 1}`,
                userID: person.id
            };
            roomUserArr.push(personObj);
        }
    });
    return roomUserArr;
}

module.exports = createRoomArr;