const loadMovies = () => {

    const requestOptions = {
        method: 'GET'
    };
  
  fetch("http://localhost:8081/movies/findAll", requestOptions)
    .then(response => response.json())
    .then(result => loadMovieTable(result))
    .catch(error => console.log('error', error));
}

const loadShows = () => {

  const requestOptions = {
      method: 'GET'
  };

fetch("http://localhost:8081/shows/findAll", requestOptions)
  .then(response => response.json())
  .then(result => loadShowsTable(result))
  .catch(error => console.log('error', error));
}

const loadSeasons = async (showId) => {
  
  const requestOptions = {
      method: 'GET'
  };

  let response = await fetch(`http://localhost:8081/seasons/${showId}`, requestOptions)
  let result = await response.json()

  return result
}

const loadEpisodes = async (seasonId) => {
  const requestOptions = {
      method: 'GET'
  };

  let response = await fetch(`http://localhost:8081/episodes/${seasonId}`, requestOptions)
  let result = await response.json()
  return result
}

const loadMovieTable = (movies) => {
  document.querySelector('#shows-table').style.display = 'none'
  document.querySelector('#movie-table').style.display = ''

  const tb = document.querySelector('#movie-table-body')
  tb.innerHTML = '';
  for(let i in movies){
    
    let m = movies[i]
    let tr =  document.createElement('tr')
  
    let tdId = document.createElement('td')
    tdId.innerHTML = m.id
    tr.appendChild(tdId)

    let tdTitle = document.createElement('td')
    tdTitle.innerHTML = m.title
    tr.appendChild(tdTitle)

    let tdYear = document.createElement('td')
    tdYear.innerHTML = m.year
    tr.appendChild(tdYear)

    let tdGenre = document.createElement('td')
    tdGenre.innerHTML = m.genreid.name
    tr.appendChild(tdGenre)

    tb.appendChild(tr)
  }
}

const loadShowsTable = async (shows) => {
  document.querySelector('#shows-table').style.display = ''
  document.querySelector('#movie-table').style.display = 'none'

  const tb = document.querySelector('#shows-table-body')
  tb.innerHTML = '';
  for(let i in shows){
    
    let s = shows[i]
    let tr =  document.createElement('tr')

    tr.addEventListener('click', async () => {
      $('#showsModal').modal('toggle')
      let seasons = await loadSeasons(s.id)
      let seasonSelect = document.getElementById('seasonSelect')
      seasonSelect.innerHTML = ''
      op = document.createElement('option')
      op.innerHTML = '--Select a season--'
      seasonSelect.appendChild(op)
      for(let j in seasons){
        let op = document.createElement('option')
        op.setAttribute('value', seasons[j].id)
        op.innerHTML = seasons[j].title
        seasonSelect.appendChild(op)
      }
      seasonSelect.addEventListener('change', async () => {
        let seasonId = seasonSelect.value
        if(seasonId){
          let episodes = await loadEpisodes(seasonSelect.value)
          let epTableBody = document.getElementById('episodes-table-body')
          epTableBody.innerHTML = ''
          for(let j in episodes){
            console.log(episodes[j])
            let epTr =  document.createElement('tr')
            let epTdNumber = document.createElement('td')
            let epTdTitle = document.createElement('td')
            epTdNumber.innerHTML = episodes[j].episodeNumber
            epTdTitle.innerHTML = episodes[j].title 

            epTr.appendChild(epTdNumber)
            epTr.appendChild(epTdTitle)

            epTableBody.appendChild(epTr)
          }
        }
      })
    })
  
    let tdId = document.createElement('td')
    tdId.innerHTML = s.id
    tr.appendChild(tdId)

    let tdTitle = document.createElement('td')
    tdTitle.innerHTML = s.title
    tr.appendChild(tdTitle)

    let tdYearStart = document.createElement('td')
    tdYearStart.innerHTML = s.yearStart
    tr.appendChild(tdYearStart)

    let tdYearEnd = document.createElement('td')
    let yearEnd = s.yearEnd || ''
    tdYearEnd.innerHTML = yearEnd
    tr.appendChild(tdYearEnd)

    let tdGenre = document.createElement('td')
    tdGenre.innerHTML = s.genreid.name
    tr.appendChild(tdGenre)

    tr.style.cursor = 'pointer'

    tb.appendChild(tr)
  }
}

