const tagline = document.querySelector('.nav__brand--tag');
const latest = document.querySelector('.nav__brand--latest');
const latestWords = document.querySelector('.nav__brand--latest span');

const headingWords = [ 
    ' Nice, too bad is a collection of my work as a creative director and front-end developer.', ' Full site coming soon.'];

const cursor = document.querySelector('.nav__brand--cursor');

let typing;
let charI = 0;
let arrI = 0;
let delayTime = 1000;

const startTyping = () => {
    if (charI<headingWords[arrI].length) {
        cursor.classList.add('typing');
        tagline.innerHTML += headingWords[arrI][charI];
        charI++
        var tOid = setTimeout(startTyping, 25);
    } else if (arrI < headingWords.length - 1) {
        cursor.classList.remove('typing');

        arrI++;
        charI=0;
        tagline.textContent += headingWords[arrI][charI];
        charI++;
        delayTime += 500;
        var tOid = setTimeout(startTyping, delayTime);
    } else {
        cursor.classList.remove('typing');
        clearTimeout(tOid);
    }
}

const appear = () => {
    latest.classList.add('appear-bg')
    latestWords.classList.add('appear-txt')
}

function start() {
    setTimeout(startTyping, 1000);
    setTimeout(appear, 6000);
}

start();







function getRandomWithinRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const col = document.querySelector('.content');
const box = document.getElementById("box"),
ctx = box.getContext("2d");
box.width = col.clientWidth;
box.height = col.clientHeight;
let hue = 0;
let outsideHue = 0;


window.addEventListener('resize', function() {
	box.width = col.clientWidth;
	box.height = col.clientHeight;
})


class Img {
	constructor(img, startX, startY) {
			this.img = new Image(75 , 75);
			this.x = startX
			this.y = startY
			this.dx = Math.random() * 2;
			this.dy = Math.random() * 2;
			this.img.src = `img/${img}.png`;
			this.colour = 'red';
			this.collided = 0;
	}
	draw() {
			// ctx.save();
			// ctx.rotate(20*Math.PI/180)
			ctx.drawImage(
					this.img,
					this.x - this.img.width / 2,
					this.y - this.img.height / 2,
					this.img.width,
					this.img.height
			)
			
			// ctx.restore();
	}
	move() {
			if (this.x < this.img.width/2 || this.x > box.width - this.img.width/2) { 		
					this.dx=-this.dx; 
			}
			if (this.y < this.img.height/2 || this.y > box.height - this.img.height/2) { 
					this.dy=-this.dy;
			}
			this.x += this.dx;
			this.y += this.dy;
	}
}

const arr = [new Img('logo-n', 100, 100), new Img('logo-t', 200, 250), new Img('logo-b', 250, 150)];


function createImg() {
	// console.log('creating images')
	
	for(let i = 0; i < arr.length; i++) {

			for(let j = i; j < arr.length; j++) {

					// const distX = arr[i].x - arr[j].x;
					// const distY = arr[i].y - arr[j].y;
					// const dist = Math.sqrt(distX * distX + distY * distY);

					if(arr[i].collided || arr[j].collided) {
							hue += .03;
							ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
							ctx.lineWidth = arr[i].collided + arr[j].collided;
							ctx.beginPath();
							ctx.moveTo(arr[i].x, arr[i].y); //correct
							ctx.lineTo(arr[j].x, arr[j].y);
							ctx.stroke();
					} 
			}
			
	}


	for(let k=0; k<arr.length; k++) {
			arr[k].move();
			arr[k].draw();

			if(arr[k].x <= 0 + arr[k].img.width/2 || arr[k].x >= box.width - arr[k].img.width/2 || arr[k].y <= 0 + arr[k].img.width/2 || arr[k].y >= box.height - arr[k].img.width/2) {
					console.log('edge!')
			} else {

					for(let l=k+1; l<arr.length; l++) {
							//distance
							const distX = arr[k].x - arr[l].x;
							const distY = arr[k].y - arr[l].y;
							const dist = Math.sqrt(distX * distX + distY * distY);
							// console.log(distX);
							// console.log(`k: ${arr[k].img.src}, l: ${arr[l].img.src}`)
	
							if (dist < arr[k].img.width) {
									// console.log(`x: ${arr[k].x}, y: ${arr[l].x} --- dist: ${dist}`)
									// console.log(dist)
	
									arr[k].dx *= -1;
									arr[k].dy *= -1;
									arr[l].dx *= -1;
									arr[l].dy *= -1;
									
	
									hue += 50;
	
									if (arr[k].collided + arr[l].collided > 60) {
											arr[k].collided  = 30
											arr[l].collided  = 30
									} else {
											arr[k].collided += 3
											arr[l].collided += 3
									}

									changeOutsideColour(hue);
							}
					}

			}
	}
}

function animate () {
	
	ctx.clearRect(0, 0, box.width, box.height);
	createImg();
	requestAnimationFrame(animate);
}

animate();

const nav = document.querySelector('.nav')
// const linkOne = document.querySelector('#link1')
// const linkTwo = document.querySelector('#link2')
// const linkThree = document.querySelector('#link3')
const taglineText = document.querySelector('.nav__brand--tag')

function changeOutsideColour(hue) {
	nav.style.backgroundColor = `hsl(${hue}, 50%, 75%)`
	// linkOne.style.color = `hsl(${hue}, 75%, 75%)`
	// taglineText.style.color = `hsl(${hue}, 65%, 40%)`
}