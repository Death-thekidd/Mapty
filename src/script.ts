// prettier-ignore
const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form: HTMLFormElement = document.querySelector(".form")!;
const containerWorkouts = document.querySelector(".workouts")!;
const inputType = document.querySelector(".form__input--type")!;
const inputDistance: HTMLInputElement = document.querySelector(
	".form__input--distance"
)!;
const inputDuration: HTMLInputElement = document.querySelector(
	".form__input--duration"
)!;
const inputCadence: HTMLInputElement = document.querySelector(
	".form__input--cadence"
)!;
const inputElevation: HTMLInputElement = document.querySelector(
	".form__input--elevation"
)!;

class App {
	private map: any;
	private mapEvent: any;
	constructor() {
		this.getPosition();

		form.addEventListener("submit", this.newWorkout.bind(this));

		inputType.addEventListener("change", this.toggleElevationField.bind(this));
	}

	private getPosition() {
		navigator.geolocation.getCurrentPosition(
			this.loadMap.bind(this),
			function () {
				alert("Could not get your position");
			}
		);
	}

	private loadMap(position: any) {
		console.log(position);
		const { latitude } = position.coords;
		const { longitude } = position.coords;
		console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

		const coords = [latitude, longitude];

		this.map = L.map("map").setView(coords, 13);
		// console.log(map);

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.map);

		// Handling clicks on map
		this.map.on("click", this.showForm.bind(this));
	}

	private showForm(mapE: any) {
		this.mapEvent = mapE;
		form.classList.remove("hidden");
		inputDistance.focus();
	}

	private toggleElevationField() {
		inputElevation.closest(".form__row")?.classList.toggle("form__row--hidden");
		inputCadence.closest(".form__row")?.classList.toggle("form__row--hidden");
	}

	private newWorkout(e: Event) {
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
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: "running-popup",
				})
			)
			.setPopupContent("Workout")
			.openPopup();
	}
}

const app = new App();
