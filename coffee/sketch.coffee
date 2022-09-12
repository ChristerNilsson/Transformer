class Transformer
	constructor: (@x=0, @y=0, @a=0, @s=1, @stack=[]) ->
		@commands = []
	push : ->
		push()
		@stack.push [@x,@y,@a,@s]
	pop : -> 
		pop()
		[@x,@y,@a,@s] = @stack.pop()
	rotate : (da) -> 
		@commands.push "r #{da}"
		rotate da
		@a += da
	scale : (ds) -> 
		@commands.push "s #{ds}"
		scale ds
		@s *= ds
	translate : (dx,dy) -> 
		@commands.push "t #{dx} #{dy}"
		translate dx,dy
		@x += @s * dx * cos(@a) - @s * dy * sin(@a)
		@y += @s * dy * cos(@a) + @s * dx * sin(@a)
	getCommands : ->
		_.clone @commands
	backwards : (x,y,commands) ->
		for command in commands.reverse()
			arr = command.split ' '
			if arr[0] == 'r'
				a = -arr[1]
				x1 = x * cos(a) - y * sin(a)
				y1 = y * cos(a) + x * sin(a)
				[x,y] = [x1,y1]
			if command[0] == 's'
				x = x/arr[1]
				y = y/arr[1]
			if command[0] == 't'
				dx = arr[1]
				dy = arr[2]
				x -= dx
				y -= dy
		[x,y]

	dump : ->
		console.log @x,@y,@a,@s
		

button = 
tx = new Transformer()
col = 'black'

class Button
	constructor : (@x,@y,@w,@h) ->

	draw : ->
		fill col
		rect @x,@y,@w,@h

	inside : (x,y) ->
		@x-@w/2 <= x <= @x+@w/2 and @y-@h/2 <= y <= @y+@h/2

setup = ->
	createCanvas 400,300
	rectMode CENTER
	angleMode DEGREES
	button = new Button 0,0,20,40
	console.log 'ok'
	tx.dump()

grid = ->
	for i in range 0,width,10
		line i,0,i,height
	for j in range 0,height,10
		line 0,j,width,j

draw = ->
	tx = new Transformer
	tx.push()
	background 'gray'
	grid()

	tx.translate 100,50
	tx.translate 20,20
	tx.rotate 90
	#tx.scale 2

	button.commands = tx.getCommands()
	button.draw()
	tx.pop()

mouseMoved = ->
	[x,y] = tx.backwards mouseX,mouseY,button.commands
	col = if button.inside x,y then 'red' else 'white'

mouseClicked = ->
	console.log button.commands,tx.backwards mouseX,mouseY,button.commands