const temp = document.querySelector('.temp_resul'),
    dayResalt = document.querySelector('.day_resalt'),
    img = document.querySelector('.img'),
    cities = document.querySelectorAll('.city'),
    cloud = document.querySelector('.cloud'),
    nameCity = document.querySelector('.name_city'),
    wind = document.querySelector('.wind'),
    cloudSvg = document.querySelector('.c_svg'),
    windSvg = document.querySelector('.w_svg'),
    hidden = document.querySelector('.hidden');


let city;

const startIcons = () => {

    if (cloud.textContent === 'Partly cloudy') {
        cloudSvg.src = './svg/partly-cloudy-svgrepo-com.svg';
    } else if (cloud.textContent === "Clear" || cloud.textContent === "Sunny") {
        cloudSvg.src = './svg/sun-svgrepo-com.svg';
    } else if (cloud.textContent === 'Patchy rain possible') {
        cloudSvg.src = './svg/rain-svgrepo-com.svg';
    } else { cloudSvg.src = './svg/bad-weather-svgrepo-com.svg' }

    const windEl = +wind.textContent.replace(/\D/g, '');

    if (windEl < 3) {
        windSvg.src = './svg/windmill-svgrepo-com.svg';
    } else
    if (windEl >= 4 && windEl < 20) {
        windSvg.src = './svg/wind-svgrepo-com.svg';
    } else {
        windSvg.src = './svg/wind-svgrepo-com-2.svg';
    }
};

const startRequest = () => {
    fetch(`https://goweather.herokuapp.com/weather/${city}`, {
            method: 'GET',
            mode: 'cors', //данные со сторонего сервера(как у нас) если мы используем нащ сервер то "same-origin"
            cache: 'default',
            referrer: 'client',
        })
        .then((response) => {
            if (response.status != 200) {
                throw new Error('status network not 200')
            }
            return (response.json())
        })
        .then((data) => {
            cloud.textContent = data.description
            wind.textContent = data.wind
            temp.textContent = data.temperature
            startIcons();
        })
        .catch((error) => console.log(error))
}

for (let i = 0; i < cities.length; i++) {
    cities[i].addEventListener('click', function(e) {
        hidden.classList.remove("hidden");
        city = cities[i].value;

        img.src = `./img/${cities[i].value}.jpg`;
        nameCity.textContent = e.target.innerText;

        startRequest();
    })
}