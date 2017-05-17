// ╒══════════════════════════════════════════════════════════════════════════════════╕
// █▐▐  Picture Control | Blur Filter
// ╞══════════════════════════════════════════════════════════════════════════════════╡
/*:
 *  @plugindesc [1.00] Adds a user-specified blur to a picture.
 *  @author Exhydra
 *
 *  @param ─ Options
 *  @desc
 *  @default ───────────────
 *
 *  @param Default Add
 *  @desc Adds the blur filter to each picture by default.
 *  @default false
 *
 *  @param Default Strength
 *  @desc The default strength of each blur filter.
 *  @default 0
 *
 *  @param Default Quality
 *  @desc The default quality of each blur filter.
 *  @default 1.5
 *
 *  @param Default Padding
 *  @desc The default padding of each blur filter.
 *  @default 0
 *
 *  @param ─ Plugin
 *  @desc
 *  @default ───────────────
 *
 *  @param Plugin GID
 *  @desc Global identification tag for internal use only. Do not change.
 *  @default eXa-3IPtxrUiEoyjLMW
 *
 *  @help
 * ▄ Plugin                  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   ┌─ Version : 1.00
 *   ├─ Release : 27th September 2016
 *   ├─ Updated : 27th September 2016
 *   └─ License : Free for Commercial and Non-Commercial Usage
 *
 */
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Plugin
// ╘══════════════════════════════════════════════════════════════════════════════════╛

var Imported = Imported || {};
Imported.exaPictureControlBlurFilter = 1.00;

var EXA   = EXA       || {};
EXA.PC    = EXA.PC    || {};
EXA.PC.BF = EXA.PC.BF || {};

(function() {

	'use strict';

	var exaParams = $plugins.filter(function(plugin) {
		return plugin.parameters['Plugin GID'] == 'eXa-3IPtxrUiEoyjLMW';
	})[0].parameters;

  EXA.PC.BF._defaultBlur     = exaParams['Default Add'] === 'true';
  EXA.PC.BF._defaultStrength = Number(exaParams['Default Strength']) || 0;
  EXA.PC.BF._defaultQuality  = Number(exaParams['Default Quality'])  || 1.5;
  EXA.PC.BF._defaultPadding  = Number(exaParams['Default Padding'])  || 0;

})();

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Picture
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.PC.BF.Game_Picture_initialize = Game_Picture.prototype.initialize;

Game_Picture.prototype.initialize = function() {

  EXA.PC.BF.Game_Picture_initialize.call(this);

  this.initBlur();

}; // Game_Picture ‹‹ initialize

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initBlur
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Picture.prototype.initBlur = function() {

  this._blur         = EXA.PC.BF._defaultBlur;
  this._blurStrength = EXA.PC.BF._defaultStrength;
  this._blurQuality  = EXA.PC.BF._defaultQuality;
  this._blurPadding  = EXA.PC.BF._defaultPadding;

  this._blurTarget   = 0;
  this._blurDuration = 0;

}; // Game_Picture ‹‹ initBlur

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] addBlur
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Picture.prototype.addBlur = function(strength, quality, padding) {

  this._blur         = true;

  this._blurStrength = strength;
  this._blurQuality  = quality;
  this._blurPadding  = padding;

}; // Game_Picture ‹‹ addBlur

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] toBlur
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Picture.prototype.toBlur = function(strength, duration) {

  this._blurTarget   = strength;
  this._blurDuration = duration;

  if (duration === 0) {
    this._blurStrength = strength;
  }

}; // Game_Picture ‹‹ toBlur

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] eraseBlur
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Picture.prototype.eraseBlur = function() {

  this._blur = false;

}; // Game_Picture ‹‹ eraseBlur

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] update
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.PC.BF.Game_Picture_update = Game_Picture.prototype.update;

Game_Picture.prototype.update = function() {

  EXA.PC.BF.Game_Picture_update.call(this);

  this.updateBlur();

}; // Game_Picture ‹‹ update

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateBlur
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Picture.prototype.updateBlur = function() {

  if (this._blurDuration > 0) {
    var d = this._blurDuration;

    this._blurStrength = (this._blurStrength * (d - 1) + this._blurTarget) / d;
    this._blurDuration--;
  }

}; // Game_Picture ‹‹ updateBlur

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Sprite_Picture
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.PC.BF.Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;

Sprite_Picture.prototype.initialize = function(pictureId) {

  EXA.PC.BF.Sprite_Picture_initialize.call(this, pictureId);

  this._blurFilter         = new PIXI.filters.BlurFilter();
  this._blurFilter.added   = false;
  this._blurFilter.blur    = 0;
  this._blurFilter.quality = 0;
  this._blurFilter.padding = 0;

}; // Sprite_Picture ‹‹ initialize

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateOther
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.PC.BF.Sprite_Picture_updateOther = Sprite_Picture.prototype.updateOther;

Sprite_Picture.prototype.updateOther = function() {

  EXA.PC.BF.Sprite_Picture_updateOther.call(this);

  var picture = this.picture();

  if (picture._blur) {
    if (!this._blurFilter.added) {
      this._blurFilter.added   = true;

      this._blurFilter.quality = picture._blurQuality;
      this._blurFilter.padding = picture._blurPadding;

      this.filters = [this._blurFilter];
    }

    this._blurFilter.blur = picture._blurStrength;
  } else {
    if (this._blurFilter.added) {
      this._blurFilter.added   = false;

      this.filters = null;
    }
  }

}; // Sprite_Picture ‹‹ updateOther

// ▌▌██████████████████████████████████████ EOF █████████████████████████████████████▐▐