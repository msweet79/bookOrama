//Sample code and notes
/*
var titles = document.getElementsByClassName('title');
//titles is not an array.  It is an HTML collection
//console.log(Array.isArray(titles));  //returns false
//console.log(Array.isArray(Array.from(titles)));  //convert to an arry and return true

//.forEach is an array method.  We need to convert titles to an array with the Array.from() method
Array.from(titles).forEach(function(item){
//  console.log(item);
})

//grap an item by id using the #
const wrap =  document.querySelector('#wrapper');
//console.log(wrap);

//grap a psudo class item from a list using mulitple identifiers
const wmf = document.querySelector('#book-list li:nth-child(2) .name');
//console.log(wmf);

//Grab all spans.  This does not work.  Only grabs the first one
var books = document.querySelector('#book-list li .name');
//console.log(books);

var booksAll = document.querySelectorAll('#book-list li .name');
console.log(booksAll);

//log all books individually to the console.
//Do not need to change to an array.  this returns a node list.  Function methods work on node lists
//Array.from(booksAll).forEach(function(book){
//Instead write this:
booksAll.forEach(function(book){
  console.log(book);
  console.log(book.textContent);
  //If we want to over write the text
  //book.textContent = 'test';
  //console.log(book.textContent);
  //If we want to add text
  book.textContent += ' (book title) ';
  //console.log(book.textContent);
});

const bookList = document.querySelector('#book-list');
console.log(bookList.innerHTML);
//bookList.innerHTML='<h2>Books and more books</h2>';
bookList.innerHTML+='<p>This is how you add HTML</p>';

const banner = document.querySelector('#page-banner');
console.log('#page-banner node type is: ', banner.nodeType);
//Returns 1.  Need to look up what those nodes mean
console.log('#page-banner node name is: ', banner.nodeName);
//Return div
console.log('#page-banner node hasChildNodes: ', banner.hasChildNodes());
//the hasChildNodes method returns true

const clonedBanner = banner.cloneNode(true);
console.log(clonedBanner);
//returns all child in the banner.  If switch to false you do not get nested nodes

const bookList = document.querySelector('#book-list');
//get the parent of the book list (which is wrapper)
console.log('the parent node is:', bookList.parentNode);
//get the parent of the parent element (which is body)
console.log('the parent node is:', bookList.parentElement.parentElement);
//get the children of the book list (also includes the line breaks)
console.log(bookList.childNodes);
//get the children of the book list (does not include line breaks)
console.log(bookList.children);

const bookList = document.querySelector('#book-list');

console.log('book-list the next sibling is:', bookList.nextSibling);
console.log('book-list the next element sibling is:', bookList.nextElementSibling);

console.log('book-list the previous sibling is:', bookList.previousSibling);
console.log('book-list the previous element sibling is:', bookList.previousElementSibling);

//Chain methods together
//Find the previous element (header) then search in header for p. Then append a line break and add the text
bookList.previousElementSibling.querySelector('p').innerHTML +='<br />Too cool for everyone else!'

//add an event listener to h2
var h2 = document.querySelector('#book-list h2');
h2.addEventListener('click', function(e) {
  console.log(e.target);
  console.log(e);

})

//this is not dynamic code.  Will break when more books are added
//Create the delete button finctionality
var btns = document.querySelectorAll('#book-list .delete');
//since its a node list, we do not need to make it an array, but can
Array.from(btns).forEach(function(btn){
  //add the event listener click
  btn.addEventListener('click', function(e){
    //creat the target
    const li = e.target.parentElement;
    //select the parent element the remove its child
    li.parentNode.removeChild(li)
  })
})

//grab the fist chils in the ul lists
var book = document.querySelector('li:first-child .name');
//get the name of the clss of the first-child of the li list
book.getAttribute('class');
//set an attribute
book.setAttribute('class', 'name-2');
//check to see if it has an attribute
book.hasAttribute('class');
//returns true
book.hasAttribute('class');
//returns flase
//remove the class
book.removeAttribute('class');
*/


//better way to write the code in case we add more books
//select the book list ul
const list = document.querySelector('#book-list ul');
const forms = document.forms;
//delete a book
//add the event listener
    //Original code
    //list.addEventListener('click', function(e) {
//Re-write in arrow forms
list.addEventListener('click', (e) => {
  //check to see if the target (what we clicked) was the delete button
  if(e.target.className === 'delete'){
    //select the target (the parent of the delete button)
    const li = e.target.parentElement;
    //remove the line item
    list.removeChild(li);
  }
})

//Add books
//to grab forms, you need to use [] since there can be more than 1.  Use the form name to make the code more readable
const addForm = document.forms['add-book'];
//add the event listener
addForm.addEventListener('submit', function(e){
  //prevent the form default action, which is to refresh the page
  e.preventDefault();
  //create the new element
  //grab the text value from the input field of the form.  Make sure to use ' " " ' so they don't cancel each other out
  const value = addForm.querySelector('input[type="text"]').value;
  //Check to make sure you are grabbing the input text
  //console.log(value);
  //creat elements that create the book entry
  const li = document.createElement('li');
  const bookName = document.createElement('span');
  const deleteBtn = document.createElement('span');

//add content to the book list and the delete button
  bookName.textContent = value;
  deleteBtn.textContent = 'delete';

//add classes for the css style
bookName.classList.add('name');
deleteBtn.classList.add('delete');

//looking at the structure of the HTML, we see that the span is nested in the li and the li in the ul
//we need to append the span to the li then li to ul
//order of how we append makes a difference
  li.appendChild(bookName);
  li.appendChild(deleteBtn);
  list.appendChild(li);

});

//hide book list
const hideBox = document.querySelector('#hide');
hideBox.addEventListener('change', function(e) {
  if(hideBox.checked) {
    list.style.display = "none";
  } else {
    list.style.display = "initial";
  }
});

//filter books from the search bar
//grab the user input of the search box
const searchBar = document.forms['search-books'].querySelector('input');
searchBar.addEventListener('keyup', function(e) {
  //the target is value of the search-books input.  Need to set to lower case to compare to lower case otherwise they are not equal
  const term = e.target.value.toLowerCase();
  const books = list.getElementsByTagName('li');
  //books is an HTML list so we need to change to an array
  Array.from(books).forEach(function(book) {
    //want to compare it to the title, se we want the first element of the li
    const title = book.firstElementChild.textContent;
    //dont want case to be an issue when comparing.  If its not part of the title then it gives a value of -1
    if(title.toLowerCase().indexOf(term) != -1) {
      book.style.display = 'block';
    } else {
      book.style.display = 'none';
    }
  });
});

//Adding functionality to the tabbed content at the bottom of the page
const tabs = document.querySelector('.tabs');
const panels = document.querySelectorAll('.panel');
tabs.addEventListener('click', function(e) {
  if(e.target.tagName == "LI") {
    //dataset is set to target because that is what we called it in the HTML
    const targetPanel = document.querySelector(e.target.dataset.target);
//don not need to turn this into an arry because the cosnt panels line returns a node list
    Array.from(panels).forEach(function(panel) {
      if(panel == targetPanel){
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });
  }
});
