let moviseWishlist = []
        const storageVal = localStorage.getItem("movies")
        if (storageVal !== null) {
            moviseWishlist = JSON.parse(storageVal);
        }
        console.log(moviseWishlist);

        function getIdByUser(id) {
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
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('card', 'anotherAnim');
                    movieCard.innerHTML = `
                        <img src="http://image.tmdb.org/t/p/w500${data.backdrop_path}" id="posterImg">
                        <div class= 'underCard'>
                            <h1 class="title">${data.title}</h1>
                            <div class= 'underTitleCard'>
                                <p>${data.release_date}</p>
                                <span>${data.vote_average} / 10</span>
                                <button class="removeBtn" onclick="removeMovie(${data.id})">Remove</button>
                            </div>
                        </div>`;
                    userWatchlist.appendChild(movieCard);
                })
                .catch(err => console.error(err));
        }

        function renderWatchlist() {
            userWatchlist.innerHTML = '';
            moviseWishlist.forEach(movie => getIdByUser(movie.id));
        }

        renderWatchlist();

        function ButtonRemove() {
            if (confirm('Are you sure you want to remove all movies?')) {
                localStorage.removeItem("movies");
                userWatchlist.innerHTML = '';
            }
        }

        function removeMovie(id) {
            moviseWishlist = moviseWishlist.filter(movie => movie.id !== id);
            localStorage.setItem("movies", JSON.stringify(moviseWishlist));
            renderWatchlist();
        }
    