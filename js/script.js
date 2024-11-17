console.log("jeg er i script")

const apiUrl = "http://localhost:8080/recommendation"; // Replace with your backend API URL

document.getElementById("recommend-btn").addEventListener("click", async () => {
    const genreInput = document.getElementById("genre-input").value;
    const responseContainer = document.getElementById("response-container");


    responseContainer.style.display = "none";
    responseContainer.textContent = "";

    if (!genreInput) {
        responseContainer.style.display = "block";
        responseContainer.textContent = "Please enter a genre.";
        responseContainer.classList.add("error");
        return;
    }

    try {

        const response = await fetch(`${apiUrl}?genreName=${genreInput}`);
        if (!response.ok) {
            throw new Error("Failed to fetch recommendation.");
        }

        const data = await response.json();
        console.log("API Response:", data);


        if (data && data.answer) {
            responseContainer.style.display = "block";
            responseContainer.classList.remove("error");
            responseContainer.textContent = data.answer;
        } else {
            throw new Error("Unexpected response format. Check the API.");
        }
    } catch (error) {
        responseContainer.style.display = "block";
        responseContainer.classList.add("error");
        responseContainer.textContent = "Error fetching recommendation: " + error.message;
    }
});
