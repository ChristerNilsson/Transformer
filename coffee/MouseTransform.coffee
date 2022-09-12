canvas = null
mtx = null
buttons = []

class MouseTransformed 
	
	constructor : ->
		@mouseStack = []
		@mouseStack.push new MouseParameters()
		@resetMouse()
	
	pushMatrix : ->
		push()
		last = _.last @mouseStack
		@mouseStack.push new MouseParameters last.x, last.y, last.R, last.S
	
	popMatrix : ->
		if _.size(@mouseStack) > 1
			pop()
			@mouseStack.pop()
	
	# Translate current animation and mouse matrices.
	translate : (dx, dy) ->
		translate dx, dy
		last = _.last @mouseStack
		R = last.R
		S = last.S
		last.x += cos(R)*S*dx - sin(R)*S*dy
		last.y += cos(R)*S*dy + sin(R)*S*dx
	
	scale : (x) ->
		scale x
		last = _.last @mouseStack
		last.S *= x
	
	rotate : (angle) ->
		rotate angle
		_.last(@mouseStack).R += angle

	resetMouse : -> _.last(@mouseStack).reset()
	
	mouseX : (x,y) ->
		last = _.last @mouseStack
		R = last.R
		S = last.S
		cos(R)/S*(x - last.x) + sin(R)/S*(y - last.y)

	mouseY : (x,y) ->
		last = _.last @mouseStack
		R = last.R
		S = last.S
		cos(R)/S*(y - last.y) - sin(R)/S*(x - last.x)


class MouseParameters
	constructor : (@ix=0, @iy=0, @iR=0, @iS=1) -> @reset()
	reset : ->
		@x = @ix
		@y = @iy 
		@R = @iR
		@S = @iS

###############################################

setup = ->
	canvas = createCanvas 400,400
	rectMode CENTER
	angleMode DEGREES
	buttons.push new Button 0,0,100,100,'white'
	buttons.push new Button 100,100,50,50,'white'

draw = -> 
	mtx = new MouseTransformed()
	background 'black'

	mtx.pushMatrix()
	mtx.translate 200,200
	mtx.rotate 45
	mtx.translate -20,-20
	mtx.scale 2
	mtx.translate -20,-20
	mtx.rotate 5
	for button in buttons
		button.draw()
	#mtx.popMatrix() # KNAS! Musen fungerar inte längre

mouseClicked = ->
	for button in buttons
		if button.inside() then console.log 'Clicked'

class Button
	constructor : (@x,@y,@w,@h,@bg) ->
	draw : ->
		fill @bg
		rect @x,@y,@w,@h
	inside : (x,y) ->
		#x = mtx.mouseX mouseX,mouseY
		#y = mtx.mouseY mouseX,mouseY
		@x-@w/2 <= x <= @x+@w/2 and @y-@h/2 <= y <= @y+@h/2

mouseMoved = ->
	matrix = drawingContext.getTransform()
	localCoord = matrix
		.inverse()
		.transformPoint(
			new DOMPoint(
				mouseX * pixelDensity(),
				mouseY * pixelDensity()
			)
		)
	
	for button in buttons
		button.bg = if button.inside(localCoord.x, localCoord.y) then 'red' else 'white'