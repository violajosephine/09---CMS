const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("no reload");
  console.log(form.elements.username.value);
  console.log(form.elements.title.value);
  console.log(form.elements.content.value);
  document.querySelector("button[type=submit").disabled = true;

  const payload = {
    title: form.elements.title.value,
    username: form.elements.username.value,
    content: form.elements.content.value,
  };

  //store the post
  fetch("https://kea21spring-0a0d.restdb.io/rest/schoolpost", {
    method: "POST",
    headers: {
      "x-apikey": "60534ad0ff8b0c1fbbc28be2",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      document.querySelector("button[type=submit").disabled = false;
      form.elements.username.value = "";
      form.elements.title.value = "";
      form.elements.content.value = "";
      document.querySelector("h1").innerHTML =
        "Thank you for your contribution! <br>Come back to see it in an hour.";
      document.querySelector("#go_back").classList.remove("hidden");
    })
    .catch((err) => {
      console.error(err);
    });
});
