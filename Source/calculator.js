let currentValue = null;
let previousValue = null;
let operator = null;
let isClickedOperator = false;
let isClickedEquals = false;
let isClickedFunction = false;
let isErrorState = false;
let lastOperator = null;
let lastOperand = null;
let lastEqual = false;
let input = '0';
let expression = '';
let displayFunction = '';
let history = [];
const MAX_INPUT_LENGTH = 17;

const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');
const historyList = document.getElementById('historyList');
const exprEl = document.querySelector('.expression');

function updateHistoryDisplay() {
    if (history.length === 0) {
        historyList.innerHTML = `
                    <div class="empty-history">
                        <div class="empty-history-icon">📊</div>
                        <div class="empty-history-text">No history yet</div>
                    </div>
                `;
        return;
    }

    historyList.innerHTML = history.map((item, index) => `
                <div class="history-item" onclick="loadFromHistory(${index})">
                    <div class="history-content">
                        <div class="history-expression">${item.expression}</div>
                        <div class="history-result">${item.input}</div>
                    </div>
                    <button class="delete-btn" onclick="event.stopPropagation(); deleteHistoryItem(${index})">×</button>
                </div>
            `).reverse().join('');
}

function addToHistory() {
    const stateArray = [
        { key: 'previousValue', value: previousValue },
        { key: 'currentValue', value: currentValue },
        { key: 'operator', value: operator },
        { key: 'lastOperator', value: lastOperator },
        { key: 'lastOperand', value: lastOperand },
        { key: 'lastEqual', value: lastEqual },
        { key: 'displayFunction', value: displayFunction },
        { key: 'isClickedOperator', value: isClickedOperator },
        { key: 'isClickedEquals', value: isClickedEquals },
        { key: 'isClickedFunction', value: isClickedFunction },
        { key: 'isErrorState', value: isErrorState },
    ];

    let formatExpression = expression;
    if (!expression.includes('=')) {
        formatExpression += ' =';
    }

    history.push({
        input: input,
        expression: formatExpression,
        states: stateArray,
        timestamp: new Date()
    });
    updateHistoryDisplay();
}

function deleteHistoryItem(index) {
    history.splice(index, 1);
    updateHistoryDisplay();
}

function clearHistory() {
    history = [];
    updateHistoryDisplay();
}

function loadFromHistory(index) {
    const item = history[index];
    if (!item) return;

    input = item.input;
    expression = item.expression;
    if (item.states && Array.isArray(item.states)) {
        const stateObj = Object.fromEntries(item.states.map(s => [s.key, s.value]));

        previousValue = stateObj.previousValue;
        currentValue = stateObj.currentValue;
        operator = stateObj.operator;
        lastOperator = stateObj.lastOperator;
        lastOperand = stateObj.lastOperand;
        lastEqual = stateObj.lastEqual;
        displayFunction = stateObj.displayFunction;
        isClickedOperator = stateObj.isClickedOperator;
        isClickedEquals = stateObj.isClickedEquals;
        isClickedFunction = stateObj.isClickedFunction;
        isErrorState = stateObj.isErrorState;
    }

    if (!lastEqual) {
        lastOperand = currentValue;
        lastOperator = operator;
        lastEqual = true;
        isClickedEquals = true;
        isClickedOperator = false;
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = input;
    expressionDisplay.textContent = expression;
    adjustFontSize(display, 52, 20); 
    updateExpressionDisplay();
}

function updateExpressionDisplay() {
    exprEl.textContent = expression;
    exprEl.scrollLeft = exprEl.scrollWidth;
}

function adjustFontSize(element, maxSize, minSize) {
    element.style.fontSize = maxSize + 'px';
    let scrollWidth = element.scrollWidth;
    let clientWidth = element.clientWidth;

    while (scrollWidth > clientWidth && maxSize > minSize) {
        maxSize -= 1;
        element.style.fontSize = maxSize + 'px';
        scrollWidth = element.scrollWidth;
    }
}

function initializeCalculator() {
    currentValue = null;
    previousValue = null;
    operator = null;
    input = '0';
    expression = '';
    displayFunction = '';
    lastOperator = null;
    lastOperand = null;
    lastEqual = false;
    isClickedOperator = false;
    isClickedEquals = false;
    isClickedFunction = false;
    isErrorState = false;
    setDisableFunctions(false);
    setDisableOperators(false);
    setDisableDecimal(false);
    updateDisplay();
}

function appendNumber(num) {
    if (isErrorState) {
        initializeCalculator();
    }
    if (isClickedOperator) {
        input = num;
        isClickedOperator = false;
    } else if (isClickedEquals) {
        if (lastOperator === null) {
            input = num;
            isClickedEquals = false;
            lastEqual = false;
        } else {
            input = num;
            expression = '';
            isClickedEquals = false;
        }
    } else if (isClickedFunction) {
        input = num;
        isClickedFunction = false;
    }
    else {
        if (input.length < MAX_INPUT_LENGTH) {
            input = input === '0' ? num : input + num;
        }
    }

    updateDisplay();
}

function appendDecimal() {
    if (isClickedOperator || isClickedEquals) {
        input = '0.';
        isClickedOperator = false;
        isClickedEquals = false;
    } else if (!input.includes('.') && input.length < MAX_INPUT_LENGTH - 1) {
        input += '.';
    }
    isClickedFunction = false;
    updateDisplay();
}

function setOperator(op) {
    let result = null;
    currentValue = parseFloat(input);
    if (lastEqual) {
        previousValue = null;
        operator = null;
        lastEqual = false;
    }
    if (operator !== null && !isClickedOperator && !isClickedEquals) {
        result = calculate();
    }
    if (typeof result == 'string' && result.includes('Error')) {
        expression = `${previousValue} ${operator} ${currentValue} ${op}`;
        handleError(result);
        return;
    }

    previousValue = result !== null ? result : currentValue;
    currentValue = result !== null ? result : currentValue;
    operator = op;
    if (isClickedFunction) {
        expression = `${displayFunction} ${operator}`;
    }
    else {
        expression = `${previousValue} ${operator}`;
    }
    isClickedOperator = true;
    isClickedEquals = false;
    isClickedFunction = false;
    updateDisplay();
}

function equal() {
    if (isErrorState) {
        initializeCalculator();
        return;
    }
    let result = null;
    if (!lastEqual) {
        currentValue = parseFloat(input);
        lastOperand = currentValue;
    } else if (lastOperator !== null) {
        previousValue = parseFloat(input);
        operator = lastOperator;
        currentValue = lastOperand;
    }
    if (operator !== null) {
        result = calculate();
        if (isClickedFunction) {
            if (lastEqual) {
                expression = `${displayFunction} ${operator} ${currentValue} =`;
            } else {
                expression += ` =`;
            }
        }
        else {
            expression = `${previousValue} ${operator} ${currentValue} =`;
        }
    } else {
        if (isClickedFunction) {
            expression = `${displayFunction} =`;
        } else {
            expression = `${currentValue} =`;
        }
    }

    if (typeof result == 'string' && result.includes('Error')) {
        expression = `${previousValue} ${operator}`;
        handleError(result);
        return;
    }
    if (result === null)
        addToHistory();

    lastOperator = operator;
    previousValue = result !== null ? result : currentValue;
    operator = null;
    lastEqual = true;
    isClickedEquals = true;
    isClickedOperator = false;
    isClickedFunction = false;
    displayFunction = '';
    input = result !== null ? result : currentValue;
    updateDisplay();
}

function calculate() {
    if (operator === null || previousValue === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                if (prev === 0) {
                    return 'Error zero divided zero';
                }
                else {
                    return 'Error divide by zero';
                }
            }
            result = prev / current;
            break;
    }
    expression = `${prev} ${operator} ${current} =`;
    input = formatResult(result);
    addToHistory();
    return formatResult(result);
}

function handleError(error) {
    if (error === 'Error divide by zero') {
        input = 'Cannot divide by zero';
    } else if (error === 'Error zero divided zero') {
        input = 'Result is undefined';
    } else if (error === 'Error square root by negative') {
        input = 'Invalid input';
    }
    isErrorState = true;
    setDisableFunctions(true);
    setDisableOperators(true);
    setDisableDecimal(true);
    updateDisplay();
}

function setDisableFunctions(state) {
    document.querySelectorAll('.function').forEach(btn => {
        const label = btn.innerText.trim();
        if (!['CE', 'C', '⌫'].includes(label)) {
            btn.disabled = state;
        }
    });
}

function setDisableOperators(state) {
    document.querySelectorAll('.operator').forEach(btn => {
        btn.disabled = state;
    });
}

function setDisableDecimal(state) {
    document.querySelectorAll('.number').forEach(btn => {
        if (btn.innerText.trim() === '.') {
            btn.disabled = state;
        }
    });
}

function formatResult(num) {
    if (!isFinite(num)) return 'Error';

    let str = num.toString();

    if (str.replace('-', '').replace('.', '').length > MAX_INPUT_LENGTH) {
        return num.toExponential(MAX_INPUT_LENGTH - 1);
    }

    return str;
}

function clearAll() {
    initializeCalculator();
}

function clearEntry() {
    if (isErrorState) {
        initializeCalculator();
        return;
    }
    input = '0';
    expression = '';
    displayFunction = '';
    isClickedOperator = false;
    isClickedEquals = false;
    isClickedFunction = false;
    updateDisplay();
}

function backspace() {
    if (isErrorState) {
        initializeCalculator();
        return;
    }

    if (isClickedOperator) return;
    if (isClickedFunction) return;

    if (isClickedEquals) {
        expression = '';
        updateDisplay();
        return;
    }

    input = input.length > 1 ? input.slice(0, -1) : '0';
    updateDisplay();
}

function negate() {
    const value = parseFloat(input);
    input = formatResult((-1) * value);
    if (displayFunction === '') {
        displayFunction = `negative(${value})`;
    } else {
        displayFunction = 'negative(' + displayFunction + ')';
    }
    if (!isClickedEquals && operator !== null) {
        expression = `${previousValue} ${operator} ${displayFunction}`;
    } else {
        expression = `${displayFunction}`
    }
    isClickedFunction = true;
    updateDisplay();
}

function percentage() {
    let value = parseFloat(input);
    if (lastEqual) {
        operator = lastOperator;
    }

    switch (operator) {
        case '+':
        case '−':
            value = (previousValue * value) / 100;
            value = formatResult(value);
            input = value;

            if (!isClickedEquals) {
                expression = `${previousValue} ${operator} ${input}`;
            }
            else {
                expression = `${input}`;
            }
            break;
        case '×':
        case '÷':
            value = value / 100;
            value = formatResult(value);
            input = value;
            if (!isClickedEquals) {
                expression = `${previousValue} ${operator} ${input}`;
            }
            else {
                expression = `${input}`;
            }
            break;
        default:
            input = '0';
            expression = '0';
            break;
    }
    if (lastEqual) {
        addToHistory();
    }
    updateDisplay();
}

function squareRoot() {
    const value = parseFloat(input);
    if (value < 0) {
        const error = 'Error square root by negative';
        expression = `√(${value})`
        handleError(error);
        return;
    }
    input = formatResult(Math.sqrt(value));
    if (displayFunction === '') {
        displayFunction = `√(${value})`;
    } else {
        displayFunction = '√(' + displayFunction + ')';
    }
    if (!isClickedEquals && operator !== null) {
        expression = `${previousValue} ${operator} ${displayFunction}`;
    } else {
        expression = `${displayFunction}`
    }
    if (lastEqual) {
        addToHistory();
    }
    isClickedFunction = true;
    updateDisplay();
}

function square() {
    const value = parseFloat(input);
    input = formatResult(value * value);
    if (displayFunction === '') {
        displayFunction = `sqr(${value})`;
    } else {
        displayFunction = 'sqr(' + displayFunction + ')';
    }
    if (!isClickedEquals && operator !== null) {
        expression = `${previousValue} ${operator} ${displayFunction}`;
    } else {
        expression = `${displayFunction}`
    }
    if (lastEqual) {
        addToHistory();
    }
    isClickedFunction = true;
    updateDisplay();
}

function inverse() {
    const value = parseFloat(input);
    if (value === 0) {
        error = 'Error divide by zero';
        expression = `1/(${value})`;
        handleError(error);
        return;
    }
    input = formatResult(1 / value);
    if (displayFunction === '') {
        displayFunction = `1/(${value})`;
    } else {
        displayFunction = '1/(' + displayFunction + ')';
    }
    if (!isClickedEquals && operator !== null) {
        expression = `${previousValue} ${operator} ${displayFunction}`;
    } else {
        expression = `${displayFunction}`
    }
    if (lastEqual) {
        addToHistory();
    }
    isClickedFunction = true;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === '+') {
        setOperator('+');
    } else if (e.key === '-') {
        setOperator('−');
    } else if (e.key === '*') {
        setOperator('×');
    } else if (e.key === '/') {
        e.preventDefault();
        setOperator('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        backspace();
    } else if (e.key === '%') {
        percentage();
    }
});