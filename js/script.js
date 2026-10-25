'use strict';
// Number to Roman
const formToRoman = document.querySelector('#to-roman-form');
const inputNumber = document.querySelector('#number-input');
const labelNumber = document.querySelector('label[for="number-input"]');
const btnToRoman = document.querySelector('#to-roman-button');
const outputRomanResultSpan = document.querySelector('#roman-result span');
// Roman to Number
const formFromRoman = document.querySelector('#from-roman-form');
const inputRoman = document.querySelector('#roman-input');
const labelRoman = document.querySelector('label[for="roman-input"]');
const btnFromRoman = document.querySelector('#from-roman-button');
const outputNumberResultSpan = document.querySelector('#number-result span');

const romanNumbers = [
  { M: 1000 },
  { CM: 900 },
  { D: 500 },
  { CD: 400 },
  { C: 100 },
  { XC: 90 },
  { L: 50 },
  { XL: 40 },
  { X: 10 },
  { IX: 9 },
  { V: 5 },
  { IV: 4 },
  { I: 1 },
];

const doubleRomanNumbers = [
  { CM: 900 },
  { CD: 400 },
  { XC: 90 },
  { XL: 40 },
  { IX: 9 },
  { IV: 4 },
];

const convertNumberToRoman = function (number, updateUI) {
  let numberToReturn;
  if (
    Number.isInteger(Number(number)) &&
    Number(number) > 0 &&
    Number(number) <= 3999
  ) {
    let inputNumberCopy = Number(number);
    let romanNumeral = '';

    while (inputNumberCopy !== 0) {
      const currentRoman = romanNumbers.find(function (romanNum) {
        return Object.values(romanNum)[0] <= inputNumberCopy;
      });

      const quantity = Math.floor(
        inputNumberCopy / Object.values(currentRoman)[0],
      );

      for (let i = 0; i < quantity; i++) {
        romanNumeral += Object.keys(currentRoman)[0];
        inputNumberCopy -= Object.values(currentRoman)[0];
      }
    }
    // Display output span
    if (updateUI) {
      outputRomanResultSpan.textContent = romanNumeral;
    } else {
      numberToReturn = romanNumeral;
    }
  } else if (updateUI) {
    updateErrorUI(
      'Invalid Number',
      'Please enter a whole number between 1 and 3999.',
    );
  }

  return numberToReturn;
};

// Convert to Roman number
btnToRoman.addEventListener('click', function (e) {
  e.preventDefault();

  convertNumberToRoman(inputNumber.value, true);
});

const validRomanLetters = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

// Roman Convert to Number
btnFromRoman.addEventListener('click', function (e) {
  e.preventDefault();

  // Level 1 Validation
  const romanLetters = [...inputRoman.value];

  const isValidRomanLetter = romanLetters.every(function (romanLetter) {
    return validRomanLetters.some(function (validRomanLetter) {
      return validRomanLetter === romanLetter.toUpperCase();
    });
  });

  if (isNaN(inputRoman.value) && isValidRomanLetter) {
    const romanLetters = [...inputRoman.value];

    let romanToNumber = 0;
    let foundRomanPair = undefined;

    for (let i = 0; i < romanLetters.length; i++) {
      // Level 1 check :
      const foundRomanPair = doubleRomanNumbers.find(function (doubleRomanNum) {
        return (
          romanLetters
            .slice(i, i + 2)
            .join('')
            .toUpperCase() === Object.keys(doubleRomanNum)[0]
        );
      });

      if (foundRomanPair) {
        romanToNumber += Object.values(foundRomanPair)[0];
        i++;
      } else {
        // Level 2 check :
        const currentRomanNumber = romanNumbers.find(function (romanNum) {
          return Object.keys(romanNum)[0] === romanLetters[i].toUpperCase();
        });
        romanToNumber += Object.values(currentRomanNumber)[0];
      }
    }
    // Updated Output
    if (
      convertNumberToRoman(romanToNumber, false) ===
      inputRoman.value.toUpperCase()
    ) {
      outputNumberResultSpan.textContent = romanToNumber;
    } else {
      updateErrorUI(
        'Invalid Roman numeral',
        'Please enter a valid Roman numeral using the correct symbols and formatting, representing a number between 1 and 3999.',
      );
    }
  } else {
    updateErrorUI(
      'Invalid Characters',
      'Only Roman numeral symbols (I, V, X, L, C, D, M) are allowed. Please remove any invalid characters and try again.',
    );
  }
});

const errorTitle = document.querySelector('#error-title');
const errorDescription = document.querySelector('#error-description');
const errorMessage = document.querySelector('#error-message');

// Update error UI
let errorTimeout;
function updateErrorUI(title, message) {
  clearTimeout(errorTimeout);

  errorMessage.classList.remove('hidden');
  errorTimeout = setTimeout(function () {
    errorMessage.classList.add('hidden');
  }, 3500);

  errorTitle.textContent = title;
  errorDescription.textContent = message;
}
