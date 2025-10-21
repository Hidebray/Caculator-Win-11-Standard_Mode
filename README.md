# 💻 Standard Calculator (Web Implementation)

## 📌 Project Overview

This project delivers a robust, web-based calculator application engineered to replicate the **Standard Mode** functionality found in the Windows 11 operating system. Developed entirely with **vanilla JavaScript**, the application focuses on accurate arithmetic execution, comprehensive error handling, and a seamless user experience, making it a reliable tool for everyday calculations.

## ✨ Core Features & Functionality

### Arithmetic and Execution Model

The calculator operates on a **sequential execution model**, performing operations immediately as they are entered, rather than following standard mathematical precedence (e.g., $2 + 3 \times 4$ yields $20$, not $14$).

* **Four-Function Arithmetic**: Full support for Addition ($\mathbf{+}$), Subtraction ($\mathbf{-}$), Multiplication ($\mathbf{\times}$), and Division ($\mathbf{\div}$).
* **Continuous Operation**: The equals ($\mathbf{=}$) function supports repeated execution of the last operator and operand, facilitating iterative calculations (e.g., $5+2=7$, followed by $\mathbf{=}$ yields $9, 11, 13, \dots$).
* **Precision Management**: Input and results are managed to a limit of **17 significant digits** to ensure display consistency and prevent UI overflow.

### Advanced Standard Functions

| Function | Symbol | Description |
| :--- | :--- | :--- |
| **Percentage** | % | Behavior is contextual: calculates the percentage of the preceding operand for addition/subtraction, or acts as a $\div 100$ multiplier for multiplication/division. |
| **Square Root** | $\mathbf{\sqrt{x}}$ | Computes the square root of the current input value. |
| **Squaring** | $\mathbf{x^2}$ | Calculates the square of the current input value. |
| **Reciprocal** | $\mathbf{1/x}$ | Computes the inverse of the current input. |
| **Negation** | $\mathbf{\pm}$ | Toggles the sign of the current input. |

### Utility and User Experience

* **Calculation History**: A persistent sidebar logs completed equations and their results. Users can reload any past calculation state into the primary display with a single click.
* **Dynamic Display Scaling**: The primary and expression displays utilize dynamic font size adjustment, ensuring that long results (including those in scientific notation) remain visible without text overflow.
* **Input Management**: Separate functions for **Clear Entry (CE)** (clears only the current input), **Clear (C)** (resets all state), and **Backspace** ($\mathbf{\leftarrow}$) (deletes the last digit).
* **Comprehensive Error Handling**: Displays specific, non-blocking messages for:
    * `Cannot divide by zero`
    * `Result is undefined` ($0 \div 0$)
    * `Invalid input` (for $\sqrt{-n}$)
* **Keyboard Accessibility**: Full keyboard navigation is supported for numerical input, operators ($+$, $-$, $*$, $/$), $\text{Enter}/\text{=}$, $\text{Backspace}$, and $\mathbf{\%}$.

## ⚙️ Technical Stack

This project is implemented with a focus on simplicity, performance, and maintainability.

* **Language**: Vanilla JavaScript (ES6+)
* **Architecture**: State managed through a clear and traceable execution flow within the `calculator.js` module.
* **Deployment**: Purely client-side, requiring no backend or complex server configuration.

## 🚀 Getting Started

To view or use the calculator locally, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [your-repo-link]
    ```
2.  **Launch:** Navigate to the project directory and open **`index.html`** in any modern web browser (Chrome, Firefox, Edge, or Safari).
