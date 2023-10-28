function Canvas(id, type) {
  this.id = id;
  /** @type {CanvasRenderingContext2D} */
  this.c = null;
  this.ctx = null;

  this.w_size = 100;
  this.h_size = 40;
  this.w_count = 7;
  this.h_count = 32;
  this.fillStyle = "#ff6";

  this.dataMap = {};
  this.dataColumn = {};
  this.dataRow = ["월", "화", "수", "목", "금", "토"];
}

Canvas.prototype.initCanvas = function () {
  this.setDrawConfing();
  this.drawCanvas();
};

Canvas.prototype.setDrawConfing = function () {
  this.c = document.getElementById(this.id);
  /** @type {CanvasRenderingContext2D} */
  this.ctx = this.c.getContext("2d");
  this.ctx.fillStyle = "#ff6";
  this.ctx.font = "20px serif";
};

Canvas.prototype.drawCanvas = function () {
  for (let w = 1; w <= this.w_count; w++) {
    for (let h = 1; h <= this.h_count; h++) {
      let draw_w_prev = this.w_size * (w - 1);
      let draw_w = this.w_size * (w - 1);
      let draw_h_prev = this.h_size * (h - 1);
      let draw_h = this.h_size * h;
      this.ctx.strokeRect(draw_w_prev, draw_h_prev, this.w_size, this.h_size);

      this.dataMap[w.toString() + h.toString()] = { w: w, h: h };

      if (h == 1) {
        if (w == 1) {
          this.ctx.strokeText("시간/요일", draw_w + 5, draw_h - 10);
        } else {
          let txt = this.dataRow[w - 2];
          this.ctx.strokeText(txt, draw_w + 40, draw_h - 10);
        }
      }
    }
  }
};
