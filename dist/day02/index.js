import run from "aocrunner";
const parseInput = (rawInput) => rawInput;
const parseGame = (input) => {
  const games = [];
  const gameInput = input.split("\n");
  gameInput.forEach((game) => {
    var _a;
    const gameNumber = parseInt(((_a = game.substring(0, game.indexOf(":")).match(/\d+/)) == null ? void 0 : _a[0]) ?? "");
    const sets = [];
    const setLines = game.substring(game.indexOf(":")).slice(1).split(";").map((item) => item.trim());
    setLines.forEach((setLine) => {
      const setItems = setLine.split(",").map((item) => item.trim());
      let blue = 0;
      let green = 0;
      let red = 0;
      setItems.forEach((color) => {
        var _a2;
        const num = ((_a2 = color.match(/\d+/)) == null ? void 0 : _a2[0]) ? parseInt(color.match(/\d+/)[0]) : 0;
        if (color.includes("red")) {
          red = num;
        } else if (color.includes("green")) {
          green = num;
        } else if (color.includes("blue")) {
          blue = num;
        }
      });
      sets.push({
        blue,
        green,
        red
      });
    });
    games.push({
      id: gameNumber,
      sets
    });
  });
  return games;
};
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const config = {
    red: 12,
    green: 13,
    blue: 14
  };
  const games = parseGame(input);
  const possibleGames = [];
  games.forEach((game) => {
    let possiple = 0;
    game.sets.forEach((set) => {
      if (set.red <= config.red && set.green <= config.green && set.blue <= config.blue) {
        possiple += 1;
      }
    });
    if (possiple === game.sets.length) {
      possibleGames.push(game.id);
    }
  });
  return possibleGames.reduce((acc, current) => {
    return acc + current;
  }, 0);
};
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const games = parseGame(input);
  const gamePowers = [];
  games.forEach((game) => {
    let red = 0;
    let green = 0;
    let blue = 0;
    game.sets.forEach((set) => {
      if (set.red > red) {
        red = set.red;
      }
      if (set.green > green) {
        green = set.green;
      }
      if (set.blue > blue) {
        blue = set.blue;
      }
    });
    gamePowers.push(red * blue * green);
  });
  return gamePowers.reduce((acc, current) => {
    return acc + current;
  }, 0);
};
run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
});
//# sourceMappingURL=index.js.map
