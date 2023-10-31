function RowConfig(w, h, data) {
  this.w = w;
  this.h = h;

  /** @type {HTMLTableCellElement} */
  this.data = data;
  this.data_children = null;
  this.data_children_i = 0;

  this.r = 0;
  this.b = 0;
}

RowConfig.prototype.setSize = function (r, b) {
  this.r = r;
  this.b = b;
};

RowConfig.prototype.setDataChildren = function (dc) {
  this.data_children = dc;
};
