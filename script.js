//http://127.0.0.1:5500/?duration=2&template=0
//index.html?server=true&template=0&titlePrio=&positionPrio=&duration=5&img0_url=url&title0=aa&position0=8&img1_url=url&title1=bb&position1=0&img2_url=url&title2=cc&position2=4
//index.html?server=true&template=0&titlePrio=&positionPrio=&duration=5&img0_url=http%3A%2F%2Flocalhost%3A8080%2Fecosystem_web%2Fiapi%2Fasset%2F%5Bobject%20Object%5D%2Fmedia%2F%5Bobject%20Object%5D%2Fstream&title0=ö&position0=8&img1_url=http%3A%2F%2Flocalhost%3A8080%2Fecosystem_web%2Fiapi%2Fasset%2F%5Bobject%20Object%5D%2Fmedia%2F%5Bobject%20Object%5D%2Fstream&title1=mkl&position1=0&img2_url=http%3A%2F%2Flocalhost%3A8080%2Fecosystem_web%2Fiapi%2Fasset%2F%5Bobject%20Object%5D%2Fmedia%2F%5Bobject%20Object%5D%2Fstream&title2=w&position2=4

  
const params = new URLSearchParams(window.location.search)
let allParams = {}
params.forEach(function(value, key) {
    allParams[key] = value;
})
const duration = allParams.duration;
const template = allParams.template;
const titlePrio = allParams.titlePrio;
const positionPrio = allParams.positionPrio;

delete allParams.duration; delete allParams.template; delete allParams.titlePrio; delete allParams.positionPrio; delete allParams.server;
console.log(Object.keys(allParams).length);
console.log(Object.values(allParams)[0])
console.log(allParams)



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
/*  for (let i = 0; i < Object.keys(allParams).length / 3; i++) {
      var img = document.createElement("img");
      img.src = `images/${Object.values(allParams)[i]}`;
      img.classList = `img${i} img`

      var images = document.querySelector(".images");
      images.appendChild(img)

      var title = document.createElement("h1");
      title.innerHTML = Object.values(allParams)[i + 6]
      title.classList = `title${i} title slot${Object.values(allParams)[i + 3]}`

      var titles = document.querySelector(".titles");
      titles.appendChild(title)
    }
    Object.values(allParams)[i]       //image URL  
    Object.values(allParams)[i + 3]   //title position
    Object.values(allParams)[i + 6]   //title */

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
        //console.log(r)
    }
    let playing = [data[0]]

    for (let i = 0; i < data.length; i++) {
        //console.log(`${i} and ${i + 1}`)
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
       
        
        //console.log(playing)
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
    //console.log(`handeling template${template}`)
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
            //console.log("error")
        }
        style += 1
        //console.log(style)
    }

    
}

handleTemplate()
//generate(params)
getAll()