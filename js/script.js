/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the 'newElement' function
This function will create a new element based on requirements listed. 
*/

function newElement(element, classes) {
  //Build a new custom element, and add classes if provided.
  let newItem = document.createElement(element);
  let moreThanOne = Array.isArray(classes);
  if (classes) {
    if (moreThanOne) {
      for (let i = 0; i < classes.length; i++) {
        newItem.classList.add(classes[i]);
      }
    } else {
      newItem.className = classes;
    }
  }
  return newItem;
}

/* 
   Create the "performSearch" function
   This function will return a list of students that match the provided search query.
*/

function performSearch(search) {
  let students = data;
  let filtered = [];
  //Filter students based on user search query.
  for (const student of students) {
    const studentName =
      `${student.name.first} ${student.name.last}`.toLowerCase();
    const searchTerm = search.toLowerCase();
    const visible = studentName.includes(searchTerm);
    if (visible) {
      filtered.push(student);
    }
  }

  //pass filtered list of students to showPage, and update pagination.
  showPage(filtered);
  addPagination(filtered);
}

/* 
   Create the 'buildSearch' function
   This function will create a new search bar to filter students.
*/

function buildSearch() {
  //create new search bar including: input, button, and search button image.
  const header = document.querySelector(".header");
  const search = newElement("div", "student-search");
  const input = newElement("input");
  input.type = "text";
  input.placeholder = "Search by name...";
  const button = newElement("button");
  const buttonImg = newElement("img");
  buttonImg.src = "img/icn-search.svg";
  button.append(buttonImg);
  search.append(input, button);

  //add search bar to the header.
  header.insertAdjacentHTML("beforeend", search.outerHTML);

  //Set an event listener for searches submitted on the search bar by click or pressing the "enter" key.
  const searchInp = document.querySelector(".student-search");
  const searchBtn = searchInp.querySelector("button img");
  searchBtn.addEventListener("click", (e) => {
    const query = document.querySelector(".student-search input").value;
    performSearch(query);
  });
  searchInp.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      const query = document.querySelector(".student-search input").value;
      performSearch(query);
    }
  });
}

/*
   Create the `buildStudent` function
   This function will create a listing for each student referenced. 
*/

function buildStudent(student) {
  //create student listing
  let studentList = document.querySelector(".student-list");
  let listItem = newElement("li", ["student-item", "cf"]);
  listItem.setAttribute(
    "data-name",
    `${student.name.first} ${student.name.last}`
  );

  //add student picture, name, and email to listing.
  let details = newElement("div", "student-details");
  let image = newElement("img", "avatar");
  image.src = student.picture.thumbnail;
  image.alt = "Profile Picture";
  let name = newElement("h3");
  name.textContent = `${student.name.first} ${student.name.last}`;
  let email = newElement("span", "email");
  email.textContent = student.email;
  details.append(image, name, email);

  //add the date student joined, to listing.
  let joined = newElement("div", "joined-details");
  let joinDate = newElement("span", "date");
  joinDate.textContent = `Joined ${student.registered.date}`;
  joined.append(joinDate);

  //add the student listing to our overall list.
  listItem.append(details, joined);
  //add students to the page.
  studentList.append(listItem);
}

/*
   Create the 'showNoResults' function
   Show no results page and provide a "Go Back" button.
*/
function showNoResults() {
  let studentList = document.querySelector(".student-list");
  let noResults = `<div class='noResults'><span class='noResultsText'>Sorry no results matched your search!</span><span class='btnGoBack'>Go Back</span></div>`;
  studentList.innerHTML = noResults;

  const btn = document.querySelector(".btnGoBack");
  btn.addEventListener("click", (e) => {
    showPage(data, 1);
  });
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page = 1) {
  //set max students visible per page.
  let perPage = 9;
  let min = page * perPage - perPage;
  let max = page * perPage;

  // remove previous student listings from page.
  let studentList = document.querySelector(".student-list");
  studentList.innerHTML = "";

  // If no results are returned show notice and "go back" button.
  if (list.length <= 0) {
    showNoResults();
  }

  //For each student build a profile listing.
  for (let i = min; i >= min && i < max; i++) {
    let student = list[i];
    if (typeof student === "undefined") {
      return;
    }
    buildStudent(student);
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  //calculate pages available.
  let totalPages = Math.ceil(list.length / 9);

  //remove any old pagination buttons before creating new ones.
  let linkList = document.querySelector(".link-list");
  linkList.innerHTML = "";

  //for each page in totalpages, add a page button.
  for (let i = 1; i <= totalPages; i++) {
    let buttonContainer = newElement("li");
    let button = newElement("button");
    button.type = "button";
    if (i === 1) {
      button.className = "active";
    }
    button.textContent = i;
    buttonContainer.append(button);

    //add button to page.
    linkList.append(buttonContainer);
  }

  //Set an event listener for changing a page.
  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      //change page when user clicks on a page button.
      const buttons = document.querySelectorAll(".link-list li button");
      const newActive = e.target;
      showPage(data, newActive.textContent);
      //remove previously active button class, and add class to active page.
      for (const button of buttons) {
        button.className = "";
      }
      newActive.className = "active";
    }
  });
}

// Call functions
buildSearch();
showPage(data, 1);
addPagination(data);
