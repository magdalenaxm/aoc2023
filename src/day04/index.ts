import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    const cardsInput = input.split("\n");
    const cards: { winningNumbers: number[]; myNumbers: number[] }[] = [];

    let result = 0;

    cardsInput.forEach(card => {
        const cardNumbers = card.substring(card.indexOf(":") + 1).split(" | ").map(item => item.trim())
        cards.push({
            winningNumbers: cardNumbers[0].split(/ +/).filter(item => item !== " ").map(num => parseInt(num)),
            myNumbers: cardNumbers[1].split(/ +/).filter(item => item !== " ").map(num => parseInt(num))
        })
    })

    cards.forEach(card => {
        const matchingNumbers = card.winningNumbers.filter(value => card.myNumbers.includes(value));

        if (rawInput.includes("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")) {
            console.log(matchingNumbers.length);
        }
        result += matchingNumbers.reduce((acc, _current) => {
            return acc === 0 ? 1 : acc * 2
        }, 0)
    })

    // if (rawInput.includes("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")) {
    //     console.log(cards)
    // }

    return result;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    const cardsInput = input.split("\n");
    const cards: { winningNumbers: number[]; myNumbers: number[] }[] = [];

    let result = 0;

    cardsInput.forEach(card => {
        const cardNumbers = card.substring(card.indexOf(":") + 1).split(" | ").map(item => item.trim())
        cards.push({
            winningNumbers: cardNumbers[0].split(/ +/).filter(item => item !== " ").map(num => parseInt(num)),
            myNumbers: cardNumbers[1].split(/ +/).filter(item => item !== " ").map(num => parseInt(num))
        })
    })

    const copies = Array(cardsInput.length).fill(1);

    cards.forEach((card, index) => {
        const matchingNumbers = card.winningNumbers.filter(value => card.myNumbers.includes(value));

        for (let i = 1; i <= matchingNumbers.length; i++) {
            copies[index + i] = copies[index + i] + copies[index];
        }

    });

    result = copies.reduce((acc, current) => {
        return acc + current;
    }, 0);

    return result;
};

run({
    part1: {
        tests: [
            {
                input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
                expected: 13,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
                expected: 30,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
