//http://127.0.0.1:5500/index.html?server=true&template=0&titlePrio=&positionPrio=&duration=5&0_url=images/test0.jpg&0_title=image0&0_position=8&1_url=images/test1.jpg&1_title=image1&1_position=4&2_url=images/test2.jpg&2_title=image2&2_position=3&3_url=images/test3.jpg&3_title=image3&3_position=2


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
    `kenburns-top ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-right ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration - 2}s`,
    `kenburns-bottom ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
    `kenburns-left ${duration}s linear both 0s, fade-out 2s ease-in forwards ${duration- 2}s`,
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

function generate(data) {
    for (let i = 0; i < data.length; i++) {
        var imgContainer = document.createElement("div")
        var images = document.querySelector(".images");
        var img = document.createElement("img");


        img.src = data[i].url;
        img.classList = `img${i} img`

        
        images.appendChild(img)
        
        
        title.innerHTML = data[i].title

        title.classList = `title${i} title slot${data[i].position}`
        
        var title = document.createElement("h1");
        var titles = document.querySelector(".titles");
        var titleContainer = document.createElement("div")
        titles.appendChild(title)
    }
   
}

generate(all)