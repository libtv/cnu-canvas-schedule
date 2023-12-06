# cnu-canvas-schedule

### 목록

- 학생 시간표
- 교수 시간표
- 교직원 일정

### 구현완료

- 학생 시간표/교수 시간표

  ![alt](./img/학생_시간표.PNG)

- 교직원 일정

  ![alt](./img/교수_할일.PNG)

### try it

- javascript
```javascript

 <script>
    let canvas = new DrawSchedule("draw-schedule", 1);
    let my_data = [
      { date: 5.5, 화: "공2204" },
      { date: 6, 화: "공2204" },
      { date: 1, 수: "공2204" },
      { date: 1.5, 수: "공2204" },
      { date: 2, 수: "공2204" },
      { date: 2.5, 수: "공2204" },
      { date: 3, 수: "공2204" },

      { date: 5, 수: "공2204" },
      { date: 5.5, 수: "공2204" },

      { date: 6, 목: "영2204" },
      { date: 6.5, 목: "영2204" },
    ];

    let my_data2 = [
      { jemok: "통합정보시스템 서비스 중지 안내", stt_dt: "20231002", stt_time: "0900", end_dt: "20231003", end_time: "2400" },
      { jemok: "법전원 하는 날", stt_dt: "20231003", stt_time: "0900", end_dt: "20231004", end_time: "2400" },
      { jemok: "학과장 시스템 개발", stt_dt: "20231004", stt_time: "0900", end_dt: "20231005", end_time: "2400" },
      { jemok: "쉬는날", stt_dt: "20231005", stt_time: "0900", end_dt: "20231005", end_time: "2400" },
      { jemok: "놀이공원", stt_dt: "20231003", stt_time: "0900", end_dt: "20231005", end_time: "2400" },
      { jemok: "어린이날", stt_dt: "20231008", stt_time: "0900", end_dt: "20231013", end_time: "2400" },
      { jemok: "염소보는날", stt_dt: "20231012", stt_time: "0900", end_dt: "20231018", end_time: "2400" },
    ];

    my_data2 = my_data2.sort((a, b) => {
      return Number(a.stt_dt) - Number(b.stt_dt);
    });

    canvas.init();
    canvas.setData(my_data2);
    canvas.dr();
  </script>

```

- html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <script src="./canvas.js"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="./row-config.js"></script>
    <script src="./uitls.js"></script>
    <script src="./cellsize.js"></script>
    <script src="./sigan-config.js"></script>
    <script src="./draw.js"></script>
    <link rel="stylesheet" href="draw.css" />
    <title>Document</title>
  </head>
  <body>
    <div id="draw-schedule"></div>
  </body>
</html>
```

### LICENSE 
This project is MIT License 
