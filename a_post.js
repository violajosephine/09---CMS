const urlParams = new URLSearchParams(window.location.search);
//in the url grab id and store them under id
const id = urlParams.get("id");
console.log(id);

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const payload = {
    username: form.elements.username.value,
    content: form.elements.content.value,
    time: Date.now,
  };
  console.log("no reload");
  console.log(form.elements.username.value);

  console.log(form.elements.content.value);
  document.querySelector("button[type=submit").disabled = true;

  //store the comment
  fetch(
    "https://kea21spring-0a0d.restdb.io/rest/schoolpost/" + id + "/comments",
    {
      method: "POST",
      headers: {
        "x-apikey": "60534ad0ff8b0c1fbbc28be2",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )
    .then((res) => res.json())
    .then((fresh) => {
      console.log(fresh);
      document.querySelector("button[type=submit").disabled = false;
      form.elements.username.value = "";
      form.elements.content.value = "";
      //populate comment
      const template = document.querySelector("template").content;
      const copy = template.cloneNode(true);

      copy.querySelector(".comment_user").textContent = "By " + fresh.username;
      copy.querySelector(".comment_content").textContent = fresh.content;

      const parent = document.querySelector("#comments");
      parent.appendChild(copy);
    })
    .catch((err) => {
      console.error(err);
    });
});

fetch(
  "https://kea21spring-0a0d.restdb.io/rest/schoolpost/" +
    id +
    "&?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "60534ad0ff8b0c1fbbc28be2",
    },
  }
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    showPost(data);
    console.log(data);
  });
function showPost(post) {
  console.log(post);

  document.querySelector("#title").textContent = post.title;
  document.querySelector("#username").textContent = "By " + post.username;
  document.querySelector("#content").textContent = post.content;

  post.comments.forEach((comment) => {
    console.log(comment);
    const template = document.querySelector("template").content;

    //clone it
    const copy = template.cloneNode(true);
    //change content

    copy.querySelector(".comment_user").textContent = "By " + comment.username;

    copy.querySelector(".comment_content").textContent = comment.content;
    // //   copy.querySelector(".post_title").textContent = newdata.title;

    //append child
    const parent = document.querySelector("#comments");
    parent.appendChild(copy);
  });

  if (post.comments.length === 0) {
    const template = document.querySelector("template").content;

    const copy = template.cloneNode(true);
    copy.querySelector(".comment_content").textContent =
      "No comments here yet. Be the first one to share:)";

    const parent = document.querySelector("#comments");
    parent.appendChild(copy);
  }
}
