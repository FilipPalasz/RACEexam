"use strict";

// Run initApp when the page loads
window.addEventListener("load", initApp);

// Function to kick off the app
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Letting us know the app is running
  const projects = await getProjects(); // Get the projects data
  console.log(projects); // Log the projects to the console
  displayProjectsGrid(projects); // Show the projects
}

// Function to fetch project data from the API
async function getProjects() {
  const response = await fetch(
    "https://examrasmus.filippalasz.dk/wp-json/wp/v2/projects?acf_format=standard"
  ); // Fetch the data from Wordpress
  const data = await response.json(); // Convert response to JSON
  return data;
}

// Function to display projects in a grid
function displayProjectsGrid(projects) {
  const projectsGrid = document.querySelector("#project-container"); // Get the grid element

  for (const project of projects) {
    // Loop through each project
    projectsGrid.insertAdjacentHTML(
      "beforeend",
      `    
    <article class="grid-item">
      <h2 id='title'>${project.acf.title}</h2>
      <div class="client-type-wrapper">
      <p id='client'>${project.acf.client}</p> 
      <p id='type'>${project.acf.type}</p>
    </div>
      <img id='image' src="${project.acf.image}" alt="${project.title.rendered}"></img>
      <p id='description'>${project.acf.description}</p>
      <div id="btn"><a href="${project.acf.link}" target="_blank"><button>View Project</button></a></div>
    </article>
    ` // Add each project to the grid
    );
  }
}
