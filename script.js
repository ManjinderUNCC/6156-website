// Function to fetch CSV file
async function fetchCSVFile() {
    const response = await fetch('salary_comparison.csv');
    const data = await response.text();
    return data;
}

// Function to parse CSV data and populate dropdown menu
async function populateDropdownMenu() {
    const data = await fetchCSVFile();
    const rows = data.split('\n'); // Split rows
    const header = rows[0].split(','); // Get header row
    const playerIndex = header.indexOf('Player Name'); // Find index of 'Player Name' column
    const playerSelect = document.getElementById("player-select");

    // Populate dropdown menu with player names
    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        const playerName = columns[playerIndex];
        playerSelect.innerHTML += `<option value="${playerName}">${playerName}</option>`;
    }
}

// Function to display player salary
async function showPlayerSalary() {
    var playerSelect = document.getElementById("player-select");
    var playerName = playerSelect.value;
    var salaryTable = document.getElementById("salary-table");
    
    // Clear previous salary table
    salaryTable.innerHTML = "";

    // Fetch CSV data and filter based on selected player name
    const data = await fetchCSVFile();
    const rows = data.split('\n'); // Split rows
    const header = rows[0].split(','); // Get header row
    const playerIndex = header.indexOf('Player Name'); // Find index of 'Player Name' column

    // Find the row corresponding to the selected player
    for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(',');
        if (columns[playerIndex] === playerName) {
            const originalSalary = columns[1];
            const randomForestSalary = columns[4];

            // Display salary table for selected player
            var salaryHTML = `<h2>${playerName}'s Salaries</h2>`;
            salaryHTML += "<table><tr><th>Category</th><th>Salary</th></tr>";
            salaryHTML += `<tr><td>Original Salary</td><td>$${originalSalary}</td></tr>`;
            salaryHTML += `<tr><td>Random Forest Salary</td><td>$${randomForestSalary}</td></tr>`;
            salaryHTML += "</table>";
            salaryTable.innerHTML = salaryHTML;
            return; // Exit the loop once the player is found
        }
    }
    
    // If the player is not found, display an error message
    salaryTable.innerHTML = "<p>No salary information available for the selected player.</p>";
}

// Populate dropdown menu on page load
populateDropdownMenu();
