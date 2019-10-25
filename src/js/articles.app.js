var articlesApp = (function () {

  function viewArticles() {

    let uri = `${window.location.origin}/api/articles`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function () {
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let articles = data.articles;
      let table = '';
      let rows = '';

      //Loop each article record into it's own HTML table row, each article should
      //have a link a article view
      for (let i = 0; i < articles.length; i++) {
        rows = rows + `<tr>
                <td>
                  <a href="#view-${articles[i]['_id']}">${users[i]['last_name']}, ${users[i]['first_name']}</a>
                </td>
                <td>${users[i]['username']}</td>
                <td>${users[i]['email']}</td>
              </tr>`;
      }

      //Create a articles panel, add a table to the panel, inject the rows into the
      //table
      table = `<div class="card">
              <div class="card-header clearfix">
                <h2 class="h3 float-left">Articles</h2>
                <div class="float-right">
                  <a href="#create" class="btn btn-primary">New Article</a>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered">
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Username</td>
                      <td>Email</td>
                    </tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            </div>`;

      //Append the HTML to the #app
      app.innerHTML = table;
    }
  }

  function createArticle() {
    var app = document.getElementById('app');

    var form = `  
            <div class="card">
              <div class="card-header clearfix">
                <h2 class="h3 float-left">Create a New Article</h2>
                <div class="float-right">
                  <a href="#" class="btn btn-primary">Cancel</a>
                </div>
              </div>
              <div class="card-body">
              <form id="createUser" class="card-body">
                  <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
      
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="first_name">First Name</label>
                      <input type="text" id="first_name" name="first_name" class="form-control" required>
                    </div>
      
                    <div class="form-group col-md-6">
                      <label for="last_name">Last Name</label>
                      <input type="text" id="last_name" name="last_name" class="form-control" required>
                    </div>
                  </div>
      
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="username">Username</label>
                      <input type="text" id="username" name="username" class="form-control" required>
                    </div>
      
                    <div class="form-group col-md-6">
                      <label for="email">Email</label>
                      <input type="email" id="email" name="email" class="form-control" required>
                    </div>
                  </div>
      
                  <div class="text-right">
                    <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                  </div>
                </form>
              </div>
            </div>
        `;

    app.innerHTML = form;
    // processRequest('createUser', '/api/articles', 'POST');
  }

  function viewArticle(id) {

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function () {
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let card = '';

      card = `<div class="card">
            <div class="card-header clearfix">
              <h2 class="h3 float-left">${data.user.first_name} ${data.user.last_name}</h2>
              <div class="float-right">
                <a href="#edit-${data.user._id}" class="btn btn-primary">Edit</a>
              </div>
            </div>
            <div class="card-body">
              <div>${data.user.username}</div>
              <div>${data.user.email}</div>
            </div>
          </div>`;

      app.innerHTML = card;
    }
  }

  function editArticle(id) {

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function () {
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);

      var form = `
            <div class="card">
              <div class="card-header clearfix">
                <h2 class="h3 float-left">Edit</h2>
                <div class="float-right">
                  <a href="#" class="btn btn-primary">Cancel</a>
                </div>
              </div>
              <div class="card-body">
                <form id="editUser" class="card-body">
                  <input type="hidden" id="_id" name="_id" value="${data.article._id}">
                  <div id="formMsg" class="alert alert-danger text-center">Your form has errors</div>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="first_name">First Name</label>
                      <input type="text" id="first_name" name="first_name" class="form-control" value="${data.user.first_name}" required>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="last_name">Last Name</label>
                      <input type="text" id="last_name" name="last_name" class="form-control" value="${data.user.last_name}" required>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label for="username">Username</label>
                      <input type="text" id="username" name="username" class="form-control" value="${data.user.username}" required>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="email">Email</label>
                      <input type="email" id="email" name="email" class="form-control" value="${data.user.email}" required>
                    </div>
                  </div>
                  <div class="text-right">
                    <input type="submit" value="Submit" class="btn btn-lg btn-primary btn-sm-block">
                  </div>
                </form>
              </div>
            </div>
            <div>
            <a href="#delete-${data.article._id}" class="text-danger">Delete</a>
          </div>
          `;

      app.innerHTML = form;
      processRequest('editArticle', '/api/articles', 'PUT');
    }
  }

  function processRequest(formId, url, method) {
    let form = document.getElementById(formId);
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let formData = new FormData(form);
      let uri = `${window.location.origin}${url}`;
      let xhr = new XMLHttpRequest();
      xhr.open(method, uri);

      xhr.setRequestHeader(
        'Content-Type',
        'application/json; charset=UTF-8'
      );

      let object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      xhr.send(JSON.stringify(object));
      xhr.onload = function () {
        let data = JSON.parse(xhr.response);
        if (data.success === true) {
          window.location.href = '/';
        } else {
          document.getElementById('formMsg').style.display = 'block';
        }
      }
    });
  }

  function deleteView(id) {

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function () {
      let app = document.getElementById('app');
      let data = JSON.parse(xhr.response);
      let card = '';

      card = `<div class="card bg-transparent border-danger text-danger bg-danger">
          <div class="card-header bg-transparent border-danger">
            <h2 class="h3 text-center">Your About to Delete a Article</h2>
          </div>
          <div class="card-body text-center">
            <div>
              Are you sure you want to delete
              <strong>${data.user.first_name} ${data.user.last_name}</strong>
            </div>
    
            <div>Username: <strong>${data.user.username}</strong></div>
            <div>Email: <strong>${data.user.email}</strong></div>
    
            <div class="text-center">
              <br>
              <a onclick="usersApp.deleteUser('${data.article._id}');" class="btn btn-lg btn-danger text-white">
              Yes delete ${data.user.username}
            </a>
            </div>
          </div>
        </div>`;

      app.innerHTML = card;
    }
  }

  function deleteArticle(id) {

    let uri = `${window.location.origin}/api/articles/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', uri);

    xhr.setRequestHeader(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    xhr.send();

    xhr.onload = function () {
      let data = JSON.parse(xhr.response);
      if (data.success === true) {
        window.location.hash = '#';
      } else {
        alert('Unknown error, the article could not be deleted');
      }
    }
  }

  return {
    load: function () {
      let hash = window.location.hash;
      let hashArray = hash.split('-');

      switch (hashArray[0]) {
        case '#create':
          createArticle();
          processRequest('createArticle', '/api/articles', 'POST');
          break;

        case '#view':
          viewArticle(hashArray[1]);
          break;

        case '#edit':
          editArticle(hashArray[1]);
          break;

        case '#delete':
          deleteView(hashArray[1]);
          break;

        default:
          viewArticles();
          break;
      }
    },

    deleteArticle: function (id) {
      deleteArticle(id);
    }
  }

})();

usersApp.load();

window.addEventListener("hashchange", function () {
  usersApp.load();
});