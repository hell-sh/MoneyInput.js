# MoneyInput.js

A lightweight solution for intuitive input of money amounts on your website.

[View the demo.](https://hellshltd.github.io/MoneyInput.js/)

## Dependencies

- jQuery (Slim is good enough)

## Installation

You can either load the script from cdn.hell.sh using

    <script src="https://cdn.hell.sh/MoneyInput.js/1.2.1/MoneyInput.js" integrity="sha384-h9diVyF4OEe+315PplfBUwhJy+fA5KIfa2rng39thsylpT5+nPl1eWmf7i2ag9AR" crossorigin="anonymous"></script>

or [download the MoneyInput.js](https://raw.githubusercontent.com/hellshltd/MoneyInput.js/master/MoneyInput.js) and host it yourself.

## The `MoneyInput` object

- `decimalSeperator` — default `,` — symbol to use to indicate decimals
- `thousandSeperator` — default `.` — symbol to use to indicate thousands
- `centsToEuros(cents)` — returns a string representing the value of the given cents in euros
- `textToCents(text)` — removes all non-numeric characters from the given text
- `registerElements()` — registers all elements with the `money-input` class as a money input element with the proper attributes and events
