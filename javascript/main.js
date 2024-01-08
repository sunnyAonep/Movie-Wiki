 const btn1 = document.getElementById("button1")
const btn2 = document.getElementById("button2")
const btn3 = document.getElementById("button3")
const btn4 = document.getElementById("button4")
const btn5 = document.getElementById("button5")
let moviseWishlist = []
const storageVal =localStorage.getItem("movies")
console.log(JSON.parse(storageVal));
if(storageVal !== null){
  moviseWishlist = JSON.parse(storageVal);
}
const backGround = document.body
const moviesPages = (time = "day" , pages = 1) =>{
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
    }
  };
  fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=en-US&page=${pages}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const moviesSlider = document.getElementById('sliderImages')
      moviesSlider.innerHTML = `
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
    <div class="carousel-item active imgOne">
    <img src="http://image.tmdb.org/t/p/w500${data.results[5].backdrop_path}" class="d-block w-100 " >
    <div class="carousel-caption d-none d-md-block">
    <h5>${data.results[5].original_title}</h5>
    <p>${data.results[5].overview}</p>
    </div></div>
    <div class="carousel-item imgOne">
    <img src="http://image.tmdb.org/t/p/w500${data.results[1].backdrop_path}" class="d-block w-100  " >
    <div class="carousel-caption d-none d-md-block">
    <h5>${data.results[1].original_title}</h5>
    <p>${data.results[1].overview}</p>
    </div></div><div class="carousel-item imgOne">
    <img src="http://image.tmdb.org/t/p/w500${data.results[2].backdrop_path}" class="d-block w-100" alt="...">
    <div class="carousel-caption d-none d-md-block">
    <h5>${data.results[2].original_title}</h5>
    <p>${data.results[2].overview}.</p>
    </div></div></div>
    <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
     </button>
     </div>
      `
      for (let i = 0; i < data.results.length; i++) {
        const movies = data.results[i];
        container.innerHTML += `
        <div class = "card" data-aos="flip-down">
        <img id='imgStyle' src = "http://image.tmdb.org/t/p/w500${data.results[i].poster_path}">
        <span>${data.results[i].original_title}</span>
        <br>
        <button onclick = "saveValButton(${data.results[i].id});" id= 'likeBtn'>
        <img src="../assenst/icons/like.png" alt="buttonpng" border="0" />
        </button>
        </div>
       `
       console.log(movies);        
      }
      // backGround.style.backgroundImage = `url("http://image.tmdb.org/t/p/w500${data.results[0].backdrop_path}")`
    })
    .catch(err => console.log(err));
  }
  function saveValButton(id) {
    let movisObject = {id}
    const existingMovie = moviseWishlist.find(movie => movie.id === id);
    if (existingMovie) {
    console.log('already exists');
     } else {
  moviseWishlist.push(movisObject);
  localStorage.setItem("movies", JSON.stringify(moviseWishlist));
  console.log(moviseWishlist);
  }
 }

   moviesPages()
  btn1.addEventListener('click' , (e)=>{
  e.preventDefault()
  let time = timing.value
  container.innerHTML = ""
  moviesPages(time , 1)})
  btn2.addEventListener('click' , (e)=>{
    e.preventDefault()
  let time = timing.value
  container.innerHTML = ""
    moviesPages(time , 2)})
  btn3.addEventListener('click' , (e)=>{
    e.preventDefault()
  let time = timing.value
  container.innerHTML = ""
    moviesPages(time ,3)})
  btn4.addEventListener('click' , (e)=>{
    e.preventDefault()
  let time = timing.value
  container.innerHTML = ""
    moviesPages(time ,4)})
  btn5.addEventListener('click' , (e)=>{
    e.preventDefault()
  let time = timing.value
  container.innerHTML = ""
    moviesPages(time , 5)})
  const buttons = document.querySelectorAll('[data-carousel-button]');






  //   function page2(){ 
  //   function getIdByUser(id){ 
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
  //     }
  //   };
    
  //   fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
  //     .then(response => response.json())
  //     .then(data => {
  //     console.log(data)
  //     userSingelMovie.innerHTML =""
  //     userSingelMovie.innerHTML +=`
  //     <div id="card">
  //       <h1>${data.title}</h1>
  //       <h2>${data.release_date}</h2>
  //       <p>${data.overview}</p>
  //       <p class="runtime">${data.runtime} minutes</p>
  //       <div id="actors"><h4>actors:</h4><div>
  //       <div id="trailer"><h4>trailer</h4><div>
  //       </div>
  //     `
  //     const csrdDiv = document.getElementById('card')
  //       for(let i = 0 ; i < data.genres.length ;i++){ 
  //         csrdDiv.innerHTML +=`<span> ${data.genres[i].name} </span>`
  //     }
  //     csrdDiv.innerHTML +=` 
  //     <br>
  //     <img src="http://image.tmdb.org/t/p/w500${data.poster_path}" id="posterImg">`

  //     fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
  //       .then(response => response.json())
  //       .then(data => {
  //         let namesOfActors = document.getElementById("actors")
  //         for(let i =0 ; i<data.cast.length ;i++){ 
  //           namesOfActors.innerHTML +=`
  //         <p>${data.cast[i].name}</p>`
  //       }
  //         console.log(data)})
  //       .catch(err => console.error(err));
 
  //       fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  //       .then(response => response.json())
  //       .then(data => {
  //         let trailerOfMovie = document.getElementById("trailer")
  //         trailerOfMovie.innerHTML += `
  //         <iframe src="https://www.youtube-nocookie.com/embed/${data.results[0].key}?si=4ZJBUdvHa240g8LV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
  //         console.log(data)})
  //       .catch(err => console.error(err));
        
  //      })

     
  //     .catch(err => console.error(err));
  //   }
  //   btnId.addEventListener('click' , (e) =>{
  //     e.preventDefault();
  //     let idVul = imgsId.value;
  //     getIdByUser(idVul)
  //   })
  // }

//   function page3(){ 
//   function movieByName(name ){ 
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
//     }
//   };
//   fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`, options)
//     .then(response => response.json())
//     .then(data => {
//     console.log(data)
//     if(data.total_results > 0){ 
//       inputContain.innerHTML =''
//     for (let i = 0; i < data.results.length; i++) {
//       const movies = data.results[i];
//       container.innerHTML += `
//       <div id = img>
//       <img src = "http://image.tmdb.org/t/p/w500${data.results[i].poster_path}">
//       <div class="dropdown">
//       <button class="infobtn">info</button>
//       <div class="dropdown-content">
//       <p>name of move:${data.results[i].title}</p>
//       <p>vote: ${data.results[i].vote_average}/10</p>
//       <p>release date : ${data.results[i].release_date}</p>
//       <p>sells : $${data.results[i].popularity} million </p>
//       </div>
//       </div>
//       <div>
//      `}}
//   })
//     .catch(err => console.error(err));
//   }
//   movieNameSubmit.addEventListener('click' , (e)=>{
//     e.preventDefault();
//     const movieNameInput = movieName.value;
//     if (movieNameInput == "") {
//       alert("try again put a name of movie")
//     }else{
//       movieByName(movieNameInput)
//     }
//   })
// }