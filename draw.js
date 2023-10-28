function DrawSchedule(id) {
  this.id = id;

  this.c = null;

  this.w_count = 7;
  this.h_count = 32;

  this.dataMap = {};
  this.firstRow = ["월", "화", "수", "목", "금", "토"];

  this.smallCellSize = "drawschedule-small-cell";
  this.bigCellSize = "drawschedule-big-cell";

  /** @type {HTMLTableSectionElement} */
  this.tbody = null;

  this.siganData = {};
  this.siganDataArr = [];
}

DrawSchedule.prototype.init = function () {
  this.setDrawConfing();
  this.clearNode();
  this.draw();

  this.drawFirstRow();
  //   this.colSpanTest();
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

  this.tbody = tbody;

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

DrawSchedule.prototype.getRowConfig = function (pos) {
  /** @type {RowConfig} */
  let res = this.dataMap[pos];
  return res;
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
    let rowConfig = this.getRowConfig(pos);

    let data = rowConfig.data;
    data.innerHTML = v;
  });

  /* 시간표 작성 -  1, 2, 3, 4, .. , 16 */
  let res = 1;
  let w = 0;
  for (h = 0; h < this.h_count; h++) {
    let pos = this.position(w, h);
    /** @type {RowConfig} */
    let rowConfig = this.getRowConfig(pos);
    let data = rowConfig.data;

    data.classList.add(this.smallCellSize);
    if (h == 0) continue;

    data.classList.add(this.bigCellSize);
    data.innerHTML = res;
    res += 0.5;
  }
};

DrawSchedule.prototype.rowSpan = function (/** @type {RowConfig} */ a, /** @type {RowConfig} */ b) {
  if (a.w !== b.w) {
    return;
  }

  let count = b.h - a.h + 1;
  let rowA = a.data;

  // row 병합
  $(rowA).attr("rowspan", count);

  // row 삭제
  for (let h = a.h + 1; h <= b.h; h++) {
    let pos = this.position(a.w, h);
    let t_cfg = this.getRowConfig(pos);
    let target = t_cfg.data;

    $(target).remove();
  }
};

DrawSchedule.prototype.colSpanTest = function () {
  let posA = this.position(1, 2);
  let posB = this.position(1, 10);
  let a = this.getRowConfig(posA);
  let b = this.getRowConfig(posB);

  this.rowSpan(a, b);
};

DrawSchedule.prototype.getParam = function (v) {
  let date = v.date;
  let where, name;
  delete v.date;

  Object.entries(v).map(([k, v]) => {
    if (typeof v !== "undefined" && this.firstRow.indexOf(k) >= 0) {
      where = k;
      name = v;
    }
  });

  return [date, where, name];
};

DrawSchedule.prototype.setData = function (/** @type {Array} */ data) {
  let value = {};
  let value_arr = [];

  data.map((v) => {
    let param = this.getParam(v);
    let name = param[2];

    let d = new SiganConfig(param[0], param[1], name);
    let a = d.getWhere();

    if (value_arr.indexOf(name) == -1) value_arr.push(name);

    // 초기 설정
    if (!value[name]) {
      /** @type {inDataSiganConfig} */
      value[name] = new inDataSiganConfig();
      value[name].where = [];
      value[name].where.push({ w: a[0], h: a[1] });
      value[name].name = name;
      value[name].initColor();
    } else {
      /** @type {inDataSiganConfig} */
      value[name].where.push({ w: a[0], h: a[1] });
    }
  });

  this.siganData = value;
  this.siganDataArr = value_arr;
};

DrawSchedule.prototype.siganDraw = function () {
  this.siganDataArr.map((v) => {
    /** @type {inDataSiganConfig} */
    let siganData = this.siganData[v];
    let sigan_width_set = siganData.where.reduce((prev, curr) => {
      let w = curr.w;
      if (prev.indexOf(w) == -1) {
        prev.push(w);
      }
      return prev;
    }, []);

    for (let i = 0; i < sigan_width_set.length; i++) {
      let my_w = sigan_width_set[i];
      let filter_siganData = siganData.where.filter((v) => {
        let w = v.w;
        return w === my_w;
      });

      while (filter_siganData.length > 0) {
        let i = 0;
        let j = 1;
        let w = filter_siganData[i].w;
        let f_h = filter_siganData[i].h;
        let l_h;
        let index = f_h;

        for (j; j < filter_siganData.length; j++) {
          index += 1;
          if (filter_siganData[j].h !== index) {
            break;
          } else {
            l_h = filter_siganData[j].h;
          }
        }

        let posA = this.position(w, f_h);
        let posB = this.position(w, l_h);

        // a가 실제 사용할 것
        /** @type {RowConfig} */
        let a = this.getRowConfig(posA);
        let b = this.getRowConfig(posB);

        if (typeof b === "undefined") {
        } else {
          this.rowSpan(a, b);
        }

        /** @type {HTMLTableRowElement} */
        let data = a.data;

        data.innerHTML = siganData.name;
        data.style.background = siganData.backgroundColor;
        data.style.color = siganData.color;

        filter_siganData.splice(i, j - i);
      }
    }
  });
};
