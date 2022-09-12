buttons = []

# Löser problemet! Transformeringar behöver inte skötas!
# Alternativ som fungerar lika bra, men kräver mer kod.
# https://www.reddit.com/r/p5js/comments/jo7ucf/clicking_on_a_translated_scaled_and_rotated_shape/

getLocalCoords = -> # tar 3 microsekunder
	matrix = drawingContext.getTransform()
	pd = pixelDensity()
	matrix.inverse().transformPoint new DOMPoint mouseX * pd,mouseY * pd

setup = ->
	canvas = createCanvas 400,400
	rectMode CENTER
	angleMode DEGREES
	buttons.push new Button 0,0,100,100,'white'
	buttons.push new Button 100,100,50,50,'white'

draw = -> 
	background 'black'

	translate 200,200
	rotate 45
	translate -20,-20
	scale 2
	translate -20,-20
	rotate 5
	for button in buttons
		button.draw()

mouseClicked = ->
	{x,y} = getLocalCoords()
	for button in buttons
		if button.inside(x,y) then console.log 'Clicked',x,y

class Button
	constructor : (@x,@y,@w,@h,@bg) ->
	draw : ->
		fill @bg
		rect @x,@y,@w,@h
	inside : (x,y) ->
		@x-@w/2 <= x <= @x+@w/2 and @y-@h/2 <= y <= @y+@h/2

mouseMoved = ->
	{x,y} = getLocalCoords()
	for button in buttons
		button.bg = if button.inside(x, y) then 'red' else 'white'