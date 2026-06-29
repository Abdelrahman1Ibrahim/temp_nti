function isArraySortedAscending(numbers: number[]): boolean {
  for (let index = 0; index < numbers.length - 1; index++) {
    if (numbers[index] > numbers[index + 1]) {
      return false;
    }
  }
  return true;
}

function filterNumbersGreaterThan(
  numbers: number[],
  threshold: number,
): number[] {
  const filteredNumbers: number[] = [];

  for (const currentNumber of numbers) {
    if (currentNumber > threshold) {
      filteredNumbers.push(currentNumber);
    }
  }

  return filteredNumbers;
}

function plusOne(digits: number[]): number[] {
  for (let index = digits.length - 1; index >= 0; index--) {
    if (digits[index] < 9) {
      digits[index]++;
      return digits;
    }
    digits[index] = 0;
  }

  const newDigits = new Array(digits.length + 1).fill(0);
  newDigits[0] = 1;
  return newDigits;
}

function removeDuplicates(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }

  let uniqueElementsCount = 1;

  for (let index = 1; index < numbers.length; index++) {
    if (numbers[index] !== numbers[index - 1]) {
      numbers[uniqueElementsCount] = numbers[index];
      uniqueElementsCount++;
    }
  }

  return uniqueElementsCount;
}
