//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////# PARAMETERS #////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

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

//Parse dynamic URL parameters to JSON
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

//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////# ANIMATIONS #////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

//image animation types. template 0
const imageAnimation = [
    `kenburns-top ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-right ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration - 2}s`,
    `kenburns-bottom ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-left ${duration + 2}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
]

//image animation types. template 1
const rightToMiddle = `rightToMiddle ${duration}s, ease-in ${duration- 2}s`
const leftToMiddle = `leftToMiddle ${duration}s, ease-in ${duration- 2}s`

//text animation type, template 0
const textAnimation = `focus-in-contract 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards 0s, text-blur-out 2s ease-in forwards ${duration- 2}s`

//text animation type, template 1
const textTransition = `slide-in-bottom ${duration}s linear both 0s, ease-in forwards ${duration- 2}s`

///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////#  FUNCTIONS  #////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

//Sets timeout 
//n == duration
function delay(n){
    console.log("delay is active")
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
            img.style.objectPosition = "50vw 0";
            var imgDup = document.createElement("img");
            imgDup.src = data[i].url;
            imgDup.style.objectPosition = "-50vw 0";
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

//Handles current slide, and displays next slide
async function nextSlide(i, previousImg, previousTitle){
    let currentImg = document.querySelectorAll(`.img${i}`)
    let currentTitle = document.querySelector(`.title${i}`)
    handleTemplate(i, currentImg, currentTitle)
    console.log(currentImg[0])
    console.log(previousImg[0])
    currentTitle.classList.add("current")
    await delay(2)
    currentImg.forEach(element => {element.classList.add("current")});
    currentImg.forEach(element => { element.classList.remove("next")});
    currentTitle.classList.remove("next")
    previousImg.forEach(element => { element.classList.remove("current")});
    previousImg.forEach(element => { element.style.animation = ''});             
    previousTitle.classList.remove("current")
    previousTitle.style.animation = ''
}

//Loop through all images in slide
//Should be noted that this is an infinite loop
async function generateSlideshow(data) {
    for (let i = 0; i < data.length; i++) {
        console.log(i)
        if (i == 0) {
            let previousImg = document.querySelectorAll(`.img${data.length - 1}`)
            let previousTitle = document.querySelector(`.title${data.length - 1}`)
            nextSlide(i, previousImg, previousTitle)
            await delay(duration - 2)       
            let activeImg = document.querySelectorAll(`.img${i + 1}`)
            activeImg.forEach(element => { element.classList.add("next")});
        } else if (i == data.length - 1)  {
            let previousImg = document.querySelectorAll(`.img${i - 1}`)
            let previousTitle = document.querySelector(`.title${i - 1}`)

            nextSlide(i, previousImg, previousTitle) 
            await delay(duration - 2)
            let activeImg = document.querySelectorAll(`.img${0}`)
            activeImg.forEach(element => { element.classList.add("next")});
        } else {
            let previousImg = document.querySelectorAll(`.img${i - 1}`)
            let previousTitle = document.querySelector(`.title${i - 1}`)

            nextSlide(i, previousImg, previousTitle)
            await delay(duration - 2) 
            let activeImg = document.querySelectorAll(`.img${i + 1}`)
            activeImg.forEach(element => { element.classList.add("next")});
        }
    }
    generateSlideshow(data)    
}

//Applies anmimations depending on template
let style = 0
function handleTemplate(i, currentImg, currentTitle) {
    if (style == 4) {
        style = 0;
    }
    if (template == 0) {    
        currentTitle.style.animation = textAnimation;
        currentImg.forEach(element => { element.style.animation = imageAnimation[style]});
        style += 1
    } else if (template == 1) {
        currentTitle.style.animation = textTransition;
        currentImg[1].style.animation = rightToMiddle;
        currentImg[0].style.animation = leftToMiddle;
    }
}

generate(all)


