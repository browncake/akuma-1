//=============================================================================
// KGN_StatusLayout.js
// Ver 1.02		小数点以下切り捨て処理追加
//=============================================================================

var Imported = Imported || {};
Imported.KGN_StatusLayout = true;

var Kiginu = Kiginu || {};//なんかこんな感じの処理をみんな入れてるから入れる。

/*:
 * @plugindesc ステータス画面のレイアウトを変更します。
 * @author きぎぬ
 * 
 * @help 
 * 具体的には、攻撃力～運の表示を左に詰めて、装備表示との間に、
 * 命中率などを表示させるようにします。
 * 命中率、回避率、会心率、HP再生率、MP再生率、TP再生率の6種です。
 * 他のものを表示するように変えたかったらご自身で改造してどうぞ。
 *
 * バグとか自分じゃ太刀打ちできないので、自力で、どうぞ。
 * 
 * HP： http://r3jou.web.fc2.com/

 * @param HitName
 * @desc 命中率の表示名。初期値は「命中率」
 * @default 命中率
 * @param EvaName
 * @desc 回避率の表示名。初期値は「回避率」
 * @default 回避率
 * @param CriName
 * @desc 会心率の表示名。初期値は「会心率」
 * @default 会心率
 * @param HPRName
 * @desc HP再生率の表示名。初期値は「HP再生」
 * @default HP再生
 * @param MPRName
 * @desc MP再生率の表示名。初期値は「MP再生」
 * @default MP再生
 * @param TPRName
 * @desc TP再生率の表示名。初期値は「TP再生」
 * @default TP再生
 *
 */

Kiginu.Parameters = PluginManager.parameters('KGN_StatusLayout');
Kiginu.Param = Kiginu.Param || {};

Kiginu.Param.x1_shift		=	6;
Kiginu.Param.x2_shift		=	100;
Kiginu.Param.STwidth		=	60;

Kiginu.Param.xparamName		=	[	String(Kiginu.Parameters['HitName']),
									String(Kiginu.Parameters['EvaName']),
									String(Kiginu.Parameters['CriName']),
									String(Kiginu.Parameters['HPRName']),
									String(Kiginu.Parameters['MPRName']),
									String(Kiginu.Parameters['TPRName'])
];


//(function() {

//var _Window_Status_prototype_drawBlock3 = Window_Status.prototype.drawBlock3;
Window_Status.prototype.drawBlock3 = function(y) {
	this.drawParameters(Kiginu.Param.x1_shift, y);//本来はxは48
	this.drawEquipments(432, y);
	//_Window_Status_prototype_drawBlock3.call(this, y);
};

//var _Window_Status_prototype_drawParameters = Window_Status.prototype.drawParameters;
Window_Status.prototype.drawParameters = function(x, y) {
	//_Window_Status_prototype_drawParameters.call(this, x, y);
	var lineHeight = this.lineHeight();
	var x2_shift = Kiginu.Param.x2_shift;
	for (var i = 0; i < 6; i++) {
		var paramId = i + 2;
		var y2 = y + lineHeight * i;
		this.changeTextColor(this.systemColor());
		this.drawText(TextManager.param(paramId), x, y2, 160);
		this.resetTextColor();
		this.drawText(this._actor.param(paramId), x + x2_shift, y2, Kiginu.Param.STwidth, 'right');
		//this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');//元のやつ
	}
	//0=hit,1=eva,2=cri,3=cev,4=mev,5=mrf,6=cnt,7=hrg,8=mrg,9=trg
	for (var i = 0; i < 6; i++) {
		var xparamId = i;
		var y2 = y + lineHeight * i;
		this.changeTextColor(this.systemColor());
		this.drawText(Kiginu.Param.xparamName[i], x + x2_shift * 2, y2, 160);
		//if(i == 0){ this.drawText('命中率', x + x2_shift * 2, y2, 160);}//流石にバカバカしかった
		this.resetTextColor();
		if(i > 2) { xparamId += 4; }//_actor.xparamの7~9を呼び出すため
		//this.drawText(this._actor.xparam(xparamId) * 100, x + x2_shift * 3, y2, Kiginu.Param.STwidth, 'right');//1.01版では小数点がヤバかった
		this.drawText(Math.floor(this._actor.xparam(xparamId) * 100), x + x2_shift * 3, y2, Kiginu.Param.STwidth, 'right');//1.02で小数点切り捨て処理
	}
};

//})();