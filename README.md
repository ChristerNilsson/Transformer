# Transformer
Keeps track of translate, rotate, scale, push and pop in p5 and Javascript

Usage:

tf = new Transformer()

Prefix all calls to the following functions with tf.
* translate()
* rotate()
* scale()
* push()
* pop() 

To find out the current canvas coordinates just use tf.x and tf.y in the draw() function.
tf.a gives the current rotation and tf.s gives the current scale.

This information is of special interest in combination with mouseX and mouseY as these are expressed in canvas coordinates.
