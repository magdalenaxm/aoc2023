import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Range = { destinationRangeStart: number; sourceRangeStart: number; range: number }
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n\n")
  const seeds = lines[0].substring(lines[0].indexOf(":") + 1).trim().split(" ").map(seed => parseInt(seed))
  const maps: Range[][] = []


  lines.forEach(line => {
    let rows = line.split("\n");
    rows.shift()
    const ranges: Range[] = []

    rows.forEach(row => {
      const values = row.split(" ");
      ranges.push({
        destinationRangeStart: parseInt(values[0]),
        sourceRangeStart: parseInt(values[1]),
        range: parseInt(values[2])
      })
    })

    maps.push(ranges)
  })


  const locations = seeds.map(seed => {
    let sourceNumber = seed;

    for (let i = 1; i <= maps.length - 1; i++) {
      const assigendRange = maps[i].find(map => sourceNumber >= map.sourceRangeStart && sourceNumber <= (map.sourceRangeStart + map.range - 1))

      if (assigendRange) {
        sourceNumber = sourceNumber - assigendRange.sourceRangeStart + assigendRange.destinationRangeStart;
      }
    }

    return sourceNumber
  })

  return Math.min(...locations);
};

type BigRange = { destinationRangeStart: bigint; sourceRangeStart: bigint; range: bigint }


const part2 = (rawInput: string) => {
 
  const input = parseInput(rawInput);

  const lines = input.split("\n\n")
  const seedsInput = lines[0].substring(lines[0].indexOf(":") + 1).trim().split(" ").map(seed => parseInt(seed))
  const maps: BigRange[][] = []
  const locations: BigInt[] = []

  lines.forEach(line => {
    let rows = line.split("\n");
    rows.shift()
    const ranges: BigRange[] = []

    rows.forEach(row => {
      const values = row.split(" ");
      ranges.push({
        destinationRangeStart: BigInt(parseInt(values[0])),
        sourceRangeStart: BigInt(parseInt(values[1])),
        range: BigInt(parseInt(values[2]))
      })
    })

    maps.push(ranges)
  })



  for(let i = seedsInput[0]; i < seedsInput[0] + (seedsInput[1] - 1); i++){
      let sourceNumber = i as unknown as bigint;

    for (let i = 1; i <= maps.length - 1; i++) {
      
      const assigendRange = maps[i].find(map => sourceNumber >= map.sourceRangeStart && sourceNumber <= (BigInt(map.sourceRangeStart) + BigInt(map.range) - BigInt(1)))

      if (assigendRange) {
        sourceNumber = BigInt(sourceNumber) - BigInt(assigendRange.sourceRangeStart) + BigInt(assigendRange.destinationRangeStart);
      }
    }

    locations.push(sourceNumber)

  }

  // if (rawInput.includes("seeds: 79 14 55 13")) {

  //   console.log(seedsInput)
  //   console.log("seeds: ", seeds)

  // }
  


  return locations.reduce((m, e) => e < m ? e : m);
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
     input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
