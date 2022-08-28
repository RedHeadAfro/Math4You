// Using CountAPI
// Counts how many times the website has been clicked on
function websiteVisits(response) {
    document.querySelector("#visits").innerHTML = response.value;
}


// SLIDESHOW --> de mechanimse compleet veranderd allen het stukje van het fetchen is van mij (https://www.w3schools.com/howto/howto_js_slideshow.asp )
// Dit stukje code is van mij !
// Het fetchen van data op volgende host 
fetch("http://localhost:3000/images")
    .then(res => res.json())
    .then(result => {
        // een src geven adh van de imageURL van mijn api
        img1.src = result[0].imageURL;
        img2.src = result[2].imageURL;
    })
    .catch(err => console.log(err));


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}