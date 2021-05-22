const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const particles = []

const mouse = {
	x: null,
	y: null,
	radius: (canvas.height / 80) * (canvas.width / 80)
}

canvas.addEventListener("mousemove", event => {
	mouse.x = event.x
	mouse.y = event.y
	for (let i = 0; i < 10; i++) {
		particles.push(new Particle())
	}
})

class Particle {
	constructor (x, y, speedX, speedY, size, color) {
		this.x = x
		this.y = y
		this.speedX = speedX
		this.speedY = speedY
		this.size = size
		this.color = color
	}

	draw () {
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fillStyle = "#8C5523"
		ctx.fill()
	}

	update () {
		if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX
		if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY

		const dx = mouse.x - this.x
		const dy = mouse.y - this.y
		const distance = Math.sqrt(dx * dx + dy * dy)
		if (distance < mouse.radius + this.size) {
			if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10
			if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10
			if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10
			if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10
		}

		this.x += this.speedX
		this.y += this.speedY

		this.draw()
	}
}

function init () {
	const numberOfParticles = (canvas.height * canvas.width) / 9000
	for (let i = 0; i < numberOfParticles; i++) {
		const size = (Math.random() * 5) + 1
		const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
		const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
		const speedX = (Math.random() * 5) - 2.5
		const speedY = (Math.random() * 5) - 2.5
		const color = "#8C5523"

		particles.push(new Particle(x, y, speedX, speedY, size, color))
	}
}

function animate () {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for (let i = 0; i < particles.length; i++) {
		particles[i].update()
	}
	connect()
	requestAnimationFrame(animate)
}

function connect () {
	let opacity = 1
	for (let i = 0; i < particles.length; i++) {
		for (let j = i; j < particles.length; j++) {
			const dx = particles[i].x - particles[j].x
			const dy = particles[i].y - particles[j].y
			const distance = dx * dx + dy * dy
			if (distance < (canvas.width / 7) * (canvas.height / 7)) {
				opacity = 1 - (distance / 20000)
				ctx.strokeStyle = `rgba(140, 85, 31, ${opacity})`
				ctx.lineWidth = 1
				ctx.beginPath()
				ctx.moveTo(particles[i].x, particles[i].y)
				ctx.lineTo(particles[j].x, particles[j].y)
				ctx.stroke()
			}
		}
	}
}

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

	mouse.radius = ((canvas.height / 80) * (canvas.width / 80))

	init()
})

window.addEventListener("mouseout", () => {
	mouse.x = undefined
	mouse.y = undefined
})

init()
animate()






/*
canvas.addEventListener("click", event => {
	mouse.x = event.x
	mouse.y = event.y
	for (let i = 0; i < 10; i++) {
		particles.push(new Particle())
	}
})

let hue = 0;

function handleParticles () {
	for (let i = 0; i < particles.length; i++) {
		particles[i].update()
		particles[i].draw()
		for (let j = i; j < particles.length; j++) {
			const dx = particles[i].x - particles[j].x
			const dy = particles[i].y - particles[j].y
			const distance = Math.sqrt(dx * dx + dy * dy)
			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particles[i].color
				ctx.lineWidth = 0.2
				ctx.moveTo(particles[i].x, particles[i].y)
				ctx.lineTo(particles[j].x, particles[j].y)
				ctx.stroke()
			}
		}
		if (particles[i].size < 0.3) {
			particles.splice(i, 1)
			i--
		}
	}
}
*/