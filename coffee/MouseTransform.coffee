buttons = {}
SCALEX = 1
SCALEY = 1

# Löser problemet! Transformeringar behöver inte skötas!
# Alternativ som fungerar lika bra, men kräver mer kod.
# https://www.reddit.com/r/p5js/comments/jo7ucf/clicking_on_a_translated_scaled_and_rotated_shape/

getLocalCoords = -> # tar 3 microsekunder
	matrix = drawingContext.getTransform()
	pd = pixelDensity()
	matrix.inverse().transformPoint new DOMPoint mouseX * pd,mouseY * pd

class Button
	constructor : (@text,@x,@y,@w,@h,@bg) ->
		@inverted = false
	draw : ->
		fill @bg
		rect @x,@y,@w,@h
		fill 'black'
		if @inverted
			push()
			translate @x,@y # tillbaka till origo
			rotate 180  # vänd
			translate -@x,-@y # tillbaka till x,y
			text @text,@x,@y
			pop()
		else
			text @text,@x,@y
	inside : (x,y) -> -@w/2 <= x-@x <= @w/2 and -@h/2 <= y-@y <= @h/2

windowResized = ->
	resizeCanvas innerWidth, innerHeight
	SCALEY = width/100
	SCALEX = height/100
	diag = sqrt width*width + height*height
	console.log 'resized',width,height,SCALEX,SCALEY

setup = ->
	createCanvas 100,100 # innerWidth,innerHeight
	SCALEY = width/100
	SCALEX = height/100
	console.log 'setup',width,height,SCALEX,SCALEY
	rectMode CENTER
	angleMode DEGREES
	textAlign CENTER,CENTER

	# rectMode CENTER
	buttons.left  = new Button 'left', 50,22,100,44,'white'
	buttons.pause = new Button 'pause',25,50, 50,12,'white'
	buttons.edit  = new Button 'edit', 75,50, 50,12,'white'
	buttons.right = new Button 'right',50,78,100,44,'white'

	buttons.left.inverted = true

draw = -> 
	background 'black'
	translate -50,-50 # tillbaka till origo
	rotate 90  # vänd
	translate 50,-(50+width) # tillbaka till x,y

	scale SCALEX,SCALEY
	strokeWeight 1/SCALEX
	buttons.pause.draw()
	buttons.edit.draw()
	buttons.right.draw()
	buttons.left.draw()
	
mouseClicked = ->
	{x,y} = getLocalCoords()
	console.log x,y
	for key of buttons
		button = buttons[key]
		if button.inside(x,y) then console.log 'Clicked',key,x,y

mouseMoved = ->
	{x,y} = getLocalCoords()
	for key of buttons
		button = buttons[key]
		button.bg = if button.inside(x, y) then 'red' else 'white'