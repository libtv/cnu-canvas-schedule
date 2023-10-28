function RowConfig(w, h, data) {
  this.w = w;
  this.h = h;

  /** @type {HTMLTableCellElement} */
  this.data = data;
}

/*######################################################
######################################################
######################################################
###################################################### */

function DrawSchedule(id) {
  this.id = id;

  this.c = null;

  this.w_count = 7;
  this.h_count = 32;

  this.dataMap = {};
  this.firstRow = ["월", "화", "수", "목", "금", "토"];

  this.smallCellSize = "drawschedule-small-cell";
  this.bigCellSize = "drawschedule-big-cell";
}

DrawSchedule.prototype.init = function () {
  this.setDrawConfing();
  this.clearNode();
  this.draw();

  this.checkPos();
  this.drawFirstRow();
};

DrawSchedule.prototype.setDrawConfing = function () {
  this.c = document.getElementById(this.id);
};

DrawSchedule.prototype.clearNode = function () {
  this.c.innerHTML = "";
};

DrawSchedule.prototype.draw = function () {
  let table = document.createElement("table");
  let thaed = document.createElement("thead");
  let tbody = document.createElement("tbody");

  table.appendChild(thaed);
  table.appendChild(tbody);

  this.c.appendChild(table);

  // table 추가
  for (let h = 0; h < this.h_count; h++) {
    let row = document.createElement("tr");

    for (let w = 0; w < this.w_count; w++) {
      let row_data;
      if (h == 0) {
        row_data = document.createElement("th");
      } else {
        row_data = document.createElement("td");
      }

      let config = new RowConfig(w, h, row_data);
      let position = this.position(w, h);
      this.dataMap[position] = config;

      row.appendChild(row_data);

      if (h == 0) {
        thaed.appendChild(row);
      } else {
        tbody.appendChild(row);
      }
    }
  }
};

DrawSchedule.prototype.position = function (w, h) {
  let pos = w + "/" + h;
  return pos;
};

DrawSchedule.prototype.getRowCofing = function (pos) {
  return this.dataMap[pos];
};

DrawSchedule.prototype.checkPos = function () {
  console.log(this.dataMap);
};

DrawSchedule.prototype.drawFirstRow = function () {
  /* 월화수목금토 넣기 */
  let h = 0;
  this.firstRow.map((v, i) => {
    let w = i + 1;
    let pos = this.position(w, h);
    /** @type {RowConfig} */
    let rowConfig = this.getRowCofing(pos);

    let data = rowConfig.data;
    data.innerHTML = v;
  });

  let res = 1;
  let w = 0;
  for (h = 0; h < this.h_count; h++) {
    let pos = this.position(w, h);
    /** @type {RowConfig} */
    let rowConfig = this.getRowCofing(pos);
    let data = rowConfig.data;

    data.classList.add(this.smallCellSize);

    if (h == 0) continue;

    data.classList.add(this.bigCellSize);

    data.innerHTML = res;
    res += 0.5;
  }
};
