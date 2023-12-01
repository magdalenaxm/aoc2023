import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  const numbers = lines.map((line) => {
    const chars = line.split("");
    const nums: number[] = []

    chars.forEach(char => {
      if (!Number.isNaN(parseInt(char))) {
        nums.push(parseInt(char))
      }
    })

    const result = `${nums[0]}${nums[nums.length - 1]}`.toString()

    return parseInt(result);
  });

  return numbers.reduce((acc, current) => {
    return acc + current;
  }, 0);
};


const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  const numbers = lines.map((line) => {
    const chars = line.split("");
    const nums: number[] = []

    chars.forEach((char, index) => {
      if (!Number.isNaN(parseInt(char))) {
        nums.push(parseInt(char))
        return;
      } else {
        const substring = line.substring(index)

        if (substring.indexOf("one") === 0) {
          nums.push(1)
        }
        else if (substring.indexOf("two") === 0) {
          nums.push(2)
        }
        else if (substring.indexOf("three") === 0) {
          nums.push(3)
        }
        else if (substring.indexOf("four") === 0) {
          nums.push(4)
        }
        else if (substring.indexOf("five") === 0) {
          nums.push(5)
        }
        else if (substring.indexOf("six") === 0) {
          nums.push(6)
        }
        else if (substring.indexOf("seven") === 0) {
          nums.push(7)
        }
        else if (substring.indexOf("eight") === 0) {
          nums.push(8)
        }
        else if (substring.indexOf("nine") === 0) {
          nums.push(9)
        }
      }
    })
  
    const result = `${nums[0]}${nums[nums.length - 1]}`.toString()

    return parseInt(result);
  });

  return numbers.reduce((acc, current) => {
    return acc + current;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
