class Transformer
	constructor: (@x=0, @y=0, @a=0, @s=1, @stack=[]) ->
	push : ->
		push()
		@stack.push [@x,@y,@a,@s]
	pop : -> 
		pop()
		[@x,@y,@a,@s] = @stack.pop()
	rotate : (da) -> 
		rotate da
		@a += da
	scale : (ds) -> 
		scale ds
		@s *= ds
	translate : (dx,dy) -> 
		translate dx,dy
		@x += @s * dx * cos(@a) - @s * dy * sin(@a)
		@y += @s * dy * cos(@a) + @s * dx * sin(@a)
	dump : ->
		console.log @x,@y,@a,@s
		