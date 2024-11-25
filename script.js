// initialize Feather icons
feather.replace();

// Select DOM elements
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const result = document.getElementById('result');
const baseCurrency = document.getElementById('base-currency');
const getRatesBtn = document.getElementById('get-rates-btn');
const exchangeRates = document.getElementById('exchange-rates');
const convertMode = document.getElementById('convert-mode');
const exchangeMode = document.getElementById('exchange-mode');
const toggleBtns = document.querySelectorAll('.toggleBtns');

// Define API key for ExchangeRate-API
const API_KEY = "32b77ae2722415e365d3e19d";

// set up event listeners for toggling between convert and exchange modes
toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        toggleBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");

        const mode = btn.getAttribute("data-mode");
        console.log(mode);
    });
});