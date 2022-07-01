//http://127.0.0.1:5500/?duration=2&template=0

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
    
const params = new URLSearchParams(window.location.search)
const duration = params.get("duration")
const template = params.get("template")

function getAll() {
    fetch("/mockData.json")
    .then(res => res.json())
    .then(mockData => generate(mockData))

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
    manageDuration(data)
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function manageDuration(data) {
    let playing = []
    let resting = []

    for (let i = 0; i < data.length; i++) {
        console.log(data.length - 1)
        console.log(i)
        if (i == data.length - 1) {
            let img2 = document.querySelector(`.img${0}`)
            let img1 = document.querySelector(`.img${i}`)
            img1.style.display = ''
            img2.style.display = ''
            playing.push(data[i])
            playing.push(data[0])
        } else {
            let img2 = document.querySelector(`.img${i + 1}`)
            let img1 = document.querySelector(`.img${i}`)
            img2.style.display = ''
            img1.style.display = ''
            playing.push(data[i])
            playing.push(data[i + 1])
        }
        let title1 = document.querySelector(`.title${i}`)
        title1.style.display = ''

        for (let j = 0; j < data.length; j++) {
            //console.log(j)
            if (i == data.length - 1) {
                if (j == 0 || j == data.length - 1) {

                }
                else if (j != 0) {
                    
                    console.log(`pushing ${j}`)
                    resting.push(data[j])
                    let restImg = document.querySelector(`.img${j}`)
                    let restTitle = document.querySelector(`.title${j}`)
                    restImg.style.display = 'none'
                    restTitle.style.display = 'none'
                }

            } else if (i != data.length - 1){
                
                if (data[j] === data[i] || data[j] === data[i + 1]) {

                } else {
                    console.log(`pushing ${j}`)
                    resting.push(data[j])
                    let restImg = document.querySelector(`.img${j}`)
                    let restTitle = document.querySelector(`.title${j}`)
                    restImg.style.display = 'none'
                    restTitle.style.display = 'none'
                }
            }

            

            // if (data[j] === data[i] || data[j] === data[i + 1]) {
            // } 
            // else if (i == data.length - 1) {
            //     console.log(`pushing ${j}`)
            //     resting.push(data[j])
            //     let restImg = document.querySelector(`.img${0}`)
            //     let restTitle = document.querySelector(`.title${0}`)
            //     restImg.style.display = 'none'
            //     restTitle.style.display = 'none'
            // } else {
            //     console.log(`pushing ${j}`)
            //     resting.push(data[j])
            //     let restImg = document.querySelector(`.img${j}`)
            //     let restTitle = document.querySelector(`.title${j}`)
            //     restImg.style.display = 'none'
            //     restTitle.style.display = 'none'
            // }

            
        }
        
        console.log("-------------")
        console.log("playing")
        console.log(playing)
        console.log("resting")
        console.log(resting)
        await delay(duration)
        resting = []
        playing = []
        
        
    }
    manageDuration(data)
}

getAll()