let randomY = []
let numPts = 25

function setup() {let weatherJSON 
let minTemp = Infinity
let maxTemp = -Infinity
let images = {}
let dx

function preload() {
  weatherJSON = loadJSON("https://api.weather.gov/gridpoints/OKX/33,37/forecast")  
}
                  
function setup() {
  createCanvas(600, 400);
  dx = width/(weatherJSON.properties.periods.length+2)
  
  for( const p of weatherJSON.properties.periods ) {
    minTemp = min(p.temperature, minTemp)
    maxTemp = max(p.temperature, maxTemp)
 
  }
  noLoop()
}
                  
function draw() {
  background(220)
  
  textAlign(CENTER)
  text("Temperature Trends for Upcoming Days", width / 2, 30)
  
  textSize(12)
  textAlign(CENTER)
  translate(20, 400/ 2)
  rotate(-PI / 2)
  text("Temperature (°F)")
  
  text("Days", 300, 390);
  
  //How do I draw on this thing!!!!
  
  let px = dx // dx * (i+1), where i = 0
  let py = map( weatherJSON.properties.periods[0].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
  for( let i = 1; i < weatherJSON.properties.periods.length; i++ ) {
    let cx = dx * (i+1)
    let cy = map( weatherJSON.properties.periods[i].temperature, minTemp, maxTemp, 0.8*height, 0.2*height)
    line(px,py,cx,cy)
    px = cx
    py = cy

  }
}

function keyPressed() {
  redraw()
}
  createCanvas(400, 400)
  
  for(let i =0; i< numPts; i++){
   randomY.push(random(100,300));
  }
}

function draw() {
  background(220)
  
  drawLines()
  drawEllipses()
}

function drawEllipses(){
  noStroke()
    // draw ellipses
  for(let i =0; i < randomY.length; i++){
    let x = i * (width / (numPts-1))
    let y = randomY[i]
    ellipse(x, y, 7)
  }
}

function drawLines(){
  stroke(0)
 // draw lines
  let px = 0
  let py = randomY[0]
  for(let i =0; i < randomY.length; i++){
    let x = i * (width / (numPts-1))
    let y = randomY[i]
    line(px, py, x, y)
    
  	//store the last position
    px = x
    py = y
  } 
}
