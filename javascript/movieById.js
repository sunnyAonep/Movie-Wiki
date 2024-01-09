  let moviseWishlist = []
  const storageVal =localStorage.getItem("movies")
  console.log(JSON.parse(storageVal));
   if(storageVal !== null){
   moviseWishlist = JSON.parse(storageVal);
   }
  
  function getIdByUser(id){ 
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then(response => response.json())
      .then(data => {
      console.log(data)
      userSingelMovie.innerHTML =""
      userSingelMovie.style = ` height: 0vh;
      min-width: 0;`
      theMovieById.innerHTML +=`
      <div id="backgroundImage">
      <div id="card">
        <h1 id="title">${data.title}</h1>
        <div id="release_date_and_time"><p>${data.release_date}</p><p>${data.runtime} minutes</p></div>
        <div id="likebutton"><button onclick = "saveValButton(${data.id});">like</button></div>
        <div id = "geners"></div>
        <div id="actorsTitle"><h4>actors:</h4>
        <div id = "actors"></div>
        </div>
        <div id = "overview"><p>${data.overview}</p></div>
        </div></div>
        
      `
      const generDiv = document.getElementById('geners')
      const backimg = document.getElementById('backgroundImage')
        for(let i = 0 ; i < data.genres.length ;i++){ 
          generDiv.innerHTML +=`<span> ${data.genres[i].name} </span>`
      }
      backimg.innerHTML +=`
      <img src="http://image.tmdb.org/t/p/w500${data.backdrop_path}" id="posterImg">`

      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(data => {
          let namesOfActors = document.getElementById("actors")
          for(let i =0 ; i<data.cast.length ;i++){ 
            namesOfActors.innerHTML +=`
          <p>${data.cast[i].name}</p>`
        }
          console.log(data)})
        .catch(err => console.error(err));
 
        // fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        // .then(response => response.json())
        // .then(data => {
        //   let trailerOfMovie = document.getElementById("trailer")
        //   trailerOfMovie.innerHTML += `
        //   <iframe src="https://www.youtube-nocookie.com/embed/${data.results[0].key}?si=4ZJBUdvHa240g8LV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen id="trailerVid"></iframe>`
        //   console.log(data)})
        // .catch(err => console.error(err));
        
       })
     
      .catch(err => console.error(err));
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
    btnId.addEventListener('click' , (e) =>{
      e.preventDefault();
      let idVul = imgsId.value;
      if (idVul == "") {
        alert("try again put a name of movie")
      }else{
        getIdByUser(idVul)
      }
    })
  
