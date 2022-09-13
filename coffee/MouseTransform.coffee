buttons = {}

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
	textAlign CENTER,CENTER
	buttons.left = new Button 'left',0,-110,400,180,'white'
	buttons.pause = new Button 'pause',-100,0,200,40,'white'
	buttons.edit = new Button 'edit',100,0,200,40,'white'
	buttons.right = new Button 'right',0,110,400,180,'white'

draw = -> 
	background 'black'

	rotate 90
	translate 200,-200
	buttons.pause.draw()
	buttons.edit.draw()
	buttons.right.draw()
	push()
	rotate 180
	translate 0,220
	buttons.left.draw()
	pop()

mouseClicked = ->
	{x,y} = getLocalCoords()
	console.log x,y
	for key of buttons
		button = buttons[key]
		if button.inside(x,y) then console.log 'Clicked',key,x,y

class Button
	constructor : (@text,@x,@y,@w,@h,@bg) ->
	draw : ->
		fill @bg
		rect @x,@y,@w,@h
		fill 'black'
		text @text,@x,@y
	inside : (x,y) ->
		@x-@w/2 <= x <= @x+@w/2 and @y-@h/2 <= y <= @y+@h/2

mouseMoved = ->
	{x,y} = getLocalCoords()
	for key of buttons
		button = buttons[key]
		button.bg = if button.inside(x, y) then 'red' else 'white'