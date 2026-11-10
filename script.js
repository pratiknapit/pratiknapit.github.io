
// Display a message when the website loads

console.log("Welcome to Pratik's Engineering Portfolio!");

// Add a click interaction to the project cards

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(function(card) {

    card.addEventListener("click", function() {

        console.log("Selected project:", card.querySelector("h3").textContent);

    });

});
