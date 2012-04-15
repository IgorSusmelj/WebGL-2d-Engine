#WebGL-2d Engine Introduction and Tutorial
===========================================
by Igor Susmelj

##Outline

* Introduction
	- About WebGL-2d Engine
	- Structure of the Engine
	- Supported media types
* Getting Started
	- Requirements
	- Installation
	- Simple Example

<div id='Introduction'></div>

## Introduction

<div id='About WebGL-2d Engine'></div>

### About WebGL-2d Engine

WebGL-2d Engine is a 2d game Engine based on the Webgl JavaScript API. It uses OpenglES 2.0 for drawing (PS3 and Smarthpones use the same API).

This Engine gives the performance of this brand new API with the old and simple Blitz2D syntax.

<div id='Structure of the Engine'></div>


### Structure of the Engine

The Engine is modular structured. You can add different modules with a simple HTML include command as follows:
	
	<script type="text/javascript" src="Time.js"></script> // this loads the Time.js module
	
This gives you the possibility to add your custom modules or change existing modules.

There are several basic modules which will give you a minimal standard Engine with BB like commands.

#### Here are the basic modules

* index.html
	- This is the HTML file which will be called by default if someone calls your WebGL-2d game URL. In this file you can handle all your different modules and the canvas resolution.
* Engine.js
	- This is the main module which will create a basic WebGL context and call the functions in the Example.js file. It works like a java interface.
* Time.js
	- This module is actually only used for the performance analysing.
* Image.js
	- This module handles all your basic Image functions like loading and drawing. It converts image files into Opengl textures.
* Text.js
	- This module brings you basic Font loading and text drawing functions. It uses FontMaps like the `BitmapFont_Calibri.png` example.
* Sound.js
	- This module can load and play different Sounds. Don't forget to read the supported media types section.
	
	
<div id='Supported media types'></div>
	
	
###	Supported media types

#### Supported Image formats by Google Chrome and Mozilla Firefox:
- Jpeg
- Gif
- BMP
- PNG

#### Supported Audio formats:
* Google Chrome
	- Mp3
	- Wav
	- Ogg
* Mozilla Firefox
	- Wav
	- Ogg

For further information about the different Browser specifications (see [here](http://en.wikipedia.org/wiki/Comparison_of_web_browsers)).

<div id='Getting Started'></div>

## Getting started

<div id='Requirements'></div>

### Requirements

#### Minimal Programming environment to work with the WebGL-2d Engine

You'll need at least a browser like  and a basic text editor like the `Windows Notepad`.

#### Recommended Programming environment

We recommend you to use one of the following browsers [Google Chrome](https://www.google.com/chrome) or [Mozilla Firefox] (http://www.mozilla.org/de/firefox). (Don't forget to check for updated)
For text editing you should use a extended Notepad like [Notepad++] (http://notepad-plus-plus.org/) for windows or the JavaScript developer edition of the [Eclipse IDE] (http://www.eclipse.org/downloads). (With Eclipse you can easily download the newest release of the Engine with the [EGit] (http://www.eclipse.org/egit/) Plug-in.

