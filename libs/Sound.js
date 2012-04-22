/*
 * Sound API for audio playback
 * for every audio file there will be a new Audio instance created for
 * preloading the audio sources
 */

function LoadSound(src){
	return new Audio(src);
}

function PlaySound(sound){
	sound.play();
}

function FreeSound(sound){
	sound.pause();
	sound.src='';
	sound = null;
	delete sound;
}