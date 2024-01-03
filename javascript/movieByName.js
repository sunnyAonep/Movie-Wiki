  let moviseWishlist = []
  let movieNamebyUser = ""
  const storageVal =localStorage.getItem("movies")
  console.log(JSON.parse(storageVal));
  if(storageVal !== null){
    moviseWishlist = JSON.parse(storageVal);
  }
   
   function movieByName(name , page =1){ 
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
      }
    };
    fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then(data => {
      console.log(data)
      if(data.total_results > 0){ 
        inputContain.innerHTML =''
        inputContain.style = `
        height: 0;
        width: 0;`
        container.innerHTML = '';

        for (let i = 0; i < data.results.length; i++) {
          const movies = data.results[i];
          container.innerHTML += `
            <div id="img">
              <img src="http://image.tmdb.org/t/p/w500${data.results[i].poster_path}" id='posterImg'>
              <div class="dropdown">
                <button class="infobtn">info</button>
                <div class="dropdown-content">
                  <p>name of move:${data.results[i].title}</p>
                  <p>vote: ${data.results[i].vote_average}/10</p>
                  <p>release date : ${data.results[i].release_date}</p>
                  <p>sells : $${data.results[i].popularity} million </p>
                  <button onclick="saveValButton(${data.results[i].id});" id='likeBtn'>
                    <img src="../assenst/icons/like.png" alt="buttonpng" border="0" />
                  </button>
                </div>
              </div>
            </div>
          `;
        }
      }
    })
    .catch(err => console.error(err));
}
    function buttonsnum(movieNamebyUser){ 
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjNjNzViMWI2ZDUwMGNkMjgzZjU0MmU4ZTFlZDJkYSIsInN1YiI6IjVjMDNiNDQwMGUwYTI2NDg2YTA2ZjYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj6auQlw-VfPG6PenA6MbujH_SQk3Xr3LmD6H9WdH04'
        }
      };
      fetch(`https://api.themoviedb.org/3/search/movie?query=${movieNamebyUser}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        let containerBtn = document.getElementById('containerBtn')
        containerBtn.innerHTML += `
        <div class="pagination">
        <button class="btn1" onclick="backBtn()"> <img src="../assenst/icons/448-arrow.png" alt="">prev</button>
        <ul id="ulContain">
        <li class="link active" value="1" onclick="activeLink()">1</li>
        </ul>
        <button class="btn2" onclick="nextBtn()">next <img src="../assenst/icons/448-arrow.png" alt=""> </button>
        </div>`
        let ulContain = document.getElementById('ulContain')
          for (let i = 1; i < data.total_pages; i++) {
            ulContain.innerHTML +=`<li class="link" value="${i+1}" onclick="activeLink()">${i+1}</li>`;
          }
      })
        .catch(err => console.error(err));
      }
      
    movieNameSubmit.addEventListener('click' , (e)=>{
      e.preventDefault();
      const movieNameInput = movieName.value;
      if (movieNameInput == "") {
        alert("try again put a name of movie")
      }else{
        movieNamebyUser = movieNameInput
        buttonsnum(movieNamebyUser)
        movieByName(movieNamebyUser)
      }
    })

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
   let link = document.getElementsByClassName('link')
   let currentVal =1;

   function activeLink(){
    for(l of link){
        l.classList.remove("active")
    }
    event.target.classList.add("active");
    currentVal = event.target.value;
   }

   function backBtn(){
    if(currentVal >1){
        for(l of link){
            l.classList.remove("active")
        }  
        currentVal--;
        link[currentVal-1].classList.add("active")
        console.log(currentVal);
        movieByName(movieNamebyUser , currentVal)
    }
   }

   function nextBtn(){
    if(currentVal < 4){
        for(l of link){
            l.classList.remove("active")
        }  
        currentVal++;
        link[currentVal-1].classList.add("active")
        console.log(currentVal);
        movieByName(movieNamebyUser , currentVal)
    }
}