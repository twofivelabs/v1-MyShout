/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{915:function(e,n,t){(function(t){var o;!function(){"use strict";var r=function(){this.init()};r.prototype={init:function(){var e=this||d;return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var n=this||d;if(e=parseFloat(e),n.ctx||A(),void 0!==e&&e>=0&&e<=1){if(n._volume=e,n._muted)return n;n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e,d.ctx.currentTime);for(var i=0;i<n._howls.length;i++)if(!n._howls[i]._webAudio)for(var t=n._howls[i]._getSoundIds(),o=0;o<t.length;o++){var r=n._howls[i]._soundById(t[o]);r&&r._node&&(r._node.volume=r._volume*e)}return n}return n._volume},mute:function(e){var n=this||d;n.ctx||A(),n._muted=e,n.usingWebAudio&&n.masterGain.gain.setValueAtTime(e?0:n._volume,d.ctx.currentTime);for(var i=0;i<n._howls.length;i++)if(!n._howls[i]._webAudio)for(var t=n._howls[i]._getSoundIds(),o=0;o<t.length;o++){var r=n._howls[i]._soundById(t[o]);r&&r._node&&(r._node.muted=!!e||r._muted)}return n},stop:function(){for(var e=this||d,i=0;i<e._howls.length;i++)e._howls[i].stop();return e},unload:function(){for(var e=this||d,i=e._howls.length-1;i>=0;i--)e._howls[i].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,A()),e},codecs:function(e){return(this||d)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||d;if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch(n){e.noAudio=!0}else e.noAudio=!0;try{(new Audio).muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||d,n=null;try{n="undefined"!=typeof Audio?new Audio:null}catch(n){return e}if(!n||"function"!=typeof n.canPlayType)return e;var t=n.canPlayType("audio/mpeg;").replace(/^no$/,""),o=e._navigator?e._navigator.userAgent:"",r=o.match(/OPR\/(\d+)/g),_=r&&parseInt(r[0].split("/")[1],10)<33,l=-1!==o.indexOf("Safari")&&-1===o.indexOf("Chrome"),c=o.match(/Version\/(.*?) /),f=l&&c&&parseInt(c[1],10)<15;return e._codecs={mp3:!(_||!t&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!t,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(n.canPlayType('audio/wav; codecs="1"')||n.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!n.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(n.canPlayType("audio/x-m4b;")||n.canPlayType("audio/m4b;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!(f||!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!(f||!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(n.canPlayType("audio/x-flac;")||n.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||d;if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var n=function(t){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var o=new Audio;o._unlocked=!0,e._releaseHtml5Audio(o)}catch(t){e.noAudio=!0;break}for(var i=0;i<e._howls.length;i++)if(!e._howls[i]._webAudio)for(var r=e._howls[i]._getSoundIds(),d=0;d<r.length;d++){var _=e._howls[i]._soundById(r[d]);_&&_._node&&!_._node._unlocked&&(_._node._unlocked=!0,_._node.load())}e._autoResume();var source=e.ctx.createBufferSource();source.buffer=e._scratchBuffer,source.connect(e.ctx.destination),void 0===source.start?source.noteOn(0):source.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),source.onended=function(){source.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",n,!0),document.removeEventListener("touchend",n,!0),document.removeEventListener("click",n,!0),document.removeEventListener("keydown",n,!0);for(var i=0;i<e._howls.length;i++)e._howls[i]._emit("unlock")}};return document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",n,!0),document.addEventListener("click",n,!0),document.addEventListener("keydown",n,!0),e}},_obtainHtml5Audio:function(){var e=this||d;if(e._html5AudioPool.length)return e._html5AudioPool.pop();var n=(new Audio).play();return n&&"undefined"!=typeof Promise&&(n instanceof Promise||"function"==typeof n.then)&&n.catch((function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")})),new Audio},_releaseHtml5Audio:function(audio){var e=this||d;return audio._unlocked&&e._html5AudioPool.push(audio),e},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&d.usingWebAudio){for(var i=0;i<e._howls.length;i++)if(e._howls[i]._webAudio)for(var n=0;n<e._howls[i]._sounds.length;n++)if(!e._howls[i]._sounds[n]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout((function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending";var n=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())};e.ctx.suspend().then(n,n)}}),3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&d.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then((function(){e.state="running";for(var i=0;i<e._howls.length;i++)e._howls[i]._emit("resume")})),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var d=new r,_=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")};_.prototype={init:function(e){var n=this;return d.ctx||A(),n._autoplay=e.autoplay||!1,n._format="string"!=typeof e.format?e.format:[e.format],n._html5=e.html5||!1,n._muted=e.mute||!1,n._loop=e.loop||!1,n._pool=e.pool||5,n._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,n._rate=e.rate||1,n._sprite=e.sprite||{},n._src="string"!=typeof e.src?e.src:[e.src],n._volume=void 0!==e.volume?e.volume:1,n._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},n._duration=0,n._state="unloaded",n._sounds=[],n._endTimers={},n._queue=[],n._playLock=!1,n._onend=e.onend?[{fn:e.onend}]:[],n._onfade=e.onfade?[{fn:e.onfade}]:[],n._onload=e.onload?[{fn:e.onload}]:[],n._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],n._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],n._onpause=e.onpause?[{fn:e.onpause}]:[],n._onplay=e.onplay?[{fn:e.onplay}]:[],n._onstop=e.onstop?[{fn:e.onstop}]:[],n._onmute=e.onmute?[{fn:e.onmute}]:[],n._onvolume=e.onvolume?[{fn:e.onvolume}]:[],n._onrate=e.onrate?[{fn:e.onrate}]:[],n._onseek=e.onseek?[{fn:e.onseek}]:[],n._onunlock=e.onunlock?[{fn:e.onunlock}]:[],n._onresume=[],n._webAudio=d.usingWebAudio&&!n._html5,void 0!==d.ctx&&d.ctx&&d.autoUnlock&&d._unlockAudio(),d._howls.push(n),n._autoplay&&n._queue.push({event:"play",action:function(){n.play()}}),n._preload&&"none"!==n._preload&&n.load(),n},load:function(){var e=this,n=null;if(d.noAudio)e._emit("loaderror",null,"No audio support.");else{"string"==typeof e._src&&(e._src=[e._src]);for(var i=0;i<e._src.length;i++){var t,o;if(e._format&&e._format[i])t=e._format[i];else{if("string"!=typeof(o=e._src[i])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}(t=/^data:audio\/([^;,]+);/i.exec(o))||(t=/\.([^.]+)$/.exec(o.split("?",1)[0])),t&&(t=t[1].toLowerCase())}if(t||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),t&&d.codecs(t)){n=e._src[i];break}}if(n)return e._src=n,e._state="loading","https:"===window.location.protocol&&"http:"===n.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new l(e),e._webAudio&&f(e),e;e._emit("loaderror",null,"No codec support for selected audio sources.")}},play:function(e,n){var t=this,o=null;if("number"==typeof e)o=e,e=null;else{if("string"==typeof e&&"loaded"===t._state&&!t._sprite[e])return null;if(void 0===e&&(e="__default",!t._playLock)){for(var r=0,i=0;i<t._sounds.length;i++)t._sounds[i]._paused&&!t._sounds[i]._ended&&(r++,o=t._sounds[i]._id);1===r?e=null:o=null}}var _=o?t._soundById(o):t._inactiveSound();if(!_)return null;if(o&&!e&&(e=_._sprite||"__default"),"loaded"!==t._state){_._sprite=e,_._ended=!1;var l=_._id;return t._queue.push({event:"play",action:function(){t.play(l)}}),l}if(o&&!_._paused)return n||t._loadQueue("play"),_._id;t._webAudio&&d._autoResume();var c=Math.max(0,_._seek>0?_._seek:t._sprite[e][0]/1e3),f=Math.max(0,(t._sprite[e][0]+t._sprite[e][1])/1e3-c),m=1e3*f/Math.abs(_._rate),v=t._sprite[e][0]/1e3,h=(t._sprite[e][0]+t._sprite[e][1])/1e3;_._sprite=e,_._ended=!1;var A=function(){_._paused=!1,_._seek=c,_._start=v,_._stop=h,_._loop=!(!_._loop&&!t._sprite[e][2])};if(!(c>=h)){var y=_._node;if(t._webAudio){var w=function(){t._playLock=!1,A(),t._refreshBuffer(_);var e=_._muted||t._muted?0:_._volume;y.gain.setValueAtTime(e,d.ctx.currentTime),_._playStart=d.ctx.currentTime,void 0===y.bufferSource.start?_._loop?y.bufferSource.noteGrainOn(0,c,86400):y.bufferSource.noteGrainOn(0,c,f):_._loop?y.bufferSource.start(0,c,86400):y.bufferSource.start(0,c,f),m!==1/0&&(t._endTimers[_._id]=setTimeout(t._ended.bind(t,_),m)),n||setTimeout((function(){t._emit("play",_._id),t._loadQueue()}),0)};"running"===d.state&&"interrupted"!==d.ctx.state?w():(t._playLock=!0,t.once("resume",w),t._clearTimer(_._id))}else{var T=function(){y.currentTime=c,y.muted=_._muted||t._muted||d._muted||y.muted,y.volume=_._volume*d.volume(),y.playbackRate=_._rate;try{var o=y.play();if(o&&"undefined"!=typeof Promise&&(o instanceof Promise||"function"==typeof o.then)?(t._playLock=!0,A(),o.then((function(){t._playLock=!1,y._unlocked=!0,n?t._loadQueue():t._emit("play",_._id)})).catch((function(){t._playLock=!1,t._emit("playerror",_._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),_._ended=!0,_._paused=!0}))):n||(t._playLock=!1,A(),t._emit("play",_._id)),y.playbackRate=_._rate,y.paused)return void t._emit("playerror",_._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");"__default"!==e||_._loop?t._endTimers[_._id]=setTimeout(t._ended.bind(t,_),m):(t._endTimers[_._id]=function(){t._ended(_),y.removeEventListener("ended",t._endTimers[_._id],!1)},y.addEventListener("ended",t._endTimers[_._id],!1))}catch(e){t._emit("playerror",_._id,e)}};"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===y.src&&(y.src=t._src,y.load());var x=window&&window.ejecta||!y.readyState&&d._navigator.isCocoonJS;if(y.readyState>=3||x)T();else{t._playLock=!0,t._state="loading";var S=function(){t._state="loaded",T(),y.removeEventListener(d._canPlayEvent,S,!1)};y.addEventListener(d._canPlayEvent,S,!1),t._clearTimer(_._id)}}return _._id}t._ended(_)},pause:function(e){var n=this;if("loaded"!==n._state||n._playLock)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var t=n._getSoundIds(e),i=0;i<t.length;i++){n._clearTimer(t[i]);var o=n._soundById(t[i]);if(o&&!o._paused&&(o._seek=n.seek(t[i]),o._rateSeek=0,o._paused=!0,n._stopFade(t[i]),o._node))if(n._webAudio){if(!o._node.bufferSource)continue;void 0===o._node.bufferSource.stop?o._node.bufferSource.noteOff(0):o._node.bufferSource.stop(0),n._cleanBuffer(o._node)}else isNaN(o._node.duration)&&o._node.duration!==1/0||o._node.pause();arguments[1]||n._emit("pause",o?o._id:null)}return n},stop:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"stop",action:function(){t.stop(e)}}),t;for(var o=t._getSoundIds(e),i=0;i<o.length;i++){t._clearTimer(o[i]);var r=t._soundById(o[i]);r&&(r._seek=r._start||0,r._rateSeek=0,r._paused=!0,r._ended=!0,t._stopFade(o[i]),r._node&&(t._webAudio?r._node.bufferSource&&(void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),t._cleanBuffer(r._node)):isNaN(r._node.duration)&&r._node.duration!==1/0||(r._node.currentTime=r._start||0,r._node.pause(),r._node.duration===1/0&&t._clearSound(r._node))),n||t._emit("stop",r._id))}return t},mute:function(e,n){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"mute",action:function(){t.mute(e,n)}}),t;if(void 0===n){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var o=t._getSoundIds(n),i=0;i<o.length;i++){var r=t._soundById(o[i]);r&&(r._muted=e,r._interval&&t._stopFade(r._id),t._webAudio&&r._node?r._node.gain.setValueAtTime(e?0:r._volume,d.ctx.currentTime):r._node&&(r._node.muted=!!d._muted||e),t._emit("mute",r._id))}return t},volume:function(){var e,n,t,o=this,r=arguments;if(0===r.length)return o._volume;if(1===r.length||2===r.length&&void 0===r[1]?o._getSoundIds().indexOf(r[0])>=0?n=parseInt(r[0],10):e=parseFloat(r[0]):r.length>=2&&(e=parseFloat(r[0]),n=parseInt(r[1],10)),!(void 0!==e&&e>=0&&e<=1))return(t=n?o._soundById(n):o._sounds[0])?t._volume:0;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,r)}}),o;void 0===n&&(o._volume=e),n=o._getSoundIds(n);for(var i=0;i<n.length;i++)(t=o._soundById(n[i]))&&(t._volume=e,r[2]||o._stopFade(n[i]),o._webAudio&&t._node&&!t._muted?t._node.gain.setValueAtTime(e,d.ctx.currentTime):t._node&&!t._muted&&(t._node.volume=e*d.volume()),o._emit("volume",t._id));return o},fade:function(e,n,t,o){var r=this;if("loaded"!==r._state||r._playLock)return r._queue.push({event:"fade",action:function(){r.fade(e,n,t,o)}}),r;e=Math.min(Math.max(0,parseFloat(e)),1),n=Math.min(Math.max(0,parseFloat(n)),1),t=parseFloat(t),r.volume(e,o);for(var _=r._getSoundIds(o),i=0;i<_.length;i++){var l=r._soundById(_[i]);if(l){if(o||r._stopFade(_[i]),r._webAudio&&!l._muted){var c=d.ctx.currentTime,f=c+t/1e3;l._volume=e,l._node.gain.setValueAtTime(e,c),l._node.gain.linearRampToValueAtTime(n,f)}r._startFadeInterval(l,e,n,t,_[i],void 0===o)}}return r},_startFadeInterval:function(e,n,t,o,r,d){var _=this,l=n,c=t-n,f=Math.abs(c/.01),m=Math.max(4,f>0?o/f:o),v=Date.now();e._fadeTo=t,e._interval=setInterval((function(){var r=(Date.now()-v)/o;v=Date.now(),l+=c*r,l=Math.round(100*l)/100,l=c<0?Math.max(t,l):Math.min(t,l),_._webAudio?e._volume=l:_.volume(l,e._id,!0),d&&(_._volume=l),(t<n&&l<=t||t>n&&l>=t)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,_.volume(t,e._id),_._emit("fade",e._id))}),m)},_stopFade:function(e){var n=this,t=n._soundById(e);return t&&t._interval&&(n._webAudio&&t._node.gain.cancelScheduledValues(d.ctx.currentTime),clearInterval(t._interval),t._interval=null,n.volume(t._fadeTo,e),t._fadeTo=null,n._emit("fade",e)),n},loop:function(){var e,n,t,o=this,r=arguments;if(0===r.length)return o._loop;if(1===r.length){if("boolean"!=typeof r[0])return!!(t=o._soundById(parseInt(r[0],10)))&&t._loop;e=r[0],o._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var d=o._getSoundIds(n),i=0;i<d.length;i++)(t=o._soundById(d[i]))&&(t._loop=e,o._webAudio&&t._node&&t._node.bufferSource&&(t._node.bufferSource.loop=e,e&&(t._node.bufferSource.loopStart=t._start||0,t._node.bufferSource.loopEnd=t._stop,o.playing(d[i])&&(o.pause(d[i],!0),o.play(d[i],!0)))));return o},rate:function(){var e,n,t,o=this,r=arguments;if(0===r.length)n=o._sounds[0]._id;else if(1===r.length){o._getSoundIds().indexOf(r[0])>=0?n=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),n=parseInt(r[1],10));if("number"!=typeof e)return(t=o._soundById(n))?t._rate:o._rate;if("loaded"!==o._state||o._playLock)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,r)}}),o;void 0===n&&(o._rate=e),n=o._getSoundIds(n);for(var i=0;i<n.length;i++)if(t=o._soundById(n[i])){o.playing(n[i])&&(t._rateSeek=o.seek(n[i]),t._playStart=o._webAudio?d.ctx.currentTime:t._playStart),t._rate=e,o._webAudio&&t._node&&t._node.bufferSource?t._node.bufferSource.playbackRate.setValueAtTime(e,d.ctx.currentTime):t._node&&(t._node.playbackRate=e);var _=o.seek(n[i]),l=1e3*((o._sprite[t._sprite][0]+o._sprite[t._sprite][1])/1e3-_)/Math.abs(t._rate);!o._endTimers[n[i]]&&t._paused||(o._clearTimer(n[i]),o._endTimers[n[i]]=setTimeout(o._ended.bind(o,t),l)),o._emit("rate",t._id)}return o},seek:function(){var e,n,t=this,o=arguments;if(0===o.length)t._sounds.length&&(n=t._sounds[0]._id);else if(1===o.length){t._getSoundIds().indexOf(o[0])>=0?n=parseInt(o[0],10):t._sounds.length&&(n=t._sounds[0]._id,e=parseFloat(o[0]))}else 2===o.length&&(e=parseFloat(o[0]),n=parseInt(o[1],10));if(void 0===n)return 0;if("number"==typeof e&&("loaded"!==t._state||t._playLock))return t._queue.push({event:"seek",action:function(){t.seek.apply(t,o)}}),t;var r=t._soundById(n);if(r){if(!("number"==typeof e&&e>=0)){if(t._webAudio){var _=t.playing(n)?d.ctx.currentTime-r._playStart:0,l=r._rateSeek?r._rateSeek-r._seek:0;return r._seek+(l+_*Math.abs(r._rate))}return r._node.currentTime}var c=t.playing(n);c&&t.pause(n,!0),r._seek=e,r._ended=!1,t._clearTimer(n),t._webAudio||!r._node||isNaN(r._node.duration)||(r._node.currentTime=e);var f=function(){c&&t.play(n,!0),t._emit("seek",n)};if(c&&!t._webAudio){var m=function(){t._playLock?setTimeout(m,0):f()};setTimeout(m,0)}else f()}return t},playing:function(e){var n=this;if("number"==typeof e){var t=n._soundById(e);return!!t&&!t._paused}for(var i=0;i<n._sounds.length;i++)if(!n._sounds[i]._paused)return!0;return!1},duration:function(e){var n=this,t=n._duration,o=n._soundById(e);return o&&(t=n._sprite[o._sprite][1]/1e3),t},state:function(){return this._state},unload:function(){for(var e=this,n=e._sounds,i=0;i<n.length;i++)n[i]._paused||e.stop(n[i]._id),e._webAudio||(e._clearSound(n[i]._node),n[i]._node.removeEventListener("error",n[i]._errorFn,!1),n[i]._node.removeEventListener(d._canPlayEvent,n[i]._loadFn,!1),n[i]._node.removeEventListener("ended",n[i]._endFn,!1),d._releaseHtml5Audio(n[i]._node)),delete n[i]._node,e._clearTimer(n[i]._id);var t=d._howls.indexOf(e);t>=0&&d._howls.splice(t,1);var o=!0;for(i=0;i<d._howls.length;i++)if(d._howls[i]._src===e._src||e._src.indexOf(d._howls[i]._src)>=0){o=!1;break}return c&&o&&delete c[e._src],d.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,n,t,o){var r=this["_on"+e];return"function"==typeof n&&r.push(o?{id:t,fn:n,once:o}:{id:t,fn:n}),this},off:function(e,n,t){var o=this,r=o["_on"+e],i=0;if("number"==typeof n&&(t=n,n=null),n||t)for(i=0;i<r.length;i++){var d=t===r[i].id;if(n===r[i].fn&&d||!n&&d){r.splice(i,1);break}}else if(e)o["_on"+e]=[];else{var _=Object.keys(o);for(i=0;i<_.length;i++)0===_[i].indexOf("_on")&&Array.isArray(o[_[i]])&&(o[_[i]]=[])}return o},once:function(e,n,t){return this.on(e,n,t,1),this},_emit:function(e,n,t){for(var o=this,r=o["_on"+e],i=r.length-1;i>=0;i--)r[i].id&&r[i].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,t)}.bind(o,r[i].fn),0),r[i].once&&o.off(e,r[i].fn,r[i].id));return o._loadQueue(e),o},_loadQueue:function(e){var n=this;if(n._queue.length>0){var t=n._queue[0];t.event===e&&(n._queue.shift(),n._loadQueue()),e||t.action()}return n},_ended:function(e){var n=this,t=e._sprite;if(!n._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(n._ended.bind(n,e),100),n;var o=!(!e._loop&&!n._sprite[t][2]);if(n._emit("end",e._id),!n._webAudio&&o&&n.stop(e._id,!0).play(e._id),n._webAudio&&o){n._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=d.ctx.currentTime;var r=1e3*(e._stop-e._start)/Math.abs(e._rate);n._endTimers[e._id]=setTimeout(n._ended.bind(n,e),r)}return n._webAudio&&!o&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,n._clearTimer(e._id),n._cleanBuffer(e._node),d._autoSuspend()),n._webAudio||o||n.stop(e._id,!0),n},_clearTimer:function(e){var n=this;if(n._endTimers[e]){if("function"!=typeof n._endTimers[e])clearTimeout(n._endTimers[e]);else{var t=n._soundById(e);t&&t._node&&t._node.removeEventListener("ended",n._endTimers[e],!1)}delete n._endTimers[e]}return n},_soundById:function(e){for(var n=this,i=0;i<n._sounds.length;i++)if(e===n._sounds[i]._id)return n._sounds[i];return null},_inactiveSound:function(){var e=this;e._drain();for(var i=0;i<e._sounds.length;i++)if(e._sounds[i]._ended)return e._sounds[i].reset();return new l(e)},_drain:function(){var e=this,n=e._pool,t=0,i=0;if(!(e._sounds.length<n)){for(i=0;i<e._sounds.length;i++)e._sounds[i]._ended&&t++;for(i=e._sounds.length-1;i>=0;i--){if(t<=n)return;e._sounds[i]._ended&&(e._webAudio&&e._sounds[i]._node&&e._sounds[i]._node.disconnect(0),e._sounds.splice(i,1),t--)}}},_getSoundIds:function(e){if(void 0===e){for(var n=[],i=0;i<this._sounds.length;i++)n.push(this._sounds[i]._id);return n}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=d.ctx.createBufferSource(),e._node.bufferSource.buffer=c[this._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,d.ctx.currentTime),this},_cleanBuffer:function(e){var n=d._navigator&&d._navigator.vendor.indexOf("Apple")>=0;if(!e.bufferSource)return this;if(d._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),n))try{e.bufferSource.buffer=d._scratchBuffer}catch(e){}return e.bufferSource=null,this},_clearSound:function(e){/MSIE |Trident\//.test(d._navigator&&d._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}};var l=function(e){this._parent=e,this.init()};l.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++d._counter,n._sounds.push(e),e.create(),e},create:function(){var e=this,n=e._parent,t=d._muted||e._muted||e._parent._muted?0:e._volume;return n._webAudio?(e._node=void 0===d.ctx.createGain?d.ctx.createGainNode():d.ctx.createGain(),e._node.gain.setValueAtTime(t,d.ctx.currentTime),e._node.paused=!0,e._node.connect(d.masterGain)):d.noAudio||(e._node=d._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(d._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=n._src,e._node.preload=!0===n._preload?"auto":n._preload,e._node.volume=t*d.volume(),e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._rate=n._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++d._counter,e},_errorListener:function(){var e=this;e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),"loaded"!==n._state&&(n._state="loaded",n._emit("load"),n._loadQueue()),e._node.removeEventListener(d._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,n=e._parent;n._duration===1/0&&(n._duration=Math.ceil(10*e._node.duration)/10,n._sprite.__default[1]===1/0&&(n._sprite.__default[1]=1e3*n._duration),n._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}};var c={},f=function(e){var n=e._src;if(c[n])return e._duration=c[n].duration,void h(e);if(/^data:[^;]+;base64,/.test(n)){for(var data=atob(n.split(",")[1]),t=new Uint8Array(data.length),i=0;i<data.length;++i)t[i]=data.charCodeAt(i);v(t.buffer,e)}else{var o=new XMLHttpRequest;o.open(e._xhr.method,n,!0),o.withCredentials=e._xhr.withCredentials,o.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach((function(n){o.setRequestHeader(n,e._xhr.headers[n])})),o.onload=function(){var code=(o.status+"")[0];"0"===code||"2"===code||"3"===code?v(o.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+o.status+".")},o.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete c[n],e.load())},m(o)}},m=function(e){try{e.send()}catch(n){e.onerror()}},v=function(e,n){var t=function(){n._emit("loaderror",null,"Decoding audio data failed.")},o=function(e){e&&n._sounds.length>0?(c[n._src]=e,h(n,e)):t()};"undefined"!=typeof Promise&&1===d.ctx.decodeAudioData.length?d.ctx.decodeAudioData(e).then(o).catch(t):d.ctx.decodeAudioData(e,o,t)},h=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},A=function(){if(d.usingWebAudio){try{"undefined"!=typeof AudioContext?d.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?d.ctx=new webkitAudioContext:d.usingWebAudio=!1}catch(e){d.usingWebAudio=!1}d.ctx||(d.usingWebAudio=!1);var e=/iP(hone|od|ad)/.test(d._navigator&&d._navigator.platform),n=d._navigator&&d._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),t=n?parseInt(n[1],10):null;if(e&&t&&t<9){var o=/safari/.test(d._navigator&&d._navigator.userAgent.toLowerCase());d._navigator&&!o&&(d.usingWebAudio=!1)}d.usingWebAudio&&(d.masterGain=void 0===d.ctx.createGain?d.ctx.createGainNode():d.ctx.createGain(),d.masterGain.gain.setValueAtTime(d._muted?0:d._volume,d.ctx.currentTime),d.masterGain.connect(d.ctx.destination)),d._setup()}};void 0===(o=function(){return{Howler:d,Howl:_}}.apply(n,[]))||(e.exports=o),n.Howler=d,n.Howl=_,void 0!==t?(t.HowlerGlobal=r,t.Howler=d,t.Howl=_,t.Sound=l):"undefined"!=typeof window&&(window.HowlerGlobal=r,window.Howler=d,window.Howl=_,window.Sound=l)}(),function(){"use strict";var e;HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;for(var i=n._howls.length-1;i>=0;i--)n._howls[i].stereo(e);return n},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],void 0!==o.ctx.listener.positionX?(o.ctx.listener.positionX.setTargetAtTime(o._pos[0],Howler.ctx.currentTime,.1),o.ctx.listener.positionY.setTargetAtTime(o._pos[1],Howler.ctx.currentTime,.1),o.ctx.listener.positionZ.setTargetAtTime(o._pos[2],Howler.ctx.currentTime,.1)):o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,d){var _=this;if(!_.ctx||!_.ctx.listener)return _;var l=_._orientation;return n="number"!=typeof n?l[1]:n,t="number"!=typeof t?l[2]:t,o="number"!=typeof o?l[3]:o,r="number"!=typeof r?l[4]:r,d="number"!=typeof d?l[5]:d,"number"!=typeof e?l:(_._orientation=[e,n,t,o,r,d],void 0!==_.ctx.listener.forwardX?(_.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),_.ctx.listener.forwardY.setTargetAtTime(n,Howler.ctx.currentTime,.1),_.ctx.listener.forwardZ.setTargetAtTime(t,Howler.ctx.currentTime,.1),_.ctx.listener.upX.setTargetAtTime(o,Howler.ctx.currentTime,.1),_.ctx.listener.upY.setTargetAtTime(r,Howler.ctx.currentTime,.1),_.ctx.listener.upZ.setTargetAtTime(d,Howler.ctx.currentTime,.1)):_.ctx.listener.setOrientation(e,n,t,o,r,d),_)},Howl.prototype.init=(e=Howl.prototype.init,function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._stereo=n.stereo||null,t._pos=n.pos||null,t._pannerAttr={coneInnerAngle:void 0!==n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:void 0!==n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:void 0!==n.coneOuterGain?n.coneOuterGain:0,distanceModel:void 0!==n.distanceModel?n.distanceModel:"inverse",maxDistance:void 0!==n.maxDistance?n.maxDistance:1e4,panningModel:void 0!==n.panningModel?n.panningModel:"HRTF",refDistance:void 0!==n.refDistance?n.refDistance:1,rolloffFactor:void 0!==n.rolloffFactor?n.rolloffFactor:1},t._onstereo=n.onstereo?[{fn:n.onstereo}]:[],t._onpos=n.onpos?[{fn:n.onpos}]:[],t._onorientation=n.onorientation?[{fn:n.onorientation}]:[],e.call(this,n)}),Howl.prototype.stereo=function(e,t){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(e,t)}}),o;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===t){if("number"!=typeof e)return o._stereo;o._stereo=e,o._pos=[e,0,0]}for(var d=o._getSoundIds(t),i=0;i<d.length;i++){var _=o._soundById(d[i]);if(_){if("number"!=typeof e)return _._stereo;_._stereo=e,_._pos=[e,0,0],_._node&&(_._pannerAttr.panningModel="equalpower",_._panner&&_._panner.pan||n(_,r),"spatial"===r?void 0!==_._panner.positionX?(_._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),_._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),_._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):_._panner.setPosition(e,0,0):_._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),o._emit("stereo",_._id)}}return o},Howl.prototype.pos=function(e,t,o,r){var d=this;if(!d._webAudio)return d;if("loaded"!==d._state)return d._queue.push({event:"pos",action:function(){d.pos(e,t,o,r)}}),d;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,void 0===r){if("number"!=typeof e)return d._pos;d._pos=[e,t,o]}for(var _=d._getSoundIds(r),i=0;i<_.length;i++){var l=d._soundById(_[i]);if(l){if("number"!=typeof e)return l._pos;l._pos=[e,t,o],l._node&&(l._panner&&!l._panner.pan||n(l,"spatial"),void 0!==l._panner.positionX?(l._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),l._panner.positionY.setValueAtTime(t,Howler.ctx.currentTime),l._panner.positionZ.setValueAtTime(o,Howler.ctx.currentTime)):l._panner.setPosition(e,t,o)),d._emit("pos",l._id)}}return d},Howl.prototype.orientation=function(e,t,o,r){var d=this;if(!d._webAudio)return d;if("loaded"!==d._state)return d._queue.push({event:"orientation",action:function(){d.orientation(e,t,o,r)}}),d;if(t="number"!=typeof t?d._orientation[1]:t,o="number"!=typeof o?d._orientation[2]:o,void 0===r){if("number"!=typeof e)return d._orientation;d._orientation=[e,t,o]}for(var _=d._getSoundIds(r),i=0;i<_.length;i++){var l=d._soundById(_[i]);if(l){if("number"!=typeof e)return l._orientation;l._orientation=[e,t,o],l._node&&(l._panner||(l._pos||(l._pos=d._pos||[0,0,-.5]),n(l,"spatial")),void 0!==l._panner.orientationX?(l._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),l._panner.orientationY.setValueAtTime(t,Howler.ctx.currentTime),l._panner.orientationZ.setValueAtTime(o,Howler.ctx.currentTime)):l._panner.setOrientation(e,t,o)),d._emit("orientation",l._id)}}return d},Howl.prototype.pannerAttr=function(){var e,t,o,r=this,d=arguments;if(!r._webAudio)return r;if(0===d.length)return r._pannerAttr;if(1===d.length){if("object"!=typeof d[0])return(o=r._soundById(parseInt(d[0],10)))?o._pannerAttr:r._pannerAttr;e=d[0],void 0===t&&(e.pannerAttr||(e.pannerAttr={coneInnerAngle:e.coneInnerAngle,coneOuterAngle:e.coneOuterAngle,coneOuterGain:e.coneOuterGain,distanceModel:e.distanceModel,maxDistance:e.maxDistance,refDistance:e.refDistance,rolloffFactor:e.rolloffFactor,panningModel:e.panningModel}),r._pannerAttr={coneInnerAngle:void 0!==e.pannerAttr.coneInnerAngle?e.pannerAttr.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:void 0!==e.pannerAttr.coneOuterAngle?e.pannerAttr.coneOuterAngle:r._coneOuterAngle,coneOuterGain:void 0!==e.pannerAttr.coneOuterGain?e.pannerAttr.coneOuterGain:r._coneOuterGain,distanceModel:void 0!==e.pannerAttr.distanceModel?e.pannerAttr.distanceModel:r._distanceModel,maxDistance:void 0!==e.pannerAttr.maxDistance?e.pannerAttr.maxDistance:r._maxDistance,refDistance:void 0!==e.pannerAttr.refDistance?e.pannerAttr.refDistance:r._refDistance,rolloffFactor:void 0!==e.pannerAttr.rolloffFactor?e.pannerAttr.rolloffFactor:r._rolloffFactor,panningModel:void 0!==e.pannerAttr.panningModel?e.pannerAttr.panningModel:r._panningModel})}else 2===d.length&&(e=d[0],t=parseInt(d[1],10));for(var _=r._getSoundIds(t),i=0;i<_.length;i++)if(o=r._soundById(_[i])){var l=o._pannerAttr;l={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:l.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:l.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:l.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:l.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:l.maxDistance,refDistance:void 0!==e.refDistance?e.refDistance:l.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:l.rolloffFactor,panningModel:void 0!==e.panningModel?e.panningModel:l.panningModel};var c=o._panner;c||(o._pos||(o._pos=r._pos||[0,0,-.5]),n(o,"spatial"),c=o._panner),c.coneInnerAngle=l.coneInnerAngle,c.coneOuterAngle=l.coneOuterAngle,c.coneOuterGain=l.coneOuterGain,c.distanceModel=l.distanceModel,c.maxDistance=l.maxDistance,c.refDistance=l.refDistance,c.rolloffFactor=l.rolloffFactor,c.panningModel=l.panningModel}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,e.call(this),n._stereo?t.stereo(n._stereo):n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._stereo=t._stereo,n._pos=t._pos,n._pannerAttr=t._pannerAttr,n._stereo?t.stereo(n._stereo):n._pos?t.pos(n._pos[0],n._pos[1],n._pos[2],n._id):n._panner&&(n._panner.disconnect(0),n._panner=void 0,t._refreshBuffer(n)),e.call(this)}}(Sound.prototype.reset);var n=function(e,n){"spatial"===(n=n||"spatial")?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}()}).call(this,t(84))}}]);