// let rewardsData = []; // This will hold the rewards data

// async function handleOnLoad() {
//     await fetchRewardsData(); // Load mock data
//     buildRewardsTable(); // Build the table
// }

// async function fetchRewardsData() {
//     // Mock data to simulate API response
//     rewardsData = [
//         { memberId: "1", name: "John Doe", email: "john.doe@example.com", points: 1500 },
//         { memberId: "2", name: "Jane Smith", email: "jane.smith@example.com", points: 1200 },
//         { memberId: "3", name: "Robert Johnson", email: "robert.johnson@example.com", points: 1800 },
//         { memberId: "4", name: "Emily Davis", email: "emily.davis@example.com", points: 1400 },
//     ];

//     console.log("Mock data loaded:", rewardsData);
// }

// function buildRewardsTable() {
//     let html = "";
//     rewardsData.forEach((reward) => {
//         html += `
//         <tr>
//             <td>${reward.memberId}</td>
//             <td>${reward.name}</td>
//             <td>${reward.email}</td>
//             <td>${reward.points}</td>
//         </tr>`;
//     });
//     document.getElementById("rewardsTableBody").innerHTML = html;
// }

// function filterTable() {
//     const searchValue = document.getElementById("searchBar").value.toLowerCase();

//     const rows = document.getElementById("rewardsTableBody").getElementsByTagName("tr");

//     for (let i = 0; i < rows.length; i++) {
//         const row = rows[i];
//         const memberId = row.cells[0].textContent.toLowerCase();
//         const name = row.cells[1].textContent.toLowerCase();

//         if (memberId.includes(searchValue) || name.includes(searchValue)) {
//             row.style.display = ""; // Show row if it matches search
//         } else {
//             row.style.display = "none"; // Hide row otherwise
//         }
//     }
// }

// Add event listener to handle on page load
document.addEventListener("DOMContentLoaded", handleOnLoad);


function filterTable() {
    const searchValue = document.getElementById('searchBar').value.toLowerCase();

    
    const tableBody = document.getElementById('rewardsTableBody');
    const rows = tableBody.getElementsByTagName('tr');

    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const memberId = row.cells[0].textContent.toLowerCase();
        const name = row.cells[1].textContent.toLowerCase();

        if (memberId.includes(searchValue) || name.includes(searchValue)) {
            row.style.display = ''; 
        } else {
            row.style.display = 'none'; 
        }
    }
}
