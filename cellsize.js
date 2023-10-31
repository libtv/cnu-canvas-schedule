function CellSize(w, h) {
  this.width = w;
  this.height = h;

  this.widthSize = 0;
  this.heightSize = 0;

  this.cellCount = 3;
}

CellSize.prototype.setCellSize = function (w, h) {
  this.width = w;
  this.height = h;

  this.widthSize = this.width;
  this.heightSize = Math.round(this.height / this.cellCount) - 10;
};
