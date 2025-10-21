# Windows 11 Basic Mode Calculator Documentation

---

# 🧰 Functional Specifications

### Purpose and Scope

This calculator web application is designed to emulate the **Windows 11 Basic Calculator** in functionality. It allows users to perform basic arithmetic operations, percentage calculations, square, square root, negate, inverse, and handles standard inputs like CE, C, and Backspace.

**Scope:**

* Desktop and mobile usage.
* Support for basic arithmetic (+, −, ×, ÷), percentage, square, square root, negate and inverse.
* History tracking of previous calculations.
* Responsive and accessible UI.

### Supported Features (Same as Windows 11 Basic Mode)

1. **Append Numbers**: 0–9, decimal (.)
2. **Set Operators**: +, −, ×, ÷
3. **Handle Equals**: =
4. **Percentage**: % (operand-based)
5. **Square**: sqr(x)
6. **Square Root**: √x
7. **Negate**: ±
8. **Inverse**: 1/x
9. **Clear Entry**: CE 
10. **Clear All**: C
11. **Backspace**: ⌫
12. **History Panel**: stores, load and adjust (delete one or all) previous calculations
13. **Expression display**: shows current operation
14. **Input validation**: max digits (17), correct rounding and convert to science
15. **Error handling**: divide by zero, zero by zero, invalid input and disabled button

### Input, Operators, and Display Handling

* **Input Handling**:

  * Number buttons append digits to the current input.
  * Decimal adds a dot if not present.
  * Max 17 digits visible; if overflow, converts to scientific notation.

* **Operator Handling**:

  * Stores previous value and operator.
  * On consecutive operators, calculates intermediate result.
  * Handles repeated equals operations with stored last operator and operand.

* **Display Handling**:

  * Current input is shown on the main display.
  * Expression (previous value + operator + current value) is shown on top.
  * Scrolls horizontally if too long.
  * Adjusts font size dynamically for overflow.

* **Assumptions**:

  * Floating point operations are rounded to 11 significant digits.
  * Standard operator precedence is not implemented (left-to-right).
  * Percentage calculations follow Windows behavior: `A % B = (A*B)/100` for +/−, `A % B = B/100` for ×/÷.

---

# ⚙️ Non-Functional Specifications

### Performance

* Instant calculation on button press.
* Smooth display updates without flickering.

### Usability

* Buttons large enough for touch.
* Clear expression display.
* History accessible with clickable previous results.

### Cross-browser Compatibility

* Chrome, Edge, Firefox, Safari tested.
* Modern JavaScript and CSS standards used.

### Responsiveness

* Desktop layout: calculator left, history right.
* Mobile layout: calculator stacked above history panel.

### Reliability and Maintainability

* Modular JavaScript functions for operations.
* Separate CSS for theme and layout.
* Clear comments and structured code for maintainability.

---

# ✅ Acceptance Criteria

1. Arithmetic operations return correct results.
2. Operator precedence applied as per left-to-right evaluation.
3. CE, C, Backspace behave like Windows 11 calculator.
4. Display updates accurately after each input.
5. Design remains stable across browsers and devices.
6. Deployed version publicly accessible and functional.

---

# 🧪 Testing Plan

**Method:** Manual testing with expected vs. actual output verification.

**Test Cases (Examples):

| Input       | Expected Output       | Actual Output         | Result |
| ----------- | --------------------- | --------------------- | ------ |
| 2 + 3 =     | 5                     | 5                     | Pass   |
| √9 =        | 3                     | 3                     | Pass   |
| 10 %        | 0.1                   | 0.1                   | Pass   |
| 8 − 5 % =   | 7.6                   | 7.6                   | Pass   |
| sqr(3) =    | 9                     | 9                     | Pass   |
| negate(5) = | -5                    | -5                    | Pass   |
| 1 / 0 =     | Cannot divide by zero | Cannot divide by zero | Pass   |

---

# 🧠 Prompt Engineering (AI Assistance)

**Prompts Used:**

* "Generate JavaScript logic for Windows 11 calculator Basic Mode including %, sqrt, square, negate operations."
* "Explain how to parse expressions like `sqr(negate(3)) + 2` to get calculated values."
* "Provide CSS for responsive calculator layout with max 17-digit display."

**How AI Helped:**

* Suggested modular functions for operators and expression parsing.
* Assisted with complex edge cases, e.g., repeated equals operations.
* Provided responsive and theme CSS suggestions.

**Reflections:**

* AI accelerated idea generation and debugging.
* Ensured best practices in function structure.
* All code reviewed manually to verify correctness.
