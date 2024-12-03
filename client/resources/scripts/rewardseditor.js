document.addEventListener("DOMContentLoaded", () => {
    const currentPointsElement = document.getElementById("current-points");
    const pointsInput = document.getElementById("points-input");
    const saveButton = document.getElementById("save-button");
    const successMessage = document.getElementById("success-message");

    let pointsPerDollar = 1;

    currentPointsElement.textContent = pointsPerDollar;

    saveButton.addEventListener("click", () => {
        const newPoints = parseInt(pointsInput.value, 10);
        if (newPoints >= 1 && newPoints <= 10) {
            pointsPerDollar = newPoints;
            currentPointsElement.textContent = pointsPerDollar;
            successMessage.classList.remove("hidden");
            setTimeout(() => {
                successMessage.classList.add("hidden");
            }, 3000);
        } else {
            alert("Please enter a valid number between 1 and 10.");
        }
    });
});