let moviseWishlist = []
const storageVal =localStorage.getItem("movies")
 if(storageVal !== null){
 moviseWishlist = JSON.parse(storageVal);
 }
console.log(moviseWishlist);

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
      userWatchlist.innerHTML +=`
      <div class= 'card'>
      <div class = anotherAnim>
      <img src="http://image.tmdb.org/t/p/w500${data.backdrop_path}" id="posterImg">
      <div class= 'underCard'>
      <h1 class="title">${data.title}</h1>
      <div class= 'underTitleCard'>
      <p>${data.release_date}</p>
      <span>${data.vote_average} / 10</span></div>
      </div></div></div>`
      })     
      .catch(err => console.error(err));
    }

    for(let i = 0 ; i<moviseWishlist.length ; i++){
        getIdByUser(moviseWishlist[i].id)
    }
    function ButtonRemove() {
      if(removeBtn){
        if(confirm('if you really want to remove all press ok')){
          localStorage.removeItem("movies" , JSON.stringify(moviseWishlist))
           window.location = ''
        }
        return
   }
      } 
    