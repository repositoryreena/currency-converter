document.addEventListener('DOMContentLoaded', () => {
    const baseSelect = document.querySelector('span:nth-of-type(1) select');
    const baseInput = document.querySelector('span:nth-of-type(1) input');
    const targetSelect = document.querySelector('span:nth-of-type(2) select');
    const targetInput = document.querySelector('span:nth-of-type(2) input');
    const paragraph = document.getElementById('paragraph');

    // Function to fetch the exchange rate
    async function fetchExchangeRate(baseCurrency, targetCurrency) {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
            const data = await response.json();
            return data.rates[targetCurrency];
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            return null;
        }
    }

    // Function to update the conversion
    async function updateConversion() {
        const baseCurrency = baseSelect.value;
        const targetCurrency = targetSelect.value;
        const baseAmount = parseFloat(baseInput.value) || 0;

        const rate = await fetchExchangeRate(baseCurrency, targetCurrency);

        if (rate !== null) {
            const convertedAmount = (baseAmount * rate).toFixed(2);
            targetInput.value = convertedAmount;

            paragraph.textContent = `1 ${baseCurrency} = ${rate.toFixed(4)} ${targetCurrency}`;
        } else {
            targetInput.value = 'Error';
            paragraph.textContent = 'Conversion rate not available';
        }
    }

    // Event listeners for updates
    baseSelect.addEventListener('change', updateConversion);
    targetSelect.addEventListener('change', updateConversion);
    baseInput.addEventListener('input', updateConversion);

    // Initial conversion
    updateConversion();
});
