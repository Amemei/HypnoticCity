//=============================================================================
// One-Actor Menu Version 1.01
//=============================================================================

/*:
 * @plugindesc One-Actor's menu. This plugin is made for one playable actor only.
 * @author Ventiqu - 2015
 *
 * @help Remember to turn off Formation! Go to Database - System - Menu Commands and turn off Formation.
 */

 (function() {
// this will create menus like status- and gold window
     var _Scene_Menu_create = Scene_Menu.prototype.create;
     Scene_Menu.prototype.create = function() {
         _Scene_Menu_create.call(this);
         this._statusWindow.x = 335;
         this._statusWindow.y = 130;
         this._goldWindow.x = Graphics.boxWidth / this._goldWindow.width + 92;
         this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height - 135;
     };
// this will create commandwindow
    Scene_Menu.prototype.createCommandWindow = function() {
        this._commandWindow = new Window_MenuCommand(95, 130); //Position for menu x and y
        this._commandWindow.setHandler('item',      this.commandItem.bind(this));
        this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
        this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
        this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
        this._commandWindow.setHandler('save',      this.commandSave.bind(this));
        this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
        this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_Menu.prototype.commandPersonal = function() {
        this._statusWindow.setFormationMode(false);
        switch (this._commandWindow.currentSymbol()) {
        case 'skill':
            SceneManager.push(Scene_Skill);
            break;
        case 'equip':
            SceneManager.push(Scene_Equip);
            break;
        case 'status':
            SceneManager.push(Scene_Status);
            break;
          }
    };

    Scene_Menu.prototype.onPersonalOk = function() {
    };


// Rows for menucommands
    Window_MenuCommand.prototype.numVisibleRows = function() {
        return 7;
    };

// height for goldwindow
    Window_Gold.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

// width for menustatus
    Window_MenuStatus.prototype.windowWidth = function() {
        return 325;
    };
// height for windowstatus
    Window_MenuStatus.prototype.windowHeight = function() {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(2);
        return Graphics.boxHeight - h1 - h2 - 85;
    };
// maxCols is for max party members shown. This is set to 1, because this is single-player menu.
// do not change this unless you know what you are doing.
    Window_MenuStatus.prototype.maxCols = function() {
        return 1;
    };
// just like maxCols, but this is rows. This is set to 1, because this is single-player menu.
// do not change this unless you know what you are doing.
    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };
// draws actor face. Actor's face is fixed.
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var w = Math.min(rect.width, 144);
        var h = Math.min(rect.height, 144);
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x + 60, rect.y + lineHeight * 2.0, w, h); // change x + 50 for example if you want do change its x position.
        this.changePaintOpacity(true);
    };
// draws actor name, level, class, hp, mp and status icons.
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
//        this.drawActorClass(actor, x + 160, y + lineHeight * 0, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3.1, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2.1, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function() {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };

})();
