import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const numWinnigOptions: number[] = []

  const lines = input.split("\n");
  const times = lines[0].substring(lines[0].indexOf(":") + 1).trim().split(/ +/).map(time => parseInt(time))
  const distances = lines[1].substring(lines[1].indexOf(":") + 1).trim().split(/ +/).map(distance => parseInt(distance))

  for(let i = 0; i < times.length; i++){
    const recordTime = times[i];
    const recordDistance = distances[i]
    const optionDistances = []

    for(let j = 0; j <= recordTime; j++){
      const remainingTime = recordTime - j;

      const dist = remainingTime * j
      if(dist > recordDistance){
        optionDistances.push(dist)
      }

    }

    numWinnigOptions.push(optionDistances.length)

  }

  return numWinnigOptions.reduce((acc, current) => {return acc * current}, 1);
};

const part2 = (rawInput: string) => {
 const input = parseInput(rawInput);

  const lines = input.split("\n");
  const recordTime = parseInt(lines[0].substring(lines[0].indexOf(":") + 1).trim().split(/ +/).join(""))
  const recordDistance = parseInt(lines[1].substring(lines[1].indexOf(":") + 1).trim().split(/ +/).join(""))

    const optionDistances = []

    for(let j = 0; j <= recordTime; j++){
      const remainingTime = recordTime - j;

      const dist = remainingTime * j
      if(dist > recordDistance){
        optionDistances.push(dist)
      }

    }

  return optionDistances.length;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
