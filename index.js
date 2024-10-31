const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const customTipInput = document.getElementById('custom-tip');
const tipButtons = document.querySelectorAll('.tip-btn'); 
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount'); // Fixed casing
const errorText = document.getElementById('error');
const resetBtn = document.getElementById('reset-btn');

let billValue = 0;
let peopleValue = 1;
let tipPercentage = 0;

// Update the tip and total display
function UpdateTipAndTotal() {
    if (peopleValue > 0) {
        const tipAmount = (billValue * tipPercentage) / 100 / peopleValue;
        const totalAmount = (billValue / peopleValue) + tipAmount;

        // Display the calculated tip and total per person  
        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
        tipAmountDisplay.textContent = "$0.00";
        totalAmountDisplay.textContent = "$0.00";
    }
}

// Handle bill input
billInput.addEventListener('input', function() {
    billValue = parseFloat(billInput.value);
    if (isNaN(billValue) || billValue <= 0) {
        billValue = 0;
    }
    UpdateTipAndTotal();
});

// Handle Tip Button Clicks
tipButtons.forEach(button => {
    button.addEventListener('click', function() {
        tipButtons.forEach(btn => btn.classList.remove('active')); // Fixed typo here
        button.classList.add('active');
        tipPercentage = parseFloat(button.dataset.tip);
        customTipInput.value = ''; // Clear custom tip input if a button is selected
        
        UpdateTipAndTotal();
    });
});

// Handle Custom Tip Input
customTipInput.addEventListener('input', function() {
    tipPercentage = parseFloat(customTipInput.value);
    if (isNaN(tipPercentage) || tipPercentage < 0) {
        tipPercentage = 0;
    }
    tipButtons.forEach(btn => btn.classList.remove('active'));
    
    UpdateTipAndTotal();
});

// Handle People Input
peopleInput.addEventListener('input', function() {
    peopleValue = parseFloat(peopleInput.value);
    if (isNaN(peopleValue) || peopleValue <= 0) {
        errorText.style.display = 'block';  // Show error if value is 0 or invalid
        peopleInput.style.borderColor = 'red';
        peopleValue = 0; // Keep this but ensure UpdateTipAndTotal() handles it
    } else {
        errorText.style.display = 'none'; // Hide error if input is valid
        peopleInput.style.borderColor = 'initial';
    }
    UpdateTipAndTotal();
});

// Reset Functionality
resetBtn.addEventListener('click', function() {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    errorText.style.display = 'none';
    peopleInput.style.borderColor = 'initial';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    tipPercentage = 0;
    billValue = 0;
    peopleValue = 1;
});
