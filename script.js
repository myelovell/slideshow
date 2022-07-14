/* Current test URL

http://127.0.0.1:5500
/index.html?server=true&template=1&titlePrio=&positionPrio=&duration=5&
0_url=images/test1.jpg&0_title=image0&0_position=8&
1_url=images/test2.jpg&1_title=image1&1_position=4&
2_url=images/test4.jpg&2_title=image2&2_position=3

*/

const params = new URLSearchParams(window.location.search)
let allParams = {}
params.forEach(function(value, key) {
    allParams[key] = value;
})
//static URL parameters
const duration = Number(allParams.duration);
const template = allParams.template;
const titlePrio = allParams.titlePrio;
const positionPrio = Number(allParams.positionPrio);

delete allParams.duration; delete allParams.template; delete allParams.titlePrio; delete allParams.positionPrio; delete allParams.server;

let all = []
let curr = {}
let currIndex = 1
//parses URL to JSON
for (let m = 0; m < Object.keys(allParams).length; m++) {
    //handles url
    if (currIndex == 1) {
        curr[Object.keys(allParams)[m].slice(2)] = Object.values(allParams)[m]
    //handles title
    } else if (currIndex == 2) {
        if (titlePrio.length > 0) {
            curr[Object.keys(allParams)[m].slice(2)] = titlePrio
        } else {
            curr[Object.keys(allParams)[m].slice(2)] = Object.values(allParams)[m]
        }
    //handles position        
    }  else if (currIndex == 3) {
        if (positionPrio.length > 0) {
            curr[Object.keys(allParams)[m].slice(2)] = positionPrio
        } else {
            curr[Object.keys(allParams)[m].slice(2)] = Object.values(allParams)[m]
        } 
        currIndex = 0;
        all.push(curr)
        curr = {}
    }
    currIndex += 1
}
console.log(all)

//image animation types
const rightToMiddle = `rightToMiddle ${duration+ 2}s, ease-in ${duration- 3}s`
const leftToMiddle = `leftToMiddle ${duration+ 2}s, ease-in ${duration- 3}s`
const imageAnimation = [
    `kenburns-top ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-right ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration - 2}s`,
    `kenburns-bottom ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-left ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
]

//text animation types 
const textTransition = `slide-in-bottom ${duration}s linear both 0s, ease-in forwards ${duration- 2}s`
const textAnimation = `focus-in-contract 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0s, text-blur-out 2s ease-in forwards ${duration- 2}s`

//depricated ATM
const middleToRight = `middleToRight ${duration}s, ease-in ${duration- 2}s`
const middleToLeft = `middleToLeft ${duration}s, ease-in ${duration- 2}s`

//n == duration
function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

//generates images
function generate(data) {
    for (let i = 0; i < data.length; i++) {
        var imgContainer = document.createElement("div")
        imgContainer.classList = `imgContainer imgContainer${i}`
        var images = document.querySelector(".images");
        var img = document.createElement("img");

        img.src = data[i].url;
        img.classList = `img${i} img`
        imgContainer.appendChild(img)

        if (template == 1) {
            var imgDup = document.createElement("img");
            imgDup.src = data[i].url;
            imgDup.classList = `img${i} img imgDup${i}`
            imgContainer.appendChild(imgDup)
        } 
        images.appendChild(imgContainer)
        

        var titleContainer = document.createElement("div")
        titleContainer.classList = `titleContainer titleContainer${i}`
        var title = document.createElement("h1");
        var titles = document.querySelector(".titles");

        title.innerHTML = data[i].title
        title.classList = `title${i} title slot${data[i].position}`

        titleContainer.appendChild(title)
        titles.appendChild(titleContainer)
    }
    generateSlideshow(data)
   
}


async function generateSlideshow(data) {
/*     for (let x = 1; x < data.length; x++) {
        //resets all previously added styles
        //console.log("resetting all previously added styles")
        let restImg = document.querySelector(`.img${x}`)
        restImg.style.animation = ''
        let restTitle = document.querySelector(`.title${x}`)
        restTitle.style.animation = ''
        restImg.classList.remove("current")
        restTitle.classList.remove("current")
        if (template == 1) {
            let dupe = document.querySelector(`.imgDup${x}`)
            dupe.style.animation = ''
        }
    } */
    for (let i = 0; i < data.length; i++) {
        if (i == 0) {
            let currentImg = document.querySelector(`.img0`)
            let currentTitle = document.querySelector(`.title0`)
            currentImg.classList.add("current")
            currentTitle.classList.add("current")
            handleTemplate("first index", i, currentImg, currentTitle)
            await delay(duration)
            let activeImg = document.querySelector(`.img${data.length - 1}`)
            activeImg.classList.remove("current")
            activeImg.style.animation = ''
            currentImg.classList.remove("current")
            currentTitle.classList.remove("current")
            console.log(activeImg)

        } else {
            let currentImg = document.querySelector(`.img${i}`)
            let currentTitle = document.querySelector(`.title${i}`)
            currentImg.classList.add("current")
            currentTitle.classList.add("current")
            handleTemplate("index", i, currentImg, currentTitle)
            await delay(duration)
            let activeImg = document.querySelector(`.img${i - 1}`)
            activeImg.classList.remove("current")
            activeImg.style.animation = ''
            currentImg.classList.remove("current")
            currentTitle.classList.remove("current")
        }

    }
    generateSlideshow(data)
}

let style = 0
function handleTemplate(x, i, currentImg, currentTitle) {
    if (style == 4) {
        style = 0;
    }
    if (template == 0) {
        if (x == "first index") {
            currentTitle.style.animation = textAnimation;
            currentImg.style.animation = imageAnimation[style]
        } else if (x == "index") {
            currentTitle.style.animation = textAnimation;
            currentImg.style.animation = imageAnimation[style]
        } else {
            console.log("error")
        }
        style += 1
    } else if (template == 1) {
        if (x == "first index") {
            let currentImgDup = document.querySelector(`.imgDup${i}`)

            currentTitle.style.animation = textTransition;
            currentImgDup.style.animation = rightToMiddle;
            currentImg.style.animation = leftToMiddle;
        } else if (x == "index") {
            let currentImgDup = document.querySelector(`.imgDup${i}`)

            currentTitle.style.animation = textTransition;
            currentImgDup.style.animation = rightToMiddle;
            currentImg.style.animation = leftToMiddle;
        } else {
            console.log("error")
        }    
    }
}


generate(all)