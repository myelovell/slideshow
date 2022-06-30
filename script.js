const gridSpots ={
    '0': 'top-left',
    '1': 'top-middle',
    '2': 'top-right',
    '3': 'middle-left',
    '4': 'middle-middle',
    '5': 'middle-right',
    '6': 'bottom-left',
    '7': 'bottom-middle',
    '8': 'bottom-right',
    '9': 'N/A'
};
    
function fetchParams() {
    const params= new URLSearchParams(window.location.search)
    const duration = params.get("duration")
    const mall = params.get("mall")
   manageDuration(duration)
}

const getAll = function () {
    const allData = fetch("/mockData.json")
    .then(res => res.json())
    .then(mockData => console.log(mockData))
    //generate(mockData)
    return allData
}

function generate(data) {
    for (let i = 0; i < data.length; i++) {
      //console.log(data[i])
  
      var img = document.createElement("img");
      img.src = `images/${data[i].url}`;
      img.classList = `img${i} img`

      var images = document.querySelector(".images");
      images.appendChild(img)

      var title = document.createElement("h1");
      title.innerHTML = data[i].title
      title.classList = `title${i} title`
      var titles = document.querySelector(".titles");
      titles.appendChild(title)

    }
}

function manageDuration(duration) {
}

getAll()
fetchParams()