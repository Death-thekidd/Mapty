"use strict";
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
class Workout {
    coords;
    distance;
    duration;
    date = new Date();
    id = (Date.now() + "").slice(-10);
    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}
class Running extends Workout {
    cadence;
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }
    calcPace() {
        //* min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}
class Cycling extends Workout {
    elevationGain;
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }
    calcSpeed() {
        //* km/h
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}
const run1 = new Running([39, -12], 5.2, 24, 178);
const cycling1 = new Cycling([39, -12], 5.2, 24, 523);
console.log(run1, cycling1);
class App {
    map;
    mapEvent;
    constructor() {
        this.getPosition();
        form.addEventListener("submit", this.newWorkout.bind(this));
        inputType.options[0].selected = true;
        inputType.addEventListener("change", this.toggleElevationField.bind(this));
    }
    getPosition() {
        navigator.geolocation.getCurrentPosition(this.loadMap.bind(this), function () {
            alert("Could not get your position");
        });
    }
    loadMap(position) {
        console.log(position);
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        const coords = [latitude, longitude];
        this.map = L.map("map").setView(coords, 13);
        // console.log(map);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);
        // Handling clicks on map
        this.map.on("click", this.showForm.bind(this));
    }
    showForm(mapE) {
        this.mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }
    toggleElevationField(e) {
        e.preventDefault();
        inputElevation.closest(".form__row")?.classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row")?.classList.toggle("form__row--hidden");
    }
    newWorkout(e) {
        e.preventDefault();
        //* Clear input fields
        inputDistance.value =
            inputDuration.value =
                inputCadence.value =
                    inputElevation.value =
                        "";
        console.log(this.mapEvent);
        const { lat, lng } = this.mapEvent.latlng;
        L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup",
        }))
            .setPopupContent("Workout")
            .openPopup();
    }
}
const app = new App();
//# sourceMappingURL=script.js.map