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
const toggleBtns = document.querySelectorAll('.toggle-btn');

// Define API key for ExchangeRate-API
const API_KEY = "32b77ae2722415e365d3e19d";

// set up event listeners for toggling between convert and exchange modes
toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        toggleBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.getAttribute("data-mode");

        if (mode === "convert") {
            convertMode.style.display = "flex";
            exchangeMode.style.display = "none";
        } else {
            convertMode.style.display = "none";
            exchangeMode.style.display = "flex";
        }
    
    });
});

// Implement the convert currency functionality
convertBtn.addEventListener("click", () => {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const rate = data.conversion_rate;
        const convertedAmount = (rate * amount).toFixed(2);
        result.innerHTML = `<span class="currency-icon"></span>${convertedAmount} ${to}`;
    })
    .catch((error) => {
        console.log(error);
    });
});

// Implement the get exchange rates functionality
getRatesBtn.addEventListener("click", () => {
    const base = baseCurrency.value;
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let ratesHtml = "<h3>Exchange Rates</h3><ul>";
        for (const [currency, rate] of Object.entries(data.conversion_rates)) {
            if (currency !== base) {
                ratesHtml += `<li><span class="currency-icon">${currency}</span>${currency}: ${rate.toFixed(4)}</li>`;
            }
        }
        ratesHtml += "</ul>";
        exchangeRates.innerHTML = ratesHtml;
    })
    .catch((error) => {
        exchangeRates.textContent = "An error occurred while fetching exchange rates. Please try again.";
    })
});