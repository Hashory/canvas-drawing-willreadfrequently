/**
 * CanvasDrawer class encapsulates the drawing logic for a specified canvas element.
 * It handles pointer events to enable drawing on the canvas.
 */
export class CanvasDrawer {
	/**
	 * Creates an instance of CanvasDrawer.
	 * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
	 * @param {boolean} [willReadFrequently=false] - Whether the canvas will be read frequently.
	 */
	constructor(canvas, willReadFrequently = false) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d", {
			willReadFrequently: willReadFrequently,
		});

		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 10;
		this.ctx.lineJoin = "round";
		this.ctx.lineCap = "round";

		this.drawing = false;
		this.rect = this.canvas.getBoundingClientRect();

		this.canvas.addEventListener(
			"pointerdown",
			this.pointerDownHandler.bind(this),
		);
		this.canvas.addEventListener(
			"pointermove",
			this.pointerMoveHandler.bind(this),
		);
		this.canvas.addEventListener("pointerup", this.pointerUpHandler.bind(this));
	}

	pointerDownHandler(event) {
		this.drawing = true;
		this.ctx.beginPath();
		this.ctx.moveTo(event.offsetX, event.offsetY);
	}

	pointerMoveHandler(event) {
		if (!this.drawing) return;
		this.ctx.lineTo(event.offsetX, event.offsetY);
		this.ctx.stroke();
	}

	pointerUpHandler(event) {
		this.drawing = false;
	}
}

const canvasDrawer1 = new CanvasDrawer(
	document.getElementById("canvas1", true),
);
const canvasDrawer2 = new CanvasDrawer(
	document.getElementById("canvas2", false),
);
