class Transformer
	constructor : (@x=0, @y=0, @a=0, @s=1, @stack=[]) ->
	push : ->
		@stack.push [@x,@y,@a,@s]
		push()
	pop : ->
		[@x,@y,@a,@s] = @stack.pop()
		pop()
	rotate : (da) ->
		@a += da
		rotate da
	scale : (ds) ->
		@s *= ds
		scale ds
	translate : (dx,dy) ->
		@x += @s * dx * cos(@a) - @s * dy * sin(@a)
		@y += @s * dy * cos(@a) + @s * dx * sin(@a)
		translate dx,dy
