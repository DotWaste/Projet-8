//Slides de la bannière
const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

//Déclaration de la constante de répétition
const repeat = true;
const noArrows = false;
const noBullets = false;

//Récupération du conteneur des slides en tant que constante, 
//et de la variable contenant le slide.
const container = document.querySelector('.banner');
let slide = slides;
let slideTotal = slide.length - 1;
let slideCurrent = -1;
let bannerImage = document.getElementById("bannerSlide")
let tagLine = document.getElementById("tag-line")


//Initialisation des bulletPoints
function initBullets() {
    if (noBullets) {
        return;
    }
    const bulletContainer = document.createElement('div');
    bulletContainer.classList.add('dots')
    slide.forEach((elem, i) => {
        const bullet = document.createElement('div');
        bullet.classList.add('dot')
        bullet.id = `bullet-index-${i}`
        bullet.addEventListener('click', () => {
            goToIndexSlide(i);
        })
        bulletContainer.appendChild(bullet);
        //elem.classList.add('proactivede');
    })
    container.appendChild(bulletContainer);
}

//Fonction d'initialisation des flèches.

function initArrows() {
    if (noArrows) {
        return;
    }
    const leftArrow = document.createElement('div')
    const iLeft = document.createElement('img')
	iLeft.id = "arrowLeft"
    iLeft.setAttribute("src", "assets/images/arrow_left.png")
	leftArrow.classList.add('arrow_left')
    leftArrow.classList.add('arrow')
    leftArrow.appendChild(iLeft)
    leftArrow.addEventListener('click', () => {
        slideLeft();
    })
    
    const rightArrow = document.createElement('div')
    const iRight = document.createElement('img')
	iRight.id = "arrowRight"
    iRight.setAttribute("src", "assets/images/arrow_right.png")
    rightArrow.classList.add('arrow_right')
    rightArrow.classList.add('arrow')
    rightArrow.appendChild(iRight)
    rightArrow.addEventListener('click', () => {
        slideRight();
    })
    container.prepend(leftArrow);
    container.appendChild(rightArrow);
}


//Initailisation du slider 
function slideInitial() {
    initBullets();
    initArrows();
    setTimeout(function () {
        slideRight();
    }, 500);
}

//Fonction de mise à jour du statut des bulletPoints
function updateBullet() {
    if (!noBullets) {
        document.querySelector('.dots').querySelectorAll('.dot').forEach((elem, i) => {
            elem.classList.remove('dot_selected');
            if (i === slideCurrent) {
                elem.classList.add('dot_selected');
            }
        })
    }
    checkRepeat();
}

//Affichage ou non des slides et répétition de l'ordre. 
function checkRepeat() {
    if (!repeat) {
        if (slideCurrent === slide.length - 1) {
            slide[0].classList.add('not-visible');
            slide[slide.length - 1].image.classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.arrow_right').classList.add('not-visible')
                document.querySelector('.arrow_left').classList.remove('not-visible')
            }
        }
        else if (slideCurrent === 0) {
            slide[slide.length - 1].classList.add('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.arrow_left').classList.add('not-visible')
                document.querySelector('.arrow_right').classList.remove('not-visible')
            }
        } else {
            slide[slide.length - 1].classList.remove('not-visible');
            slide[0].classList.remove('not-visible');
            if (!noArrows) {
                document.querySelector('.arrow_left').classList.remove('not-visible')
                document.querySelector('.arrow_right').classList.remove('not-visible')
            }
        }
    }
}

//Fonction de défilement droit, avec mise à jour du bulletPoint
//grâce a updateBullet()
function slideRight() {
    if (slideCurrent < slideTotal) {
        slideCurrent++;
    } else {
        slideCurrent = 0;
    }
	//bannerImage.src = slide[slideCurrent].image
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1].image;
    } else {
        var preactiveSlide = slide[slideTotal].image;
    }
    bannerImage.src = "./assets/images/slideshow/" + slide[slideCurrent].image
    tagLine.innerHTML = slide[slideCurrent].tagLine
    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1].image;
    } else {
        var proactiveSlide = slide[0].image;
    }

    updateBullet();
}


//Fonction de défilement gauche, avec mise à jour du bulletPoint
//grâce a updateBullet()
function slideLeft() {
    if (slideCurrent > 0) {
        slideCurrent--;
    } else {
        slideCurrent = slideTotal;
    }

    if (slideCurrent < slideTotal) {
        var proactiveSlide = slide[slideCurrent + 1];
    } else {
        var proactiveSlide = slide[0];
    }
    bannerImage.src = "./assets/images/slideshow/" + slide[slideCurrent].image
    tagLine.innerHTML = slide[slideCurrent].tagLine
    if (slideCurrent > 0) {
        var preactiveSlide = slide[slideCurrent - 1];
    } else {
        var preactiveSlide = slide[slideTotal];
    }

    updateBullet();
}

//Fonction permettant de changer de slide pour celle que 
//l'on veut dans la liste. 
function goToIndexSlide(index) {
    const sliding = (slideCurrent > index) ? () => slideRight() : () => slideLeft();
    while (slideCurrent !== index) {
        sliding();
    }
}

slideInitial();