/***************************************
날짜 관련 함수 정리(공부한거 까먹으면 아깝자나....ㅜ)
getFullYear() : 연도 반환
getMonth() : 월 반환 1월-12월 -> 0-11 (해당하는 월을 출력하고 싶을때 getMonth()+1로 해줌)
getDay() : sunday-saturday -> 0-6
getDate() : 일 반환
***************************************/
/**
todolist
1. 날짜 클릭 -> 색 바뀌기, 날짜, 요일 바뀌기
2. todolist 만들기
**/

let el = selector => document.querySelector(selector);
let elAll = selector => document.querySelectorAll(selector);
let dom = selector => document.createElement(selector)

let currenTitle = el('#current-year-month');
let calendarBody = el('#calendar-body');
let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);
let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let pageFirst = first;
let pageYear;

//윤달
if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear
} else {
  pageYear = notLeapYear
}

//캘린더 그리기
let showCalendar = () => {
  let monthCnt = 100;
  let cnt = 1;

  for (let i = 0; i < 6; i++) { //주 단위
    let $tr = dom('tr');
    $tr.setAttribute('id', monthCnt);
    monthCnt++;

    for (let j = 0; j < 7; j++) { //요일 단위
      //빈칸을 만드려면 빈칸에 해당하는 조건을 만드는게 당연하지!!
      //시작요소 : 첫번째 주라면 시작하는 요일부터 날짜를 출력하기 위한 설정 
      //마지막요소 : 월마다 총 일수가 다르기 때문에 pageYear에 월마다 일수를 넣음. 비교하면서 출력
      if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
        let $td = dom('td');
        $tr.appendChild($td);
      }
      else {
        let $td = dom('td');
        $td.textContent = cnt;
        $td.setAttribute('id', cnt);
        $tr.appendChild($td);
        cnt++;
      }
    }
    calendarBody.appendChild($tr);
  }
}

//월 출력
let showMonth = () => {
  currenTitle.innerHTML = `${monthList[first.getMonth()]} ${first.getFullYear()}`
}

//달력 업데이트
let removeCalendar = () => {
  let catchTr = 100;
  for (let i = 100; i < 106; i++) {
    let $tr = document.getElementById(catchTr);
    $tr.remove();
    catchTr++;
  }
}

//이전, 다음 월 계산
let calendarCal = e => {
  today = new Date(today.getFullYear(), today.getMonth() - e, today.getDate());
  if (pageFirst.getMonth() === 1) {
    pageFirst = new Date(first.getFullYear() - e, 12, 1);

  } else {
    pageFirst = new Date(first.getFullYear(), first.getMonth() - e, 1);
    first = pageFirst;
  }
}

let btnEvt = () => {
  el('.btn-wrap').addEventListener('click', e => {
    if (e.target.id == 'prev') {
      calendarCal(1)
      showMonth();
      removeCalendar();
      showCalendar();

    } else if (e.target.id == 'next') {
      calendarCal(-1)
      showMonth();
      removeCalendar();
      showCalendar();
    }
  })
}

//오늘 날짜 출력
let showMain = () => {
  let mainTodayDay = el('.main-day');
  let mainTodayDate = el('.main-date');
  mainTodayDay.innerHTML = dayList[today.getDay()];
  mainTodayDate.innerHTML = today.getDate();

  let todayDate = document.getElementById(today.getDate());
  todayDate.classList.add('active');
  todayDate.style.color = 'red'

}

//날짜 클릭 -> 그 날짜, 요일 출력 =>보류
// let clickToday = e => {
//   let group=document.getElementById(pageYear[first.getMonth()])
//   console.log(group);
// }
// clickToday();

let addList = () => { //엔터도 동작하고싶어여
  el('.input-data').addEventListener('click', () => {
    if (el('.input-box').value.length == 0) {
      alert('Please enter a task');
    } else {
      el('.input-list ul').innerHTML +=
        `<li>${el('.input-box').value} <button class="delText">X</button></li>`
    }
    el('.input-box').value = '';
  })
}

let delEvt = () => {
  el('.delText').addEventListener('click', ()=>{
    el('.list li').remove()
  })
}

let init = () => {
  showCalendar();
  showMonth();
  btnEvt();
  showMain();
  addList();
}
init();