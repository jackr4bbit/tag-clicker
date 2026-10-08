# Tag Clicker
A clicker game I made for [the Tagless YSWS](https://tagless.hackclub.com/) using JS Canvas where you:
- click an HTML tag, which you can upgrade from the measly `<html>` you start with up to a `<div>`,
- buy `<script>`s (which click for you), and
- upgrade those scripts with event listeners.

## Setup
Just `git clone` into your web server's path—no building necessary!

## Gameplay
Uhh... There's a tag... And you click it...

The button in the top right is for the shop where you can upgrade your game.

### Easter Eggs (🤫 shh!)
- Try getting to exactly 67 elements
- Look at the console logs (hint: to see its invisible message, highlight/select the third line) 

## Maintenance
I don't plan maintain this very much, as this was a small project, but as a note to anyone who wants to mess around with it: I tried to put all adjustable things (colors, margins, sizes, animation increments, etc.) in `<USE>.settings.js` files where `USE` is the file that uses it (e.g. the shop UI component is rendered in `shop.js` and the variables for it are in `shop.settings.js`).

Please feel free to make PRs to contribute, especially to add marquee messages (in `marquee.settings.js`).