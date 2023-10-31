function LastDayOfMonth(Year, Month) {
  return new Date(Year, Month, 0).getDate();
}

function FirstDayOfMonth(Year, Month) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[new Date(Year, Month - 1, 1).getDay()];
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
  };
}
