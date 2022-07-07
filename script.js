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

const imageAnimation = [
    `kenburns-top ${duration}s linear both reverse 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-right ${duration}s linear both reverse 0s, fade-out 2s ease-in forwards ${duration - 2}s`,
    `kenburns-bottom ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-left ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
]

const textAnimation = `focus-in-contract 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0s, text-blur-out 2s ease-in forwards ${duration- 2}s`



function getAll() {
    fetch("/mockData.json")
    .then(res => res.json())
    .then(mockData => generate(mockData))

}

function generate(data) {
    for (let i = 0; i < data.length; i++) {
      var img = document.createElement("img");
      img.src = `images/${data[i].url}`;
      img.classList = `img${i} img`

      var images = document.querySelector(".images");
      images.appendChild(img)

      var title = document.createElement("h1");
      title.innerHTML = data[i].title
      title.classList = `title${i} title slot${data[i].slot}`

      var titles = document.querySelector(".titles");
      titles.appendChild(title)
    }
    generateSlideshow(data)
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}



async function generateSlideshow(data) {
    for (let x = 0; x < data.length; x++) {
        let rest = document.querySelector(`.img${x}`)
        rest.style.opacity = 0;
        rest.style.animation = ''
        rest.style.zIndex = 10
        let r = document.querySelector(`.title${x}`)
        r.style.opacity = 0;
        console.log(r)
    }
    let playing = [data[0]]

    for (let i = 0; i < data.length; i++) {
        console.log(`${i} and ${i + 1}`)
        if (i == 0) {
            playing.push(data[i + 1])
            let activeImg = document.querySelector(`.img0`)
            activeImg.style.opacity = 100;
            activeImg.style.zIndex = 15;
            let activeImg2 = document.querySelector(`.img${i + 1}`)
            activeImg2.style.opacity = 100;
            let activeTitle = document.querySelector(`.title0`)
            activeTitle.style.opacity = 100;
            handleTemplate("first index", i, activeImg, activeTitle)

        } else if (i == data.length - 1) {
            playing.shift()
            playing.push(data[0])
            let activeImg = document.querySelector(`.img${i}`)
            activeImg.style.opacity = 100;
            activeImg.style.zIndex = 20;
            let activeImg2 = document.querySelector(`.img${0}`)
            activeImg2.style.opacity = 100;
            activeImg2.style.animation = '';
            let activeTitle = document.querySelector(`.title${i}`)
            activeTitle.style.opacity = 100;
            handleTemplate("last index", i, activeImg, activeTitle)

        } else {
            playing.shift()
            playing.push(data[i + 1])
            let activeImg = document.querySelector(`.img${i}`)
            activeImg.style.opacity = 100;
            activeImg.style.zIndex = 15;
            let activeImg2 = document.querySelector(`.img${i + 1}`)
            activeImg2.style.opacity = 100;
            let activeTitle = document.querySelector(`.title${i}`)
            activeTitle.style.opacity = 100;
            handleTemplate("index", i, activeImg, activeTitle)
        }
       
        
        console.log(playing)
        await delay(duration)
        let r = document.querySelector(`.title${i}`)
        r.style.opacity = 0;
        r.style.animation = ''

    }
    generateSlideshow(data)
}

let style = 0
function handleTemplate(x, i, activeImg, activeTitle) {

    if (style == 4) {
        style = 0;
    }
    console.log(`handeling template${template}`)
    if (template == 0) {
        if (x == "first index") {
            //let activeTitle = document.querySelector(`.title0`)
            activeTitle.style.animation = textAnimation;
            activeImg.style.animation = imageAnimation[style]
        } else if (x == "index") {
            //let activeTitle = document.querySelector(`.title${i}`)
            activeTitle.style.animation = textAnimation;
            activeImg.style.animation = imageAnimation[style]
        } else if(x == "last index") {
            //let activeTitle = document.querySelector(`.title${i}`)
            activeTitle.style.animation = textAnimation;
            activeImg.style.animation = imageAnimation[style]
        } else {
            console.log("error")
        }
        style += 1
        console.log(style)
    }

    
}

handleTemplate()
getAll()