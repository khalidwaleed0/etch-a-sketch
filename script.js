let mouseDown = 0;
let color = "black";
let rainbowMode = false;
const sliderValue = document.querySelector("p");
const slider = document.querySelector(".slider");
document.body.onmousedown = () => (mouseDown = 1);
document.body.onmouseup = () => (mouseDown = 0);
addGridListeners();
addButtonListeners();
addButtonSelectionEffect();
addSliderListener();
addColorPaletteListener();

function addColorPaletteListener() {
	let colorPalette = document.querySelector(".color-palette");
	colorPalette.addEventListener("input", (e) => (color = e.target.value));
}

function addSliderListener() {
	slider.addEventListener("input", (e) => {
		sliderValue.innerText = slider.value + " x " + slider.value;
	});
	slider.addEventListener("mouseup", (e) => {
		changeGridSize(Math.pow(e.target.value, 2));
		addGridListeners();
	});
}

function changeGridSize(selectedSize) {
	let grid = document.querySelector(".grid-container");
	grid.innerHTML = "";
	for (let i = 0; i < selectedSize; i++) {
		grid.append(document.createElement("div"));
	}

	let length = Math.sqrt(selectedSize);
	grid.style.gridTemplateRows = `repeat(${length}, 0px)`;
	grid.style.gridTemplateColumns = `repeat(${length}, 0px)`;
	grid.style.gridRowGap = `${500 / length}px`;
	grid.style.gridColumnGap = `${500 / length}px`;
	grid.querySelectorAll("div").forEach((item) => {
		item.style.width = `${500 / length}px`;
		item.style.height = `${500 / length}px`;
	});
}

function addButtonListeners() {
	document.querySelector("#color-mode-btn").addEventListener("click", () => {
		color = "black";
		rainbowMode = false;
	});
	document.querySelector("#rainbow-mode-btn").addEventListener("click", () => (rainbowMode = true));
	document.querySelector("#eraser-btn").addEventListener("click", () => {
		color = "white";
		rainbowMode = false;
	});
	document.querySelector("#clear-btn").addEventListener("click", () => {
		document.querySelectorAll(".grid-container div").forEach((item) => {
			item.style.backgroundColor = "white";
		});
	});
}

function addButtonSelectionEffect() {
	const drawingButtons = document.querySelectorAll("button:not(button[id='clear-btn'])");
	drawingButtons.forEach((item) => {
		item.addEventListener("click", (e) => {
			drawingButtons.forEach((oldItem) => oldItem.classList.remove("selected"));
			e.target.classList.add("selected");
		});
	});
}

function addGridListeners() {
	document.querySelectorAll(".grid-container div").forEach((item) => {
		item.addEventListener("dragstart", (e) => {
			mouseDown = 1;
			e.preventDefault();
		});
		item.addEventListener("mouseover", () => {
			if (mouseDown) {
				if (rainbowMode) color = "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
				item.style.backgroundColor = color;
			}
		});
		item.addEventListener("mousedown", () => {
			if (rainbowMode) color = (Math.random() * 0xfffff * 1000000).toString(16);
			item.style.backgroundColor = color;
		});
	});
}
