$(function () {
  // your code here
  // $.ajax({});
  let currentPage = 1;
  fetchUserDateById(currentPage);
  fetchPostDateById(currentPage);
  fetchTodoDateById(currentPage);

  $(".container header")
    .find("button:nth-child(2)")
    .on("click", function () {
      if (currentPage >= 30) {
        currentPage = 0;
      }
      currentPage++;
      fetchUserDateById(currentPage);
      fetchPostDateById(currentPage);
      fetchTodoDateById(currentPage);
      console.log(currentPage);
    });

  $(".container header")
    .find("button:nth-child(1)")
    .on("click", function () {
      currentPage--;
      fetchUserDateById(currentPage);
      fetchPostDateById(currentPage);
      fetchTodoDateById(currentPage);
      console.log(currentPage);
    });

  $(".posts h3").on("click", function () {
    $(this).next().slideToggle();
  });

  $(".todos h3").on("click", function () {
    $(this).next().slideToggle();
  });
});

function fetchUserDateById(id) {
  $.ajax({
    url: `https://dummyjson.com/users/${id}`,
    type: "GET",
    success: function (res) {
      const userData = res;
      buildUserInfo(userData);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function fetchPostDateById(id) {
  $.ajax({
    url: `https://dummyjson.com/users/${id}/posts`,
    type: "GET",
    success: function (res) {
      const postData = res.posts;
      buildPostInfo(postData);
      console.log(postData);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function fetchTodoDateById(id) {
  $.ajax({
    url: `https://dummyjson.com/users/${id}/todos`,
    type: "GET",
    success: function (res) {
      const todoData = res.todos;
      buildTodoInfo(todoData);
      console.log(todoData);
    },
    error: function (err) {
      console.error(err);
    },
  });
}

function buildUserInfo(arr) {
  const img = $(".image");
  img.attr("src", `${arr.image}`);

  const infoContent = $(".info__content");
  // firstName, lastName, age, email, phone
  infoContent.html(
    `<h2>${arr.firstName} ${arr.lastName} </h2> <p>Age: ${arr.age}</p> <p>Email: ${arr.email}</p> <p>Phone: ${arr.phone}</p>`,
  );

  const postTitle = $(".posts h3");
  postTitle.text(`${arr.firstName}'s Posts`);

  const todoTitle = $(".todos h3");
  todoTitle.text(`${arr.firstName}'s To Dos`);
}

function buildPostInfo(arr) {
  // title, body
  const postInfo = $(".posts ul");

  if (arr.length === 0) {
    postInfo.text("User has no posts");
  } else {
    let liHtml = "";
    arr.forEach((el) => {
      liHtml += `<li style="font-weight: bold; text-decoration:underline">${el.title}</li> <li>${el.body}</li>`;
    });
    postInfo.html(liHtml);
  }
  $(".posts ul > li:nth-child(odd)").on("click", function () {
    const modal = $("<div></div>");
    modal.addClass("modal");

    const overlay = $('<div class="overlay"></div>');
    let modalHtml = `<h3>${$(this).text()}</h3>
    <p>${$(this).next().text()}</p>
    <button class='btn-close'>Close Modal</button>`;

    modal.html(modalHtml);
    $("body").append(modal);
    $("body").append(overlay);

    $(".btn-close").on("click", function () {
      $(this).parent().hide();
      $(".overlay").hide();
    });
  });
}

function buildTodoInfo(arr) {
  const todoInfo = $(".todos ul");
  if (arr.length === 0) {
    todoInfo.text("User has no todos");
  } else {
    let liHtml = "";
    arr.forEach((el) => {
      liHtml += `<li>${el.todo}</li>`;
    });
    todoInfo.html(liHtml);
  }
}
