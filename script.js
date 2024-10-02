const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';

async function fetchRates() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
}

function createRow(key, rate) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${rate.unit}</td>
    <td>${key}</td>
    <td>${rate.name}</td>
    <td>
      <input type="number" value="${rate.value}" step="0.000001" min="0">
    </td>
    <td>
      <button onclick="updateRate('${key}', this)">Update</button>
    </td>
  `;
  return row;
}

async function populateTable() {
  const ratesBody = document.getElementById('ratesBody');
  const rates = await fetchRates();
  ratesBody.innerHTML = '';
  for (const [key, rate] of Object.entries(rates)) {
    ratesBody.appendChild(createRow(key, rate));
  }
}

function updateRate(key, button) {
  const row = button.closest('tr');
  const input = row.querySelector('input');
  const newValue = parseFloat(input.value);

  if (isNaN(newValue) || newValue < 0) {
    alert('Please enter a valid positive number.');
    return;
  }

  console.log(`Updated ${key} to ${newValue}`);
  alert(`Rate for ${key} updated to ${newValue}`);
}

// Only call populateTable if we're in a browser environment
if (typeof window !== 'undefined') {
  populateTable();
}

module.exports = { fetchRates, createRow, updateRate };