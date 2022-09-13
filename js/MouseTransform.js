// Generated by CoffeeScript 2.5.1
var Button, SCALEX, SCALEY, TOGGLE, buttons, draw, getLocalCoords, mouseClicked, mouseMoved, setup, windowResized;

buttons = {};

SCALEX = 1;

SCALEY = 1;

TOGGLE = 1; // 0=porträtt 1=landskap


// Löser problemet! Transformeringar behöver inte skötas!
// Alternativ som fungerar lika bra, men kräver mer kod.
// https://www.reddit.com/r/p5js/comments/jo7ucf/clicking_on_a_translated_scaled_and_rotated_shape/
getLocalCoords = function() { // tar 3 microsekunder
  var matrix, pd;
  matrix = drawingContext.getTransform();
  pd = pixelDensity();
  return matrix.inverse().transformPoint(new DOMPoint(mouseX * pd, mouseY * pd));
};

Button = class Button {
  constructor(text1, x1, y1, w, h, bg) {
    this.text = text1;
    this.x = x1;
    this.y = y1;
    this.w = w;
    this.h = h;
    this.bg = bg;
    this.inverted = false;
  }

  draw() {
    fill(this.bg);
    rect(this.x, this.y, this.w, this.h);
    fill('black');
    if (this.inverted) {
      push();
      translate(this.x, this.y); // tillbaka till origo
      rotate(180); // vänd
      translate(-this.x, -this.y); // tillbaka till x,y
      text(this.text, this.x, this.y);
      return pop();
    } else {
      return text(this.text, this.x, this.y);
    }
  }

  inside(x, y) {
    var ref, ref1;
    return (-this.w / 2 <= (ref = x - this.x) && ref < this.w / 2) && (-this.h / 2 <= (ref1 = y - this.y) && ref1 < this.h / 2);
  }

};

windowResized = function() {
  var diag;
  resizeCanvas(innerWidth, innerHeight);
  SCALEY = TOGGLE === 0 ? height / 100 : width / 100;
  SCALEX = TOGGLE === 0 ? width / 100 : height / 100;
  return diag = sqrt(width * width + height * height);
};

//console.log 'resized',width,height,SCALEX,SCALEY
setup = function() {
  createCanvas(100, 100); // innerWidth,innerHeight
  SCALEY = TOGGLE === 0 ? height / 100 : width / 100;
  SCALEX = TOGGLE === 0 ? width / 100 : height / 100;
  console.log('setup', width, height, SCALEX, SCALEY);
  rectMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  buttons.left = new Button('left', 50, 22, 100, 44, 'white');
  buttons.pause = new Button('pause', 25, 50, 50, 12, 'white');
  buttons.edit = new Button('edit', 75, 50, 50, 12, 'white');
  buttons.right = new Button('right', 50, 78, 100, 44, 'white');
  return buttons.left.inverted = true;
};

draw = function() {
  background('black');
  if (TOGGLE === 1) {
    translate(50, 50); // flytta koordinatsystemet till sidans mittpunkt
    rotate(90); // rotera koordinatsystemet
    translate(-50, 50 - width); // width # flytta tillbaks
  }
  scale(SCALEX, SCALEY);
  strokeWeight(1 / SCALEX);
  buttons.pause.draw();
  buttons.edit.draw();
  buttons.right.draw();
  return buttons.left.draw();
};

mouseClicked = function() {
  var button, key, results, x, y;
  ({x, y} = getLocalCoords());
  console.log(x, y);
  results = [];
  for (key in buttons) {
    button = buttons[key];
    if (button.inside(x, y)) {
      results.push(console.log('Clicked', key, x, y));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

mouseMoved = function() {
  var button, key, results, x, y;
  ({x, y} = getLocalCoords());
  results = [];
  for (key in buttons) {
    button = buttons[key];
    results.push(button.bg = button.inside(x, y) ? 'red' : 'white');
  }
  return results;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW91c2VUcmFuc2Zvcm0uanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcTW91c2VUcmFuc2Zvcm0uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsSUFBQSxFQUFBLGNBQUEsRUFBQSxZQUFBLEVBQUEsVUFBQSxFQUFBLEtBQUEsRUFBQTs7QUFBQSxPQUFBLEdBQVUsQ0FBQTs7QUFDVixNQUFBLEdBQVM7O0FBQ1QsTUFBQSxHQUFTOztBQUNULE1BQUEsR0FBUyxFQUhUOzs7Ozs7QUFTQSxjQUFBLEdBQWlCLFFBQUEsQ0FBQSxDQUFBLEVBQUE7QUFDakIsTUFBQSxNQUFBLEVBQUE7RUFBQyxNQUFBLEdBQVMsY0FBYyxDQUFDLFlBQWYsQ0FBQTtFQUNULEVBQUEsR0FBSyxZQUFBLENBQUE7U0FDTCxNQUFNLENBQUMsT0FBUCxDQUFBLENBQWdCLENBQUMsY0FBakIsQ0FBZ0MsSUFBSSxRQUFKLENBQWEsTUFBQSxHQUFTLEVBQXRCLEVBQXlCLE1BQUEsR0FBUyxFQUFsQyxDQUFoQztBQUhnQjs7QUFLWCxTQUFOLE1BQUEsT0FBQTtFQUNDLFdBQWMsTUFBQSxJQUFBLElBQUEsR0FBQSxHQUFBLElBQUEsQ0FBQTtJQUFDLElBQUMsQ0FBQTtJQUFLLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFFLElBQUMsQ0FBQTtJQUFPLElBQUMsQ0FBQSxRQUFELEdBQVk7RUFBdkM7O0VBQ2QsSUFBTyxDQUFBLENBQUE7SUFDTixJQUFBLENBQUssSUFBQyxDQUFBLEVBQU47SUFDQSxJQUFBLENBQUssSUFBQyxDQUFBLENBQU4sRUFBUSxJQUFDLENBQUEsQ0FBVCxFQUFXLElBQUMsQ0FBQSxDQUFaLEVBQWMsSUFBQyxDQUFBLENBQWY7SUFDQSxJQUFBLENBQUssT0FBTDtJQUNBLElB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QUNDLE1BQUEsR0FBUyxPQUFPLENBQUMsR0FBRDtpQkFDaEIsTUFBTSxDQUFDLEVBQVAsR0FBZSxNQUFNLENBQUMsTUFBUCxDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBSCxHQUE0QixLQUE1QixHQUF1QztFQUZwRCxDQUFBOztBQUZZIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9ucyA9IHt9XHJcblNDQUxFWCA9IDFcclxuU0NBTEVZID0gMVxyXG5UT0dHTEUgPSAxICMgMD1wb3J0csOkdHQgMT1sYW5kc2thcFxyXG5cclxuIyBMw7ZzZXIgcHJvYmxlbWV0ISBUcmFuc2Zvcm1lcmluZ2FyIGJlaMO2dmVyIGludGUgc2vDtnRhcyFcclxuIyBBbHRlcm5hdGl2IHNvbSBmdW5nZXJhciBsaWthIGJyYSwgbWVuIGtyw6R2ZXIgbWVyIGtvZC5cclxuIyBodHRwczovL3d3dy5yZWRkaXQuY29tL3IvcDVqcy9jb21tZW50cy9qbzd1Y2YvY2xpY2tpbmdfb25fYV90cmFuc2xhdGVkX3NjYWxlZF9hbmRfcm90YXRlZF9zaGFwZS9cclxuXHJcbmdldExvY2FsQ29vcmRzID0gLT4gIyB0YXIgMyBtaWNyb3Nla3VuZGVyXHJcblx0bWF0cml4ID0gZHJhd2luZ0NvbnRleHQuZ2V0VHJhbnNmb3JtKClcclxuXHRwZCA9IHBpeGVsRGVuc2l0eSgpXHJcblx0bWF0cml4LmludmVyc2UoKS50cmFuc2Zvcm1Qb2ludCBuZXcgRE9NUG9pbnQgbW91c2VYICogcGQsbW91c2VZICogcGRcclxuXHJcbmNsYXNzIEJ1dHRvblxyXG5cdGNvbnN0cnVjdG9yIDogKEB0ZXh0LEB4LEB5LEB3LEBoLEBiZykgLT4gQGludmVydGVkID0gZmFsc2VcclxuXHRkcmF3IDogLT5cclxuXHRcdGZpbGwgQGJnXHJcblx0XHRyZWN0IEB4LEB5LEB3LEBoXHJcblx0XHRmaWxsICdibGFjaydcclxuXHRcdGlmIEBpbnZlcnRlZFxyXG5cdFx0XHRwdXNoKClcclxuXHRcdFx0dHJhbnNsYXRlIEB4LEB5ICMgdGlsbGJha2EgdGlsbCBvcmlnb1xyXG5cdFx0XHRyb3RhdGUgMTgwICAjIHbDpG5kXHJcblx0XHRcdHRyYW5zbGF0ZSAtQHgsLUB5ICMgdGlsbGJha2EgdGlsbCB4LHlcclxuXHRcdFx0dGV4dCBAdGV4dCxAeCxAeVxyXG5cdFx0XHRwb3AoKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR0ZXh0IEB0ZXh0LEB4LEB5XHJcblx0aW5zaWRlIDogKHgseSkgLT4gLUB3LzIgPD0geC1AeCA8IEB3LzIgYW5kIC1AaC8yIDw9IHktQHkgPCBAaC8yXHJcblxyXG53aW5kb3dSZXNpemVkID0gLT5cclxuXHRyZXNpemVDYW52YXMgaW5uZXJXaWR0aCwgaW5uZXJIZWlnaHRcclxuXHRTQ0FMRVkgPSBpZiBUT0dHTEU9PTAgdGhlbiBoZWlnaHQvMTAwIGVsc2Ugd2lkdGgvMTAwXHJcblx0U0NBTEVYID0gaWYgVE9HR0xFPT0wIHRoZW4gd2lkdGgvMTAwIGVsc2UgaGVpZ2h0LzEwMFxyXG5cdGRpYWcgPSBzcXJ0IHdpZHRoKndpZHRoICsgaGVpZ2h0KmhlaWdodFxyXG5cdCNjb25zb2xlLmxvZyAncmVzaXplZCcsd2lkdGgsaGVpZ2h0LFNDQUxFWCxTQ0FMRVlcclxuXHJcbnNldHVwID0gLT5cclxuXHRjcmVhdGVDYW52YXMgMTAwLDEwMCAjIGlubmVyV2lkdGgsaW5uZXJIZWlnaHRcclxuXHRTQ0FMRVkgPSBpZiBUT0dHTEU9PTAgdGhlbiBoZWlnaHQvMTAwIGVsc2Ugd2lkdGgvMTAwXHJcblx0U0NBTEVYID0gaWYgVE9HR0xFPT0wIHRoZW4gd2lkdGgvMTAwIGVsc2UgaGVpZ2h0LzEwMFxyXG5cdGNvbnNvbGUubG9nICdzZXR1cCcsd2lkdGgsaGVpZ2h0LFNDQUxFWCxTQ0FMRVlcclxuXHRyZWN0TW9kZSBDRU5URVJcclxuXHRhbmdsZU1vZGUgREVHUkVFU1xyXG5cdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblxyXG5cdGJ1dHRvbnMubGVmdCAgPSBuZXcgQnV0dG9uICdsZWZ0JywgNTAsMjIsMTAwLDQ0LCd3aGl0ZSdcclxuXHRidXR0b25zLnBhdXNlID0gbmV3IEJ1dHRvbiAncGF1c2UnLDI1LDUwLCA1MCwxMiwnd2hpdGUnXHJcblx0YnV0dG9ucy5lZGl0ICA9IG5ldyBCdXR0b24gJ2VkaXQnLCA3NSw1MCwgNTAsMTIsJ3doaXRlJ1xyXG5cdGJ1dHRvbnMucmlnaHQgPSBuZXcgQnV0dG9uICdyaWdodCcsNTAsNzgsMTAwLDQ0LCd3aGl0ZSdcclxuXHJcblx0YnV0dG9ucy5sZWZ0LmludmVydGVkID0gdHJ1ZVxyXG5cclxuZHJhdyA9IC0+IFxyXG5cdGJhY2tncm91bmQgJ2JsYWNrJ1xyXG5cdGlmIFRPR0dMRSA9PSAxXHJcblx0XHR0cmFuc2xhdGUgNTAsNTAgIyBmbHl0dGEga29vcmRpbmF0c3lzdGVtZXQgdGlsbCBzaWRhbnMgbWl0dHB1bmt0XHJcblx0XHRyb3RhdGUgOTAgICMgcm90ZXJhIGtvb3JkaW5hdHN5c3RlbWV0XHJcblx0XHR0cmFuc2xhdGUgLTUwLDUwLXdpZHRoICMgd2lkdGggIyBmbHl0dGEgdGlsbGJha3NcclxuXHJcblx0c2NhbGUgU0NBTEVYLFNDQUxFWVxyXG5cdHN0cm9rZVdlaWdodCAxL1NDQUxFWFxyXG5cdGJ1dHRvbnMucGF1c2UuZHJhdygpXHJcblx0YnV0dG9ucy5lZGl0LmRyYXcoKVxyXG5cdGJ1dHRvbnMucmlnaHQuZHJhdygpXHJcblx0YnV0dG9ucy5sZWZ0LmRyYXcoKVxyXG5cdFxyXG5tb3VzZUNsaWNrZWQgPSAtPlxyXG5cdHt4LHl9ID0gZ2V0TG9jYWxDb29yZHMoKVxyXG5cdGNvbnNvbGUubG9nIHgseVxyXG5cdGZvciBrZXkgb2YgYnV0dG9uc1xyXG5cdFx0YnV0dG9uID0gYnV0dG9uc1trZXldXHJcblx0XHRpZiBidXR0b24uaW5zaWRlKHgseSkgdGhlbiBjb25zb2xlLmxvZyAnQ2xpY2tlZCcsa2V5LHgseVxyXG5cclxubW91c2VNb3ZlZCA9IC0+XHJcblx0e3gseX0gPSBnZXRMb2NhbENvb3JkcygpXHJcblx0Zm9yIGtleSBvZiBidXR0b25zXHJcblx0XHRidXR0b24gPSBidXR0b25zW2tleV1cclxuXHRcdGJ1dHRvbi5iZyA9IGlmIGJ1dHRvbi5pbnNpZGUoeCwgeSkgdGhlbiAncmVkJyBlbHNlICd3aGl0ZSciXX0=
//# sourceURL=c:\github\Transformer\coffee\MouseTransform.coffee