import run from "aocrunner";
const parseInput = (rawInput) => rawInput;
const printBoard = (board) => {
  for (let x = 0; x < board.length; x++) {
    const row = board[x];
    let output = "";
    for (let y = 0; y < row.length; y++) {
      output += board[x][y];
    }
    console.log(`${output}
`);
  }
};
const parseBoard = (input) => {
  const lines = input.split("\n");
  const board = new Array(lines.length).fill(0).map(() => new Array(lines[0].length).fill(0));
  lines.forEach((line, row) => {
    line.split("").forEach((char, column) => {
      board[row][column] = char;
    });
  });
  return board;
};
const getNumbers = (board) => {
  const allNumbers = [];
  for (let x = 0; x < board.length; x++) {
    let num = "";
    let indizes = [];
    const row = board[x];
    for (let y = 0; y < row.length; y++) {
      if (!Number.isNaN(parseInt(row[y]))) {
        num += row[y];
        indizes.push({ x, y });
      } else if (num !== "") {
        allNumbers.push({ value: parseInt(num), boardIndizes: indizes });
        num = "";
        indizes = [];
      }
    }
    if (num !== "") {
      allNumbers.push({ value: parseInt(num), boardIndizes: indizes });
    }
  }
  return allNumbers;
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const validNumbers = [];
  const board = parseBoard(input);
  const allNumbers = getNumbers(board);
  allNumbers.forEach((item) => {
    let foundChar = 0;
    item.boardIndizes.forEach((indizesPair) => {
      const isTopEnd = indizesPair.x === 0;
      const isBottomEnd = indizesPair.x === board.length - 1;
      const isLeftEnd = indizesPair.y === 0;
      const isRightEnd = indizesPair.y === board[1].length - 1;
      const top = !isTopEnd ? board[indizesPair.x - 1][indizesPair.y] : ".";
      const topLeft = !isTopEnd && !isLeftEnd ? board[indizesPair.x - 1][indizesPair.y - 1] : ".";
      const topRight = !isTopEnd && !isRightEnd ? board[indizesPair.x - 1][indizesPair.y + 1] : ".";
      const bottom = !isBottomEnd ? board[indizesPair.x + 1][indizesPair.y] : ".";
      const bottomLeft = !isBottomEnd && !isLeftEnd ? board[indizesPair.x + 1][indizesPair.y - 1] : ".";
      const bottomRight = !isBottomEnd && !isRightEnd ? board[indizesPair.x + 1][indizesPair.y + 1] : ".";
      const left = !isLeftEnd ? board[indizesPair.x][indizesPair.y - 1] : ".";
      const right = !isRightEnd ? board[indizesPair.x][indizesPair.y + 1] : ".";
      const sorroundings = [top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, right];
      const specialChar = sorroundings.filter((item2) => item2 !== "." && Number.isNaN(parseInt(item2)));
      if (specialChar.length > 0) {
        foundChar = foundChar + 1;
      }
    });
    if (foundChar > 0) {
      validNumbers.push(item.value);
    }
  });
  return validNumbers.reduce((acc, current) => {
    return acc + current;
  }, 0);
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const board = parseBoard(input);
  const validGears = [];
  const allNumbers = getNumbers(board);
  const stars = [];
  allNumbers.forEach((item) => {
    let foundChar = 0;
    let starCoordinates = {};
    item.boardIndizes.forEach((indizesPair) => {
      const isTopEnd = indizesPair.x === 0;
      const isBottomEnd = indizesPair.x === board.length - 1;
      const isLeftEnd = indizesPair.y === 0;
      const isRightEnd = indizesPair.y === board[1].length - 1;
      const top = !isTopEnd ? board[indizesPair.x - 1][indizesPair.y] : ".";
      const topLeft = !isTopEnd && !isLeftEnd ? board[indizesPair.x - 1][indizesPair.y - 1] : ".";
      const topRight = !isTopEnd && !isRightEnd ? board[indizesPair.x - 1][indizesPair.y + 1] : ".";
      const bottom = !isBottomEnd ? board[indizesPair.x + 1][indizesPair.y] : ".";
      const bottomLeft = !isBottomEnd && !isLeftEnd ? board[indizesPair.x + 1][indizesPair.y - 1] : ".";
      const bottomRight = !isBottomEnd && !isRightEnd ? board[indizesPair.x + 1][indizesPair.y + 1] : ".";
      const left = !isLeftEnd ? board[indizesPair.x][indizesPair.y - 1] : ".";
      const right = !isRightEnd ? board[indizesPair.x][indizesPair.y + 1] : ".";
      if (top === "*") {
        starCoordinates = { x: indizesPair.x - 1, y: indizesPair.y };
      } else if (topLeft === "*") {
        starCoordinates = { x: indizesPair.x - 1, y: indizesPair.y - 1 };
      } else if (topRight === "*") {
        starCoordinates = { x: indizesPair.x - 1, y: indizesPair.y + 1 };
      } else if (bottom === "*") {
        starCoordinates = { x: indizesPair.x + 1, y: indizesPair.y };
      } else if (bottomLeft === "*") {
        starCoordinates = { x: indizesPair.x + 1, y: indizesPair.y - 1 };
      } else if (bottomRight === "*") {
        starCoordinates = { x: indizesPair.x + 1, y: indizesPair.y + 1 };
      } else if (left === "*") {
        starCoordinates = { x: indizesPair.x, y: indizesPair.y - 1 };
      } else if (right === "*") {
        starCoordinates = { x: indizesPair.x, y: indizesPair.y + 1 };
      }
    });
    if (starCoordinates.x && starCoordinates.y) {
      stars.push({ value: item.value, x: starCoordinates.x, y: starCoordinates.y + 1 });
    }
  });
  stars.forEach((numberWithStar) => {
    const secondPart = stars.find((item) => (item == null ? void 0 : item.x) === (numberWithStar == null ? void 0 : numberWithStar.x) && (item == null ? void 0 : item.y) === (numberWithStar == null ? void 0 : numberWithStar.y) && (item == null ? void 0 : item.value) !== (numberWithStar == null ? void 0 : numberWithStar.value));
    if (secondPart && numberWithStar) {
      validGears.push(secondPart.value * (numberWithStar == null ? void 0 : numberWithStar.value));
    }
  });
  return [...new Set(validGears)].reduce((acc, current) => {
    return acc + current;
  }, 0);
};
run({
  part1: {
    tests: [
      {
        input: `.......+46
...*......`,
        expected: 46
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
});
//# sourceMappingURL=index.js.map
