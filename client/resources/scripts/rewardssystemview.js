
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
