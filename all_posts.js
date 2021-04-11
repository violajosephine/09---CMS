fetch(
  "https://kea21spring-0a0d.restdb.io/rest/schoolpost?q={}&sort=_created&dir=-1",
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
    handlePosts(data);
    console.log(data);
  });
1;

function handlePosts(data) {
  data.forEach(showPosts);
  console.log(data);
}

function showPosts(post) {
  if (post.approved == true) {
    console.log(post);
    //grab template
    const template = document.querySelector("template").content;
    //clone it
    const copy = template.cloneNode(true);
    //change content

    copy.querySelector("a").href = "a_post.html?id=" + post._id;
    copy.querySelector(".title").textContent = post.title;
    copy.querySelector(".username").textContent = "By " + post.username;
    copy.querySelector(".content").textContent = post.content;
    //grab parent
    const parent = document.querySelector("#allposts");
    //append child
    parent.appendChild(copy);
  }
}
