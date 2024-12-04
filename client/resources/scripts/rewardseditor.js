document.addEventListener("DOMContentLoaded", () => {
    const currentPointsElement = document.getElementById("current-points");
    const pointsInput = document.getElementById("points-input");
    const saveButton = document.getElementById("save-button");
    const successMessage = document.getElementById("success-message");


    let pointsPerDollar = 10;


    currentPointsElement.textContent = pointsPerDollar;


    saveButton.addEventListener("click", () => {
        const newPoints = parseInt(pointsInput.value, 10); // Get the value from input


        if (newPoints >= 1 && newPoints <= 100) {
            pointsPerDollar = newPoints; 
            currentPointsElement.textContent = pointsPerDollar; 
        } else {
            alert("Please enter a valid number between 1 and 10."); 
        }
    });
});