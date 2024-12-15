// start get elements from DOM
let theposts = document.getElementsByClassName("posts")[0];
let theUsers = document.getElementsByClassName("users")[0];
// console.log(theposts);
// console.log(theUsers);
let userId = 0;
// end get elements from DOM

// start getAllPosts request
function getAllPosts(callback) {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/posts");
  request.responseType = "json";
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/json");
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let response = request.response;
      //   console.log(response);
      //   return response;
      //   console.log("status is", request.status);
      callback(null, response); // Call the callback with the response
    } else {
      callback(new Error("Request failed: " + request.status)); // Call the callback with an error
    }
  };
}

getAllPosts(async function (error, posts) {
  if (error) {
    console.error(error);
  } else {
    // console.log(posts); // Logs the posts once the data is fetched
    // console.log(typeof posts);

    // create post and append it into posts
    for (post of posts) {
      crateElement("post", "title", "body", post.title, post.body, theposts);
    }
    // create post and append it into posts
  }
});
// end getAllPosts request

// start getAllusers request
function getAllUsrrs(callback) {
  let request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/json");
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let response = request.response;
      //   console.log(response);
      //   return response;
      //   console.log("status is", request.status);
      callback(null, response); // Call the callback with the response
    } else {
      callback(new Error("Request failed: " + request.status)); // Call the callback with an error
    }
    // let theUser = document.getElementsByClassName("user");
    // console.log(theUser);
  };
}

getAllUsrrs(async function (error, users) {
  if (error) {
    console.error(error);
  } else {
    // console.log(users); // Logs the posts once the data is fetched
    // console.log(typeof users);

    // create post and append it into posts
    for (user of users) {
      //   crateElement(user.name, user.email);
      crateElement2(
        "user",
        "name",
        "email",
        user.name,
        user.email,
        user.id,
        theUsers
      );
      // console.log(user);
    }
    // create post and append it into posts
  }
});

// end getAllusers request

function crateElement(class1, class2, class3, item1, item2, wholeItems) {
  let theParent = document.createElement("div");
  theParent.classList.add(class1); //post user

  let theName = document.createElement("div");
  theName.classList.add(class2); //title name
  let theNameText = document.createTextNode(item1);
  theName.appendChild(theNameText);
  theParent.appendChild(theName);

  let theBody = document.createElement("div");
  theBody.classList.add(class3); //body email
  let theBodyText = document.createTextNode(item2);
  theBody.appendChild(theBodyText);
  theParent.appendChild(theBody);
  wholeItems.appendChild(theParent);
}

function crateElement2(class1, class2, class3, item1, item2, id, wholeItems) {
  let theParent = document.createElement("div");
  theParent.classList.add(class1); //post user

  let theName = document.createElement("div");
  theName.classList.add(class2); //title name
  let theNameText = document.createTextNode(item1);
  theName.appendChild(theNameText);
  theParent.appendChild(theName);

  let theBody = document.createElement("div");
  theBody.classList.add(class3); //body email
  let theBodyText = document.createTextNode(item2);
  theBody.appendChild(theBodyText);
  theParent.appendChild(theBody);
  wholeItems.appendChild(theParent);

  // Add click event listener
  theParent.addEventListener("click", function () {
    // Remove previous selection (optional)
    let selectedUsers = document.getElementsByClassName("selected");
    for (let user of selectedUsers) {
      user.classList.remove("selected");
    }

    // Highlight the selected user
    theParent.classList.add("selected");

    // Log user details or perform any action
    // console.log(`Selected User: ${item1}, Email: ${item2}`);
    userId = id;
    // console.log(`Selected User: ${id}`);
    console.log(`Selected User: ${id}`); //userId
    getAllPostsForSpacificUser(id, function (error, posts) {
      //userId
      if (error) {
        console.error(error);
      } else {
        // Clear existing posts
        theposts.innerHTML = ""; // Clear previous posts
        for (let post of posts) {
          crateElement(
            "post",
            "title",
            "body",
            post.title,
            post.body,
            theposts
          );
        }
      }
    });
    // console.log(userId);
  });

  wholeItems.appendChild(theParent);
  //   console.log(userId); 0
}
// start get spacific post

// start getAllPosts filter request
function getAllPostsForSpacificUser(id, callback) {
  let request = new XMLHttpRequest();
  //   request.open("GET", "https://jsonplaceholder.typicode.com/posts?userId=1");
  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  request.responseType = "json";
  request.setRequestHeader("Accept", "application/json");
  request.setRequestHeader("Content-Type", "application/json");
  request.send();
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let response = request.response;
      // console.log(response);
      //   return response;
      //   console.log("status is", request.status);
      callback(null, response); // Call the callback with the response
    } else {
      callback(new Error("Request failed: " + request.status)); // Call the callback with an error
    }
  };
}

getAllPostsForSpacificUser(async function (error, posts) {
  if (error) {
    console.error(error);
  } else {
    // console.log(posts); // Logs the posts once the data is fetched
    // console.log(typeof posts);

    // create post and append it into posts
    for (post of posts) {
      crateElement("post", "title", "body", post.title, post.body, theposts);
    }
    // create post and append it into posts
  }
});
// end getAllPosts filter request
// end get spacific post
