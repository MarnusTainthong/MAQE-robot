const getHeadingIndex = (currentIndex: number, action: "L" | "R") => {
  if (action === "R") {
    currentIndex++;
  } else if (action === "L") {
    currentIndex--;
  }

  // max = 4
  if (currentIndex > 3) {
    currentIndex = 0;
  } else if (currentIndex < 0) {
    currentIndex = 3;
  }

  return currentIndex;
};

const getPosition = (
  headingIndex: number,
  value: number,
  x: number,
  y: number
) => {
  if (headingIndex === 0) {
    y += value;
  } else if (headingIndex === 2) {
    y -= value;
  } else if (headingIndex === 1) {
    x += value;
  } else if (headingIndex === 3) {
    x -= value;
  }
  return { x, y };
};

const startBot = (problem1: string) => {
  const direct = ["north", "east", "south", "west"];
  let headingIndex = 0;
  let x = 0; // horizontal
  let y = 0; // vertical

  // L = Left
  // R = Right
  // W = Walk

  let numberStartAt: number = 0,
    numberEndAt: number = 0;

  let index = 0;
  for (const val of problem1) {
    const isNumber = !!Number(val) || val === "0";
    const isTurning = val === "L" || val === "R";
    if (isTurning) {
      headingIndex = getHeadingIndex(headingIndex, val);
    } else if (isNumber) {
      if (numberStartAt === 0) numberStartAt = index;
      const nextValue = problem1[index + 1];
      const isNextIsNumber = !!Number(nextValue) || nextValue === "0";
      if (!isNextIsNumber) {
        numberEndAt = index;
        const numberValue = Number(
          problem1.substring(numberStartAt, numberEndAt + 1)
        );
        const { x: newXPosition, y: newYPosition } = getPosition(
          headingIndex,
          numberValue,
          x,
          y
        );
        x = newXPosition;
        y = newYPosition;

        numberStartAt = 0;
        numberEndAt = 0;
      }
    }
    index += 1;
  }
  return `X: ${x} Y: ${y} Direction: ${direct[headingIndex]}`;
};

console.log(startBot("LLW100W50RW200W10"));
