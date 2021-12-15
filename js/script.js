/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
let maxStudents = 9;


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
Create the 'newElement' function
This function will create a new element based on requirements listed. 
*/

function newElement(element) {
   let newItem = document.createElement(element);
   return newItem;
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage() {
   // Get students from "data" object.
   let students = data;
   //For each student build a listing. 
   for (let i = 0; i < maxStudents; i++) {
      let student = students[i];
      let listItem = newElement('li');
      listItem.classList.add('student-name', 'cf');

         let details = newElement('div');
            let image = newElement('img');
            image.className = 'avatar';
            image.src = student.picture.thumbnail;
            image.alt = 'Profile Picture';
            let name = newElement('h3');
            name.textContent = `${student.name.first} ${student.name.last}`;
            let email = newElement('span');
            email.className = 'email';
            email.textContent = student.email;
         details.append(image, name, email);

         let joined = newElement('div');
         joined.className = 'joined-details';
            let joinDate = newElement('span');
            joinDate.textContent = `Joined ${student.registered.date}`;
         joined.append(joinDate);

      listItem.append(details, joined); 
   }
   // <li class="student-item cf">
   //    <div class="student-details">
   //       <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
   //       <h3>Ethel Dean</h3>
   //       <span class="email">ethel.dean@example.com</span>
   //    </div>
   //    <div class="joined-details">
   //    <span class="date">Joined 12-15-2005</span>
   //    </div>
   // </li>

   //Student data example
   // {
   //    name: {
   //      title: "Miss",
   //      first: "Ethel",
   //      last: "Dean",
   //    },
   //    email: "ethel.dean@example.com",
   //    registered: {
   //      date: "12-15-2005",
   //      age: 15,
   //    },
   //    picture: {
   //      large: "https://randomuser.me/api/portraits/women/25.jpg",
   //      medium: "https://randomuser.me/api/portraits/med/women/25.jpg",
   //      thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
   //    },
   //  },



}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
showPage();