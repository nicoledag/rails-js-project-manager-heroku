
  $(() => {
      console.log( "ready!" );
      bindClickHandlers()
      dateGreeting()
  })

  const dateGreeting = () => {
    let d = new Date();
    let date = $("#date").innerHTML = "<h3>Today's date is " + d.toDateString() + "</h3>"
    $('#date').append(date)
  }

  const bindClickHandlers = () => {
    $('button#post-data-all-projects').one('click', e => {
      e.preventDefault()
      getAllProjects()
    })

    $('button#post-data-open-projects').one('click', e => {
      e.preventDefault()
      getOpenProjects()
    })

    $('button#post-data-completed-projects').one('click', e => {
      e.preventDefault()
      getCompletedProjects()
    })

    // Event handler to get a project and comment via AJAX.
     $(document).on('click', ".show_link", function(e) {
        e.preventDefault()
        $('#app-container').html('')
        let id = $(this).attr('data-id')
        fetch(`/projects/${id}.json`)
        .then(res => res.json())
        .then(project => {
        let newProject = new Project(project)
        // console.log(newProject);

        let postHtml = newProject.formatShow()
        $('#app-container').append(postHtml)

        let projectComments = newProject.comments
        projectComments.forEach(comment => {
        let newComment = new Comment(comment);
        // console.log(newComment);

        let postHtmlComment = newComment.formatComment()
        // console.log(postHtml);
        $('#app-container').append(postHtmlComment)

        })
       })
     })

     // Event handler to submit form via AJAX.
     $(".new_project").on("submit", function(e) {
         e.preventDefault()
         // console.log(this);
         // "this" is the form data which we serialize to json format.
         const values = $(this).serialize()
         // console.log(values);
         // .post makes post request to our back end. create action uses post.
         // then we chain a method .done which takes in a callback function that gives
         // us the data that is returned to us by the server.
         $.post("/projects", values).done (function(data) {
         // console.log(data);
         $("#app-container").html("")
         const newProject = new Project(data)
         const addHtml = newProject.formatShow()
         $("#app-container").html(addHtml)
       })
     })
  }


  const getAllProjects = () => {
    fetch(`/projects.json`)
    .then(res => res.json())
    .then(projects => {
           const allProjects = projects
           .sort(function(a,b){
             let dateA = new Date(a.created_at), dateB = new Date(b.created_at);
             return dateB - dateA;
           })
           allProjects.map(project => {
             let newProject = new Project(project)
             let postHtml = newProject.formatIndex()
             $('.all-data').append(postHtml)
           })
       })
   }

   const getOpenProjects = () => {
     fetch(`/projects.json`)
     .then(res => res.json())
     .then(projects => {
            const openProjects = projects
            .filter(project => {
              return project.completion_date === null;
            })
            .sort(function(a,b){
              let dateA = new Date(a.target_completion_date), dateB = new Date(b.target_completion_date);
              return dateA - dateB;
            })
            // console.log(openProjects);
            openProjects.map(project => {
              let newProject = new Project(project)
              // console.log(newProject);
              let postHtml = newProject.formatIndex()
              // console.log(postHtml);
              $('.open-data').append(postHtml)
            })
        })
    }


    const getCompletedProjects = () => {
      fetch(`/projects.json`)
      .then(res => res.json())
      .then(projects => {
             // console.log(projects);
             const completedProjects = projects
             .filter(project => {
               return project.completion_date !== null;
             })
             .sort(function(a,b){
               let dateA = new Date(a.completion_date), dateB = new Date(b.completion_date);
               return dateB - dateA;
             })
             completedProjects.map(project => {
               let newProject = new Project(project)
               let postHtml = newProject.formatIndex()
               $('.completed-data').append(postHtml)
             })
         })
     }

    class Comment {
      constructor(comment){
         this.content = comment.content
         this.id = comment.id
         this.created_at = comment.created_at
     }

     formatComment() {
       let commentCreatedAt = new Date(`${this.created_at}`).toLocaleString().split(',')[0]

       let postHtmlComment = `
        <br>
        <h2>Comment:  ${this.content}</h2>
        <h2> Date Created:  ${commentCreatedAt} </h2>
        <h3><a href="/comments/${this.id}/edit" </a>Edit Comment</h3>
        <br>

       `
       return postHtmlComment

     }

}

   class Project {
    constructor(project) {
       this.name = project.name
       this.id = project.id
       this.description = project.description
       this.target_completion_date = project.target_completion_date
       this.completion_date = project.completion_date
       this.company_name = project.client.company_name
       this.comments = project.comments
       this.username = project.user.username
       this.created_at = project.created_at
   }


    formatIndex() {
      let formatTargetDate = new Date(`${this.target_completion_date}`).toLocaleString().split(',')[0]

      if (this.completion_date === null) {
        let postHtml = `
          <tr>
            <td><a href="/projects/${this.id}" data-id="${this.id}" class="show_link">${this.name} </a></td>
            <td>${this.description} </td>
            <td>${this.company_name} </td>
            <td>${formatTargetDate} </td>
            <td>${this.completion_date = " "} </td>
          </tr>
        `
        return postHtml

      } else {

        let formatCompleteDate = new Date(`${this.completion_date}`).toLocaleString().split(',')[0]

        let postHtml = `
          <tr>
            <td><a href="/projects/${this.id}" data-id="${this.id}" class="show_link">${this.name} </a></td>
            <td>${this.description} </td>
            <td>${this.company_name} </td>
            <td>${formatTargetDate} </td>
            <td>${formatCompleteDate} </td>
          </tr>
        `
        return postHtml
      }
    }


    formatShow() {
      let formatTargetDate = new Date(`${this.target_completion_date}`).toLocaleString().split(',')[0]

      if (this.completion_date === null) {

      let postHtml = `
        <h2>Project</h2>
        <table id="table-js" >
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Client Name</th>
            <th>Manager</th>
            <th>Target Completion Date</th>
            <th>Completion Date</th>
            <th>Edit</th>
          </tr>
          <tr>
            <td>${this.name}</td>
            <td>${this.description} </td>
            <td>${this.company_name} </td>
            <td>${this.username} </td>
            <td>${formatTargetDate} </td>
            <td>${this.completion_date = ""} </td>
            <td><a href="/projects/${this.id}/edit" </a>Edit Project</td>
          </tr>
        </table>
        <br>
        <br>

        <h2>Project Comments</h2>
        <h3><a href="/projects/${this.id}/comments/new">New Comment</a><h/3>
        <br>

      `
      return postHtml

      } else {

        let formatCompleteDate = new Date(`${this.completion_date}`).toLocaleString().split(',')[0]

        let postHtml = `
          <h2>Project</h2>
          <table id="table-js" >
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Client Name</th>
              <th>Manager</th>
              <th>Target Completion Date</th>
              <th>Completion Date</th>
              <th>Edit</th>
            </tr>
            <tr>
              <td>${this.name}</td>
              <td>${this.description} </td>
              <td>${this.company_name} </td>
              <td>${this.username} </td>
              <td>${formatTargetDate} </td>
              <td>${formatCompleteDate} </td>
              <td><a href="/projects/${this.id}/edit" </a>Edit Project</td>
            </tr>
          </table>

        <br>
        <br>

        <h2>Project Comments</h2>
        <h3><a href="/projects/${this.id}/comments/new">New Comment</a><h3>
        <br>
      `
      return postHtml

      }
    }

  }
