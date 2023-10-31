function DrawSchedule(id, type) {
  this.id = id;
  this.type = type;

  this.c = null;

  this.w_count = 7;
  this.h_count = 32;

  this.dataMap = {};
  this.firstRow = ["월", "화", "수", "목", "금", "토"];
  this.firstRowType2 = ["월", "화", "수", "목", "금", "토", "일"];

  this.smallCellSize = "drawschedule-small-cell";
  this.bigCellSize = "drawschedule-big-cell";

  /** @type {HTMLTableSectionElement} */
  this.tbody = null;

  this.siganData = {};
  this.siganDataArr = [];

  this.cellSize = new CellSize(0, 0);
}

DrawSchedule.prototype.init = function () {
  this.setDrawConfing();
  this.clearNode();
  this.draw();
  if (this.type == 0) {
    this.drawFirstRow();
  } else {
  }
};

DrawSchedule.prototype.setDrawConfing = function () {
  this.c = document.getElementById(this.id);
};

DrawSchedule.prototype.clearNode = function () {
  this.c.innerHTML = "";
};

DrawSchedule.prototype.draw = function () {
  if (this.type == 0) {
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
  } else {
    let main = document.createElement("div");
    main.classList.add("draw-schedule-type1");

    let headers = document.createElement("div");
    headers.classList.add("draw-schedule-type1-headers");
    let contents = document.createElement("div");
    contents.classList.add("draw-schedule-type1-contents");

    main.appendChild(headers);
    main.appendChild(contents);

    for (let i = 0; i < this.firstRowType2.length; i++) {
      let header = document.createElement("div");
      header.classList.add("draw-schedule-type1-headers-header");
      header.innerHTML = this.firstRowType2[i];
      headers.appendChild(header);
    }

    this.c.appendChild(main);

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;

    let lastDay = LastDayOfMonth(year, month);
    let firstDay = FirstDayOfMonth(year, month);

    let start_idx = this.firstRowType2.indexOf(firstDay) + 1;
    let count = start_idx;
    this.dataMap = [];

    for (let i = 0; i < lastDay; i++) {
      let content = document.createElement("div");
      content.classList.add("draw-schedule-type1-contents-content");

      if (i === 0) {
        for (let j = 0; j < start_idx - 1; j++) {
          let content2 = document.createElement("div");
          content2.classList.add("draw-schedule-type1-contents-content");
          contents.appendChild(content2);
        }
      }

      // content.innerHTML = i + 1;
      contents.appendChild(content);

      /** @type {RowConfig} */
      this.dataMap.push(new RowConfig(getOffset(content).left, getOffset(content).top, content));
      this.dataMap[i].setSize(getOffset(content).right, getOffset(content).bottom);

      // Cell Size 설정
      if (i === 0) {
        this.cellSize.setCellSize(this.dataMap[0].r - this.dataMap[0].w, this.dataMap[0].b - this.dataMap[0].h);
      }

      // Cell의 각각의 인덱스 설정
      let contentCell1 = document.createElement("div");
      let contentCell2 = document.createElement("div");
      contentCell1.classList.add("draw-schedule-type1-contents-content-cell-1");
      contentCell1.innerHTML = i + 1;
      contentCell2.classList.add("draw-schedule-type1-contents-content-cell-2");

      content.appendChild(contentCell1);
      content.appendChild(contentCell2);

      let contentCell3Arr = [];

      for (let j = 0; j < this.cellSize.cellCount; j++) {
        let contentCell3 = document.createElement("div");
        contentCell3.style.height = this.cellSize.heightSize + "px";
        contentCell3.style.marginTop = "7px";

        let data = { idx: j, data: contentCell3, used: false };
        contentCell3Arr.push(data);
        contentCell2.appendChild(contentCell3);
      }

      this.dataMap[i].setDataChildren(contentCell3Arr);
      this.dataMap[i].data_children_i = count;

      count += 1;
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

  if (this.type == 0) {
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
  } else {
    this.siganData = data;

    data.map((v) => {
      let [c1, c2] = this.getColor();
      v.color = c1;
      v.backgroundColor = c2;
    });
  }
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

DrawSchedule.prototype.draw2 = function () {
  /** @type {NoticeVO[]} */
  let data = this.siganData;
  data.map((v) => {
    let start_day = Number(v.stt_dt.substring(6, 8));
    let end_day = Number(v.end_dt.substring(6, 8));

    let endMinusStart = end_day - start_day;

    let beanCell = [];

    for (let i = start_day; i <= end_day; i++) {
      let target = this.dataMap[i - 1];
      let target_arr = target.data_children.filter((d) => d.used === false);
      beanCell.push({ ...target_arr, idx: i });
    }

    /** @type {Array} */
    let exsisArr = beanCell.reduce((prev, curr, idx) => {
      if (idx == 0) {
        for (let ij = 0; ij < 3; ij++) {
          if (typeof curr[ij] !== "undefined") {
            prev.push(curr[ij].idx);
          }
        }
        return prev;
      } else {
        let ra = [];
        for (let ij = 0; ij < 3; ij++) {
          if (typeof curr[ij] !== "undefined" && typeof prev[ij] !== "undefined") {
            ra.push(curr[ij].idx);
          }
        }
        return ra;
      }
    }, []);

    let target = exsisArr[0];

    if (typeof target === "undefined") {
      // end
    } else {
      let colorData = [];
      let colorColumn = [];
      let width = 0;
      let height = 0;
      for (let i = start_day; i <= end_day; i++) {
        let targetData = this.dataMap[i - 1];
        let s = targetData.data_children[target];
        let data = s.data;

        let rect = getOffset(data);
        width = rect.right - rect.left;
        height = rect.bottom - rect.top;

        if (typeof colorData[rect.top] == "undefined") {
          colorData[rect.top] = [];
          colorData[rect.top].push(rect.left);
          colorColumn.push(rect.top);
        } else {
          colorData[rect.top].push(rect.left);
        }

        s.used = true;
      }

      colorColumn.map((v2) => {
        let top = v2;
        let left = colorData[v2][0];
        let right = colorData[v2][colorData[v2].length - 1];
        let bottom = top + height;

        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = top + "px";
        div.style.left = left + "px";
        div.style.width = right - left + width + "px";
        div.style.height = bottom - top + "px";
        div.style.backgroundColor = v.backgroundColor;
        div.style.color = v.color;
        div.classList.add("real-info-cell");
        div.innerHTML = v.jemok;
        this.c.appendChild(div);
      });
    }
  });
};

DrawSchedule.prototype.getIdxByDay = function (idx) {
  return this.dataMap.findIndex((v, i) => {
    return v.data_children_i == idx;
  });
};

DrawSchedule.prototype.getColor = function () {
  var RGB_1 = Math.floor(Math.random() * (255 + 1));
  var RGB_2 = Math.floor(Math.random() * (255 + 1));
  var RGB_3 = Math.floor(Math.random() * (255 + 1));
  var strRGBA = "rgba(" + RGB_1 + "," + RGB_2 + "," + RGB_3 + ",1)";
  let backgroundColor = strRGBA;
  let color;

  if (RGB_1 * 0.299 + RGB_2 * 0.587 + RGB_3 * 0.114 > 186) {
    color = "#000000";
  } else {
    color = "#FFFFFF";
  }

  return [color, backgroundColor];
};
