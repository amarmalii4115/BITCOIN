// Store the original data for filtering and sorting
let allData = [];

// Fetch data using async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    allData = data;
    renderDataTable(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fetch data using .then()
function fetchDataWithThen() {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(response => response.json())
    .then(data => {
      allData = data;
      renderDataTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Render data in the table
function renderDataTable(data) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Clear any previous rows

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.symbol.toUpperCase()}</td> <!-- Display symbol in uppercase -->
      <td>$${item.current_price.toFixed(2)}</td>
      <td>$${item.total_volume.toLocaleString()}</td>
      <td>$${item.market_cap.toLocaleString()}</td>
      <td>${item.price_change_percentage_24h.toFixed(2)}%</td>
    `;
    tableBody.appendChild(row);
  });
}

// Filter data based on search input
function filterData() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const filteredData = allData.filter(item => item.name.toLowerCase().includes(searchInput));
  renderDataTable(filteredData);
}

// Sort data based on selected criteria
function sortData(criteria) {
  const sortedData = [...allData].sort((a, b) => {
    if (criteria === 'market_cap') {
      return b.market_cap - a.market_cap; // Sort by descending market cap
    } else if (criteria === 'price_change_percentage_24h') {
      return b.price_change_percentage_24h - a.price_change_percentage_24h; // Sort by descending percentage change
    }
    return 0;
  });
  renderDataTable(sortedData);
}

// Event listeners for buttons and input
document.getElementById('search-input').addEventListener('input', filterData);
document.getElementById('sort-market-cap').addEventListener('click', () => sortData('market_cap'));
document.getElementById('sort-change').addEventListener('click', () => sortData('price_change_percentage_24h'));

// Initialize by fetching data using async/await
fetchData();
