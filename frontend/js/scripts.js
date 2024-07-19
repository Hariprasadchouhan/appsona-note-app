$(document).ready(function () {
  $("#loginBtn").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();
    $.post("/api/login", { username, password }, function (data) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    });
  });

  $("#registerBtn").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();
    $.post("/api/register", { username, password }, function (data) {
      alert("User registered!");
    });
  });

  $("#logout").click(function () {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });

  $("#addNote").click(function () {
    const title = prompt("Enter note title");
    const content = prompt("Enter note content");
    const token = localStorage.getItem("token");
    $.ajax({
      url: "/api/notes",
      type: "POST",
      headers: { Authorization: token },
      data: { title, content },
      success: function (data) {
        loadNotes();
      },
    });
  });

  const loadNotes = () => {
    const token = localStorage.getItem("token");
    $.ajax({
      url: "/api/notes",
      type: "GET",
      headers: { Authorization: token },
      success: function (notes) {
        $("#notes").empty();
        notes.forEach((note) => {
          $("#notes").append(`
                        <div class="note">
                            <div class="note-title">${note.title}</div>
                            <div class="note-content">${note.content}</div>
                        </div>
                    `);
        });
      },
    });
  };

  if (window.location.pathname.endsWith("index.html")) {
    loadNotes();
  }
});
