// callTheImage => functie is een functie die van mijn api,
// de data gaat halen in vorm van array
// en nadien na een beplaade tijd, de info toont

window.onload = function callTheImage() {
    let counter = 0;

    let timer = setInterval(function () {
        fetch("http://localhost:3000/images")
            .then(res => res.json())
            .then(result => {
                console.log(result[counter].imageURL);
                image.src = result[counter].imageURL;

                counter++;
                if (counter > 3) return counter = 0;
            })
            .catch(err => console.log(err));
    }, 5000);
}