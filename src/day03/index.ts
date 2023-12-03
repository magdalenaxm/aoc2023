import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const printBoard = (board: string[][]) => {
  for (let x = 0; x < board.length; x++) {
    const row = board[x];
    let output = ""
    for (let y = 0; y < row.length; y++) {
      output += board[x][y]
    }

    console.log(`${output}\n`)
  }
}

const parseBoard = (input: string) => {
  const lines = input.split("\n");
  const board: string[][] = new Array(lines.length).fill(0).map(() => new Array(lines[0].length).fill(0));

  lines.forEach((line, row) => {
    line.split("").forEach((char, column) => {
      board[row][column] = char
    })
  })

  return board

}


const getNumbers = (board: string[][]) => {
  const allNumbers: { value: number, boardIndizes: { x: number, y: number }[] }[] = []
  for (let x = 0; x < board.length; x++) {
    let num = "";
    let indizes = []
    const row = board[x]

    for (let y = 0; y < row.length; y++) {
      if (!Number.isNaN(parseInt(row[y]))) {
        num += row[y]
        indizes.push({ x, y })
      } else if (num !== "") {
        allNumbers.push({ value: parseInt(num), boardIndizes: indizes })
        num = ""
        indizes = []
      }
    }

    if (num !== "") {
      allNumbers.push({ value: parseInt(num), boardIndizes: indizes })
    }

  }

  return allNumbers;
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const validNumbers: number[] = []
  const board = parseBoard(input)
  const allNumbers: { value: number, boardIndizes: { x: number, y: number }[] }[] = getNumbers(board)

  allNumbers.forEach(item => {
    let foundChar = 0

    item.boardIndizes.forEach(indizesPair => {
      const isTopEnd = indizesPair.x === 0
      const isBottomEnd = indizesPair.x === board.length - 1
      const isLeftEnd = indizesPair.y === 0;
      const isRightEnd = indizesPair.y === board[1].length - 1

      const top = !isTopEnd ? board[indizesPair.x - 1][indizesPair.y] : ".";
      const topLeft = !isTopEnd && !isLeftEnd ? board[indizesPair.x - 1][indizesPair.y - 1] : "."
      const topRight = !isTopEnd && !isRightEnd ? board[indizesPair.x - 1][indizesPair.y + 1] : "."
      const bottom = !isBottomEnd ? board[indizesPair.x + 1][indizesPair.y] : ".";
      const bottomLeft = !isBottomEnd && !isLeftEnd ? board[indizesPair.x + 1][indizesPair.y - 1] : "."
      const bottomRight = !isBottomEnd && !isRightEnd ? board[indizesPair.x + 1][indizesPair.y + 1] : "."
      const left = !isLeftEnd ? board[indizesPair.x][indizesPair.y - 1] : ".";
      const right = !isRightEnd ? board[indizesPair.x][indizesPair.y + 1] : ".";

      const sorroundings = [top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, right];

      const specialChar = sorroundings.filter(item => item !== "." && Number.isNaN(parseInt(item)))

      if (specialChar.length > 0) {
        foundChar = foundChar + 1
      }

    })
    if (foundChar > 0) {
      validNumbers.push(item.value)
    }
  })

  return validNumbers.reduce((acc, current) => {
    return acc + current;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const board = parseBoard(input)
  const validGears: number[] = []
  const allNumbers: { value: number, boardIndizes: { x: number, y: number }[] }[] = getNumbers(board)
  const stars: { value: number, x: number, y: number }[] = []

  allNumbers.forEach(item => {
    let foundChar = 0
    let starCoordinates: { [key: string]: number} = {}

    item.boardIndizes.forEach(indizesPair => {
      const isTopEnd = indizesPair.x === 0
      const isBottomEnd = indizesPair.x === board.length - 1
      const isLeftEnd = indizesPair.y === 0;
      const isRightEnd = indizesPair.y === board[1].length - 1

      const top = !isTopEnd ? board[indizesPair.x - 1][indizesPair.y] : ".";
      const topLeft = !isTopEnd && !isLeftEnd ? board[indizesPair.x - 1][indizesPair.y - 1] : "."
      const topRight = !isTopEnd && !isRightEnd ? board[indizesPair.x - 1][indizesPair.y + 1] : "."
      const bottom = !isBottomEnd ? board[indizesPair.x + 1][indizesPair.y] : ".";
      const bottomLeft = !isBottomEnd && !isLeftEnd ? board[indizesPair.x + 1][indizesPair.y - 1] : "."
      const bottomRight = !isBottomEnd && !isRightEnd ? board[indizesPair.x + 1][indizesPair.y + 1] : "."
      const left = !isLeftEnd ? board[indizesPair.x][indizesPair.y - 1] : ".";
      const right = !isRightEnd ? board[indizesPair.x][indizesPair.y + 1] : ".";

      if (top === "*") {
        starCoordinates = ({  x: indizesPair.x - 1, y: indizesPair.y })
      } else if (topLeft === "*") {
        starCoordinates = ({  x: indizesPair.x - 1, y: indizesPair.y - 1 })
      } else if (topRight === "*") {
        starCoordinates = ({  x: indizesPair.x - 1, y: indizesPair.y + 1 })
      } else if (bottom === "*") {
        starCoordinates = ({  x: indizesPair.x + 1, y: indizesPair.y })
      } else if (bottomLeft === "*") {
        starCoordinates = ({  x: indizesPair.x + 1, y: indizesPair.y - 1 })
      } else if (bottomRight === "*") {
        starCoordinates = ({  x: indizesPair.x + 1, y: indizesPair.y + 1 })
      } else if (left === "*") {
        starCoordinates = ({  x: indizesPair.x, y: indizesPair.y - 1 })
      } else if (right === "*") {
        starCoordinates = ({  x: indizesPair.x, y: indizesPair.y + 1 })
      }

    })

    if (starCoordinates.x && starCoordinates.y) 
    { stars.push({ value: item.value, x: starCoordinates.x, y: starCoordinates.y + 1 }) }
  })

  stars.forEach(numberWithStar => {
    const secondPart = stars.find(item => item?.x === numberWithStar?.x && item?.y === numberWithStar?.y && item?.value !== numberWithStar?.value)

    if (secondPart && numberWithStar) {
      validGears.push(secondPart.value * numberWithStar?.value)
    }
  })


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
        expected: 46,
      },
    ],
    solution: part1,
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
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
