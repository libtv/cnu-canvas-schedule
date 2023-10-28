function SiganConfig(date, where, name) {
  this.date = date;
  this.where = where;
  this.name = name;
  this.firstRow = ["", "월", "화", "수", "목", "금", "토"];
}

SiganConfig.prototype.getWhere = function () {
  let v = this.date;

  let n = Math.floor(v);
  let f = Math.floor(v - 0.5);

  let h = n + f;
  let w = this.firstRow.indexOf(this.where);
  return [w, h];
};

function inDataSiganConfig() {
  this.where = [];
  this.name = "이름";
  this.backgroundColor = "#404040";
  this.color = "#404040";
}

inDataSiganConfig.prototype.initColor = function () {
  var RGB_1 = Math.floor(Math.random() * (255 + 1));
  var RGB_2 = Math.floor(Math.random() * (255 + 1));
  var RGB_3 = Math.floor(Math.random() * (255 + 1));
  var strRGBA = "rgba(" + RGB_1 + "," + RGB_2 + "," + RGB_3 + ",1)";
  this.backgroundColor = strRGBA;

  if (RGB_1 * 0.299 + RGB_2 * 0.587 + RGB_3 * 0.114 > 186) {
    this.color = "#000000";
  } else {
    this.color = "#FFFFFF";
  }
};
