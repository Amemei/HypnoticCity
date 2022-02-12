//messageウインドウ変更
//X変更箇所--------------------------------------------------------

Window_Message.prototype.initialize = function() {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2 +140;  //ここの=の中身を変える
    Window_Base.prototype.initialize.call(this, x, 0, width, height);
    this.openness = 0;
    this.initMembers();
    this.createSubWindows();
    this.updatePlacement();
};


//ウインドウの幅変更----------------------------------------------
Window_Message.prototype.windowWidth = function() {
	Graphics.boxWidth =Graphics.boxWidth -280;
    return Graphics.boxWidth;
};

//ウインドウに何行分文字を表示させるかの設定------------------------------
Window_Message.prototype.numVisibleRows = function() {
    return 4;
};
//Y変更箇所
Window_Message.prototype.updatePlacement = function() {
    this._positionType = $gameMessage.positionType();
   //恐らくタッチ機能だと思われるメソッドがあるので、ここの*以降の表記を変えたのが無難だと思います。
    this.y = this._positionType * (Graphics.boxHeight - this.height) / 2;
   //---------------------------------------------------------------------------------------------
    this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
};
