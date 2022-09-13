buttons = {}

# Löser problemet! Transformeringar behöver inte skötas!
# Alternativ som fungerar lika bra, men kräver mer kod.
# https://www.reddit.com/r/p5js/comments/jo7ucf/clicking_on_a_translated_scaled_and_rotated_shape/

getLocalCoords = -> # tar 3 microsekunder
	matrix = drawingContext.getTransform()
	pd = pixelDensity()
	matrix.inverse().transformPoint new DOMPoint mouseX * pd,mouseY * pd

# procentuella versioner:
pw = (x) -> x/100 * height
ph = (y) -> y/100 * width
pd = (s) -> s/100 * sqrt width*width + height*height
pimage = (img,x,y,w,h) -> image img, pw(x), ph(y), pw(w), ph(h)
prect = (x,y,w,h) -> rect pw(x), ph(y), pw(w), ph(h)
ptext = (t,x,y) -> text t, pw(x), ph(y)
ptextSize = (s) -> textSize pd(s)
ptranslate = (x,y) -> translate pw(x), ph(y)

setup = ->
	canvas = createCanvas 300,200
	rectMode CENTER
	angleMode DEGREES
	textAlign CENTER,CENTER

	w = width
	h = height
	q = h/10 # höjden på knapparna i mitten

	buttons.left = new Button 'left',0,q-h/2,h,(w-q)/2,'white'
	buttons.pause = new Button 'pause',-h/4,0,h/2,q,'white'
	buttons.edit = new Button 'edit',h/4,0,h/2,q,'white'
	buttons.right = new Button 'right',0,h/2-q,h,(w-q)/2,'white'
	buttons.left.inverted = true

draw = -> 
	background 'black'

	rotate 90
	translate height/2,-width/2
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

mouseMoved = ->
	{x,y} = getLocalCoords()
	for key of buttons
		button = buttons[key]
		button.bg = if button.inside(x, y) then 'red' else 'white'