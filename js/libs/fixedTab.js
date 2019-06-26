
// var ofixed_table_st = window.setTimeout;
// window.setTimeout = function(fRef, mDelay) {
//     if (typeof fRef == 'function') {
//         var argu = Array.prototype.slice.call(arguments, 2);
//         var f = (function() {
//             fRef.apply(null, argu);
//         });
//         return ofixed_table_st(f, mDelay);
//     }
//     return ofixed_table_st(fRef, mDelay);
// };

function oFixedTable(id, obj, _cfg){
    this.id = id;
    this.obj = obj;
    this.box = this.obj.parentNode;
    this.config = {
        fixHead: _cfg.fixHead || true,
        rows: _cfg.rows || 1,
        cols: _cfg.cols || 0,
        background: _cfg.background || '#f1f1f1',
        zindex: _cfg.zindex || 9999
    };

    window.setTimeout(this._fixTable, 100, this);
}

oFixedTable.prototype._fixTable = function(_){
    if(_.obj.rows.length <= 0){
        return false;
    }
    var hasLeft = _.buildLeft();
    var hasHead = _.buildHead();

    _.box.onscroll = function(){
        if(_.divHead != null){
            _.divHead.scrollLeft = this.scrollLeft;
        }
        if(_.divLeft != null){
            _.divLeft.scrollTop = this.scrollTop;
        }
    };
    if(hasHead && hasLeft){
        _.buildTopLeft();
    }
};

oFixedTable.prototype.buildHead = function(){
    var _ = this;
    var strDivId = _.id + '_div_head';
    var strTbId = _.id + '_tb_header';
    var div = document.createElement('div');
    div.id = strDivId;
    div.style.cssText = 'position:absolute;overflow:hidden;z-index:' + (_.config.zindex + 1) + ';';
    div.innerHTML = '<table id="' + strTbId + '" cellpadding="0" cellspacing="0" style="background:' + _.config.background + ';"></table>';

    _.box.insertBefore(div, _.obj);

    _.divHead = div;
    _.tbHead = document.getElementById(strTbId);

    //判断是否出现纵向滚动条，若出现，高度减去滚动条宽度 16px
    var sw = _.obj.offsetHeight > _.box.offsetHeight ? 16 : 0;
    _.divHead.style.width = (_.box.offsetWidth) + 'px';

    _.tbHead.style.textAlign = _.obj.style.textAlign;
    _.tbHead.style.width = _.obj.offsetWidth + 'px';

    var hasHead = false;
    if(_.config.fixHead && _.obj.tHead != null){
        var tHead = _.obj.tHead;
        _.tbHead.appendChild(tHead.cloneNode(true));
        hasHead = true;
    } else {
        for(var i=0; i<_.config.rows; i++){
            var row = _.obj.rows[i];
            if(row != null){
                _.tbHead.appendChild(row.cloneNode(true));
                hasHead = true;
            }
        }
    }
    return hasHead;
};

oFixedTable.prototype.buildLeft = function(){
    var _ = this;
    if(_.config.cols <= 0){
        return false;
    }
    var strDivId = _.id + '_div_left';
    var strTbId = _.id + '_tb_left';
    var div = document.createElement('div');
    div.id = strDivId;
    div.style.cssText = 'position:absolute;overflow:hidden;z-index:' + _.config.zindex + ';';
    div.innerHTML = '<table id="' + strTbId + '" cellpadding="0" cellspacing="0" style="background:' + _.config.background + ';"></table>';

    _.box.insertBefore(div, _.obj);

    _.divLeft = div;
    _.tbLeft = document.getElementById(strTbId);

    _.tbLeft.style.textAlign = _.obj.style.textAlign;

    //判断是否出现横向滚动条，若出现，高度减去滚动条高度 16px
    var sw = _.obj.offsetWidth > _.box.offsetWidth ? 16 : 0;
    _.divLeft.style.height = (_.box.offsetHeight) + 'px';

    var hasLeft = false;
    for(var i=0,rows=_.obj.rows.length; i<rows; i++){
        var row = _.tbLeft.insertRow(_.tbLeft.rows.length);
        row.style.cssText = _.obj.rows[i].style.cssText;

        for(j=0; j<_.config.cols; j++){
            var cell = _.obj.rows[i].cells[j];
            if(cell != null){
                row.appendChild(cell.cloneNode(true));
                cell.style.cssText = _.obj.rows[i].cells[j].style.cssText;
                hasLeft = true;
            }
        }
    }
    return hasLeft;
};

oFixedTable.prototype.buildTopLeft = function(){
    var _ = this;
    var strDivId = _.id + '_div_top_left';
    var strTbId = _.id + '_tb_top_left';
    var div = document.createElement('div');
    div.id = strDivId;
    div.style.cssText = 'position:absolute;overflow:hidden;z-index:' + (_.config.zindex + 2) + ';';
    div.innerHTML = '<table id="' + strTbId + '" cellpadding="0" cellspacing="0" style="background:' + _.config.background + ';"></table>';

    _.box.insertBefore(div, _.obj);

    var tbTopLeft = document.getElementById(strTbId);
    tbTopLeft.style.textAlign = _.obj.style.textAlign;

    for(var i=0; i<_.config.rows; i++){
        var row = tbTopLeft.insertRow(tbTopLeft.rows.length);
        row.style.cssText = _.obj.rows[i].style.cssText;

        for(j=0; j<_.config.cols; j++){
            var cell = _.obj.rows[i].cells[j];
            if(cell != null){
                row.appendChild(cell.cloneNode(true));
                cell.style.cssText = _.obj.rows[i].cells[j].style.cssText;
                hasLeft = true;
            }
        }
    }
};
