//http://127.0.0.1:5500/?duration=2&template=0
//http://127.0.0.1:5500/index.html?server=true&template=0&titlePrio=&positionPrio=&duration=5&0_url=images/test0.jpg&0_title=image0&0_position=8&1_url=images/test1.jpg&1_title=image1&1_position=4&2_url=images/test2.jpg&2_title=image2&2_position=3&4_url=images/test3.jpg&4_title=image3&4_position=8
//http://127.0.0.1:5500/index.html?server=true&template=0&titlePrio=&positionPrio=&duration=5&0_url=images/test0.jpg&0_title=image0&0_position=8&1_url=images/test1.jpg&1_title=image1&1_position=4&2_url=images/test2.jpg&2_title=image2&2_position=3&3_url=images/test3.jpg&3_title=image3&3_position=2


//&4_url=images/test3.jpg&4_title=image3&4_position=8

const params = new URLSearchParams(window.location.search)
let allParams = {}
params.forEach(function(value, key) {
    allParams[key] = value;
})
const duration = Number(allParams.duration);
const template = allParams.template;
const titlePrio = allParams.titlePrio;
const positionPrio = allParams.positionPrio;

delete allParams.duration; delete allParams.template; delete allParams.titlePrio; delete allParams.positionPrio; delete allParams.server;

let all = []
let curr = {}
let currIndex = 1
console.log(titlePrio.length)
console.log(positionPrio)
for (let m = 0; m < Object.keys(allParams).length; m++) {
    if (currIndex == 1) {
        //url
        curr[Object.keys(allParams)[m].slice(2)] = Object.values(allParams)[m]
    } else if (currIndex == 2) {
        //title
        if (titlePrio.length > 0) {
            console.log
            curr[Object.keys(allParams)[m].slice(2)] = titlePrio
        } else {
            curr[Object.keys(allParams)[m].slice(2)] = Object.values(allParams)[m]
        }        
    }  else if (currIndex == 3) {
        //position
        if (positionPrio.length > 0) {
            curr[Object.keys(allParams)[m].slice(2)] = positionPrio
        } else {
            curr[Object.keys(allParams)[m].slice(2)] = Object.values(allParams)[m]
        } 
        console.log(curr)
        currIndex = 0;
        all.push(curr)
        curr = {}
    }
    currIndex += 1
}
console.log(all)

//animation types
const rightToMiddle = `rightToMiddle ${duration+ 2}s, ease-in ${duration- 3}s`
const leftToMiddle = `leftToMiddle ${duration+ 2}s, ease-in ${duration- 3}s`

const middleToRight = `middleToRight ${duration}s, ease-in ${duration- 2}s`
const middleToLeft = `middleToLeft ${duration}s, ease-in ${duration- 2}s`

const textTransition = `slide-in-bottom ${duration}s linear both 0s, ease-in forwards ${duration- 2}s`
const textAnimation = `focus-in-contract 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0s, text-blur-out 2s ease-in forwards ${duration- 2}s`
const imageAnimation = [
    `kenburns-top ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-right ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration - 2}s`,
    `kenburns-bottom ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-left ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
]

function generate(data) {
    for (let i = 0; i < data.length; i++) {
        if (template == 0) {
            var img = document.createElement("img");
            img.src = data[i].url;
            img.classList = `img${i} img`

            var images = document.querySelector(".images");
            images.appendChild(img)
            
            var title = document.createElement("h1");
            title.innerHTML = data[i].title

            title.classList = `title${i} title slot${data[i].position}`
            

            var titles = document.querySelector(".titles");
            titles.appendChild(title)
        } else if (template == 1) {
            var img = document.createElement("img");
            img.src = data[i].url;
            img.classList = `img${i} img`

            var images = document.querySelector(".images");
            images.appendChild(img)

            var imgDup = document.createElement("img");
            imgDup.src = data[i].url;
            imgDup.classList = `img${i} img imgDup${i}`
            //imgDup.style.opacity = 0
            var images = document.querySelector(".images");
            images.appendChild(imgDup) 
            
            var title = document.createElement("h1");
            title.innerHTML = data[i].title

            title.classList = `title${i} title slot${data[i].position}`
            

            var titles = document.querySelector(".titles");
            titles.appendChild(title)
        }
      
    }
    generateSlideshow(data)
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}


async function generateSlideshow(data) {
    await delay(2)
    for (let x = 0; x < data.length; x++) {
        //resets all previously added styles
        console.log("resetting all previously added styles")
        let rest = document.querySelector(`.img${x}`)
        rest.style.opacity = 0;
        rest.style.animation = ''
        rest.style.zIndex = 10
        let r = document.querySelector(`.title${x}`)
        r.style.opacity = 0;
        if (template == 1) {
            let dupe = document.querySelector(`.imgDup${x}`)
            dupe.style.opacity = 0;
            dupe.style.animation = ''
            dupe.style.zIndex = 10
            console.log(dupe)
        }

    }
    let playing = [data[0]]

    for (let i = 0; i < data.length; i++) {
        console.log(i)
        if (i == 0) {
            playing.push(data[i + 1])
            let activeImg = document.querySelector(`.img0`)
            activeImg.style.opacity = 100;
            activeImg.style.zIndex = 15;
            let activeImg2 = document.querySelector(`.img${i + 1}`)
            activeImg2.style.opacity = 100;
            let activeTitle = document.querySelector(`.title0`)
            activeTitle.style.opacity = 100;
            console.log("first")
            handleTemplate("first index", i, activeImg, activeTitle)

        } else if (i == data.length - 1) {
            playing.shift()
            playing.push(data[0])
            let activeImg = document.querySelector(`.img${i}`)
            activeImg.style.opacity = 100;
            activeImg.style.zIndex = 15;
            let activeImg2 = document.querySelector(`.img${0}`)
            activeImg2.style.opacity = 100;
            activeImg2.style.animation = '';


            let activeTitle = document.querySelector(`.title${i}`)
            activeTitle.style.opacity = 100;
            console.log("last")
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
    if (template == 0) {
        if (x == "first index") {
            activeTitle.style.animation = textAnimation;
            activeImg.style.animation = imageAnimation[style]
        } else if (x == "index") {
            activeTitle.style.animation = textAnimation;
            activeImg.style.animation = imageAnimation[style]
        } else if(x == "last index") {
            activeTitle.style.animation = textAnimation;
            activeImg.style.animation = imageAnimation[style]
        } else {
            console.log("error")
        }
        style += 1
    } else if (template == 1) {
        if (x == "first index") {
            //transition not like codePen
            let activeImgDup = document.querySelector(`.imgDup${i}`)
            activeImgDup.style.opacity = 100;
            activeImgDup.style.zIndex = 15;
            
            activeTitle.style.animation = textTransition;

            activeImgDup.style.animation = rightToMiddle;
            activeImg.style.animation = leftToMiddle;
            console.log("first animation")
        } else if (x == "index") {
            let activeImgDup = document.querySelector(`.imgDup${i}`)
            activeImgDup.style.opacity = 100;
            activeImgDup.style.zIndex = 15;
            let x = document.querySelector(`.imgDup${i + 1}`)
            x.style.opacity = 0;

            activeTitle.style.animation = textTransition;
            
            activeImgDup.style.animation = rightToMiddle;
            activeImg.style.animation = leftToMiddle;
            console.log("middle animation")
        } else if(x == "last index") {
            let activeImgDup = document.querySelector(`.imgDup${i}`)

            activeImgDup.style.opacity = 100;
            activeImgDup.style.zIndex = 15;

            activeTitle.style.animation = textTransition;

            activeImgDup.style.animation = rightToMiddle;
            activeImg.style.animation = leftToMiddle;
            console.log("last animation")

            let dupe = document.querySelector(`.imgDup${0}`)
            dupe.style.opacity = 100;
            dupe.style.animation = ''
        } else {
            console.log("error")
        }
        
    }

    
}

generate(all)
