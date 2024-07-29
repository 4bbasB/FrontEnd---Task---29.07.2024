// Task 1

// let githubUser = document.getElementById("githubUser");
// let githubInput = document.getElementById("githubInput")
// let githubBtn = document.getElementById("githubBtn")

// const GITHUB_URL = " https://api.github.com/users/";

// githubBtn.addEventListener("click",function(e){
//   e.preventDefault();

//   let inputValue = githubInput.value;

//   fetch( GITHUB_URL + inputValue )
//     .then(reponse => reponse.json())
//     .then( data => {
//       githubUser.innerHTML = `
//           <img src="${data.avatar_url}" class="card-img-top" alt="...">
//           <div class="card-body">
//             <h5 class="card-title">${data.bio}</h5>
//             <p class="card-text">${data.name}</p>
//           </div>
//           <ul class="list-group list-group-flush">
//             <li style="cursor: pointer" id="followers" class="list-group-item">Followers: ${data.followers}</a>
//             <li style="cursor: pointer" id= "following" class="list-group-item">Following: ${data.following}</a>
//             <li class="list-group-item">Public repos: ${data.public_repos}</li>
//           </ul>
//           <div class="card-body">
//             <a href="${data.html_url}" class="card-link">Github Profile</a>
//             <a href= "${data.avatar_url}" download class="card-link">Download image</a>
//           </div>
//       `

//      let followers = document.getElementById("followers")

//      followers.addEventListener("click" , function() {
//       fetch(GITHUB_URL + inputValue + "/followers")
//         .then(response => response.json())
//         .then(followersData => {
//           let followersList = '';
//           followersData.forEach(followers => {
//             followersList += `<li>${followers.login}</li>`
//           })
//           document.getElementById("details").innerHTML = `
//           <h4>Following:</h4>
//           <ul>${followersList}</ul>
//           `
//         })
//      })

//      document.getElementById("following").addEventListener("click", function () {
//       fetch(GITHUB_URL + inputValue + "/following")
//         .then(response => response.json())
//         .then(followingData => {
//           let followingList = '';
//           followingData.forEach(following => {
//             followingList += `<li>${following.login}</li>`;
//           });
//           document.getElementById("details").innerHTML = `
//             <h6>Following:</h6>
//             <ul>${followingList}</ul>
//           `;
//         });
//     });

//     })
//   })

// Task 2

const TVMAZE_API = "https://api.tvmaze.com/shows";
let moviesDiv = document.getElementById("moviesDiv");
let detailDiv = document.getElementById("detailDiv");

axios.get(TVMAZE_API).then((response) => {
  response.data.forEach((movie) => {
    moviesDiv.innerHTML += `
      <div class="col-md-3">
        <div class="card" style="width: 18rem; margin-bottom: 30px">
          <img src="${movie.image.medium}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${movie.name}</h5>
            <p class="card-text">Premiere: ${movie.premiered}</p>
          </div>
         <ul class="list-group list-group-flush">
          <li class="list-group-item">IMDB Rating: ${movie.rating.average}</li>
          <li class="list-group-item">Genre: ${movie.genres[0]}</li>
          <li class="list-group-item">Language: ${movie.language}</li>
        </ul>
        <div class="card-body">
          <a href="${movie.url}" class="btn btn-primary">Go to website</a>
          <button class="btn btn-success" onclick="showDetail(${movie.id})" >Go to detail</button>
        </div>
        </div>
      </div>
      `;
  });
});

function showDetail(movieId) {
  axios.get(`${TVMAZE_API}/${movieId}`).then((response) => {
    let movie = response.data;
    moviesDiv.style.display = "none";
    detailDiv.style.display = "block";
    detailDiv.innerHTML = `
        <div class="detailCard" style="display: flex; justify-content: center;">
        <img class="movieImg" src="${movie.image.original}" alt="" style = "width: 35%">
        <div class="movieDetails" style = "padding: 40px">
          <h1 class="movieName">${movie.name}</h1>
          <i>${movie.summary}</i>
          <ul>
            <li class="imdb">IMDB Point: ${movie.rating.average} </li>
            <li class="lang"> Language: ${movie.language}</li>
            <li class="genre"> Genre: ${movie.genres[0]} </li>
            <li class="premiered"> Premiered: ${movie.premiered}</li>
            <li class="ended"> Ended: ${movie.ended} </li>
          </ul>
          <div class="buttons">
            <button class = "btn btn-primary">Go to website</button>
            <button class = "btn btn-success">Go back</button>
          </div>
        </div>
      </div>
        `;
  });
}
