// Watchmen Smiley, with gradient and blood, and scale and rotation
// ...and keyboard-handling to move it around

"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

/*
 Stay within this 72 character margin, to keep your code easily readable
 1         2         3         4         5         6         7
 123456789012345678901234567890123456789012345678901234567890123456789012
 */

// ======================
// IMPORTANT INSTRUCTIONS
// ======================
//
// * As ever, Fork Off this Fiddle BEFORE making any changes.
//
// * Submit your URL with an explicit numerical version suffix
//   (e.g. "jsfiddle.net/qWeRtY/0" denoting version 0)
//   NB: If you do not provide a suffix, the marker is allowed
//   to assume anything. In particular, they may assume 0.
//
// * Don't modify this framework except where instructed.
//   It is here to help you (and to help us when marking!)
//
// * DON'T CHEAT!


// ==========
// OBJECTIVES
// ==========
//
// * Draw a "midground" smiley at coords x=350, y=50 with radius=50
// * WASD keys should move it up/left/down/right by 10 pixels-per-event
// * OP keys should divide/multiply its radius by a factor of 1.1
// * QE keys should reduce/increase its orientation by 1/37th of a
//      revolution.
// * T should toggle a "trail" behind the moveable one.
//   HINT: Doing this is actually easier than NOT doing it!
//
// * B should toggle a background of 2 other smileys
// * F should toggle a foreground of 2 other smileys
// * One of the foreground smileys should rotate in the opposite
//   direction to the player-moveable one.
//
// * M should toggle support for moving the smiley via the mouse
//
// * The background should be on by default
// * The foreground should be on by default
// * The trail should be off by default
// * The mouse-control should be off by default
//
// NB: The trail *doesn't* have to be preserved across F and B toggles
//     Typically, either of these toggles will have the side-effect of
//     erasing the current trail.
//
//     The drawBackground and drawForeground functions have been
//     provided for you, but you'll have to modify the foreground one
//     to implement the counter-rotation feature.


// ============
// UGLY GLOBALS
// ============
//
// Regrettable, but they just make things easier.
//
var g_canvas;// = document.getElementById("myCanvas");
var g_ctx;// = g_canvas.getContext("2d");


// ================
// HELPER FUNCTIONS
// ================

function clear() {
   g_ctx.clearRect(0, 0, g_canvas.width, g_canvas.height);
}

function drawBackground() {
   drawDefaultSmiley(g_ctx);
   drawSmileyAt(g_ctx,  25, 375,  25, -Math.PI/8);
}

function drawForeground() {
   drawSmileyAt(g_ctx,  25, 375,  25, Math.PI/8);
   
   // TODO: Make this one rotate in the opposite direction
   //       to your player-controllable one.
   drawSmileyAt(g_ctx, 300, 300, 100, Math.PI/8);
}

function fillEllipse(ctx, cx, cy, halfWidth, halfHeight, angle) {
   ctx.save(); // save the current ctx state, to restore later
   ctx.beginPath();
   
   // These "matrix ops" are applied in last-to-first order
   // ..which can seem a bit weird, but actually makes sense
   //
   // After modifying the ctx state like this, it's important
   // to restore it
   ctx.translate(cx, cy);
   ctx.rotate(angle);
   ctx.scale(halfWidth, halfHeight);
   
   // Just draw a unit circle, and let the matrices do the rest!
   ctx.arc(0, 0, 1, 0, Math.PI*2);
   ctx.fill();
   
   ctx.restore();
}


// =================
// MATRIX CLEVERNESS
// =================

function drawSmileyAt(ctx, cx, cy, radius, angle) {
   // This matrix trickery lets me take a "default smiley",
   // and transform it so I can draw it anyway, at any size,
   // and at any angle.
   //
	em_drawSmiley(ctx, cx, cy, radius, angle);
}


// =================
// OUR SMILEY OBJECT
// =================

// Let's make the user-controllable smiley into a simple
// little javascript object. (Global for "convenience").
//
var g_smiley = {
   x : 350,
   y :  50,
   
   radius : 50,
   angle  : 0
};

// Let's add a draw method...
//
// (We could have done that above, but I find that it's sometimes
// cleaner to add the functions separately, to reduce indentation.)
//
g_smiley.draw = function() {
   drawSmileyAt(g_ctx, 
                this.x, this.y, 
                this.radius, this.angle);
};

// You *might* want to add other methods here, as part of your
// implementation.. or you could just manipulate the object
// state directly from inside other (non-member) functions.
//
// On a small project like this, direct manipulation is fine,
// and might be simpler. On a larger project, you would be
// more likely to do everything via "methods" i.e. functions
// which belong to the object itself.


// ======================
// DEFAULT SMILEY DRAWING
// ======================

var g_defaultSmileyX = 200,
    g_defaultSmileyY = 200,
    g_defaultSmileyRadius = 150;

// =====================================================
// YOUR VERSION OF drawDefaultSmiley(ctx) SHOULD GO HERE
// =====================================================
//
// Your version will replace my placeholder implementation.
//
// If you didn't complete the previous homework, then just
// use my crappy placeholder.
//
/*
 function drawDefaultSmiley(ctx) {
 // YOUR CODE
 }
 */


// ======
// REDRAW
// ======
//
// Your code should call this when needed, to update the
// screen. You'll have to edit this routine to make it do
// everything that is required (e.g. background, foreground,
// dealing with the "trail" etc).
//
function redraw() {
   
   // Simple version: just draw the initial "midground" smiley
   // NB: This doesn't handle background/foreground yet.

	//
   
   g_smiley.draw();
}


// ========================================
// YOUR EVENT-HANDLING STUFF SHOULD GO HERE
// ========================================

// For now, I'm just going to do this, to kick things off...
window.onload = function() {
	g_canvas = document.getElementById("myCanvas");
	g_ctx = g_canvas.getContext("2d");
	redraw();
};
