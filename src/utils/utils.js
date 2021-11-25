// some functions relate to the games
export function getNumGamesLeft () {
  if (!isNumGamesLeftValid()) {
    resetNumGamesLeft();
  }

  const numGamesLeft = parseInt(localStorage.getItem('numGamesLeft'));
  return numGamesLeft;
}

export function resetNumGamesLeft () {
  localStorage.setItem('numGamesLeft', 3);
  localStorage.setItem('finishGame1', 'false');
  localStorage.setItem('finishGame2', 'false');
  localStorage.setItem('finishGame3', 'false');
};

// decrease the counter, if that game has not been finished before
export function decreaseNumGamesLeft (idx) {
  if (!isNumGamesLeftValid()) {
    resetNumGamesLeft();
  }

  // counter
  const key = `finishGame${idx}`;
  const value = localStorage.getItem(key);

  if (value === 'false') {
    localStorage.setItem(key, 'true');

    // update the counter
    const numGamesLeft = parseInt(localStorage.getItem('numGamesLeft'));
    localStorage.setItem('numGamesLeft', numGamesLeft - 1);
  }
}

// check validity of the stored value
export function isNumGamesLeftValid () {
  const storedValue = localStorage.getItem('numGamesLeft');
  let flag = true;
  
  if (storedValue === null) {
    flag = false;
  }
  else {
    // check if the value is valid
    const numberRegex = /^[1|2|3]$/;
    if (storedValue.match(numberRegex)) {
      const record = parseInt(storedValue);

      // also check the other storage are also ok.
      // if result = 3, then all finishGame[1|2|3] are false.
      // if result = 2, then one game is true.
      // if result = 1, then two games are true
      // if result = 0, then all games are true.
      const keys = [
        'finishGame1', 'finishGame2', 'finishGame3'
      ];

      const gameRecords = keys.map((key) => localStorage.getItem(key));
      let countGamesNotFinish = 0;
      let allGameRecordsValid = true;

      for (let i = 0; i < keys.length; i++) {
        if (gameRecords[i] !== 'false' && gameRecords[i] !== 'true') {
          allGameRecordsValid = false;
          break;
        }
  
        countGamesNotFinish += gameRecords[i] === 'false' ? 1 : 0;
      }

      if ((!allGameRecordsValid) || record !== countGamesNotFinish) {
        flag = false;
      }
    }
    else {
      flag = false;
    }
  }

  return flag;
}
