/*
기능개발
문제 설명
프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다.

또, 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 
이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 
개발 속도가 적힌 정수 배열 speeds가 주어질 때 각 배포마다 몇 개의 
기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

제한 사항
작업의 개수(progresses, speeds배열의 길이)는 100개 이하입니다.
작업 진도는 100 미만의 자연수입니다.
작업 속도는 100 이하의 자연수입니다.
배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다. 
예를 들어 진도율이 95%인 작업의 개발 속도가 하루에 4%라면 배포는 2일 뒤에 이루어집니다.
입출력 예
progresses	speeds	return
[93, 30, 55]	[1, 30, 5]	[2, 1]
[95, 90, 99, 99, 80, 99]	[1, 1, 1, 1, 1, 1]	[1, 3, 2]
입출력 예 설명
입출력 예 #1
첫 번째 기능은 93% 완료되어 있고 하루에 1%씩 작업이 가능하므로 7일간 작업 후 배포가 가능합니다.
두 번째 기능은 30%가 완료되어 있고 하루에 30%씩 작업이 가능하므로 3일간 작업 후 배포가 가능합니다. 
하지만 이전 첫 번째 기능이 아직 완성된 상태가 아니기 때문에 첫 번째 기능이 배포되는 7일째 배포됩니다.
세 번째 기능은 55%가 완료되어 있고 하루에 5%씩 작업이 가능하므로 9일간 작업 후 배포가 가능합니다.

따라서 7일째에 2개의 기능, 9일째에 1개의 기능이 배포됩니다.

입출력 예 #2
모든 기능이 하루에 1%씩 작업이 가능하므로, 
작업이 끝나기까지 남은 일수는 각각 5일, 10일, 1일, 1일, 20일, 1일입니다. 
어떤 기능이 먼저 완성되었더라도 앞에 있는 모든 기능이 완성되지 않으면 배포가 불가능합니다.

따라서 5일째에 1개의 기능, 10일째에 3개의 기능, 20일째에 2개의 기능이 배포됩니다.

※ 공지 - 2020년 7월 14일 테스트케이스가 추가되었습니다.
*/

/*
progresses 배열과 speeds 배열들을 매 단계 더해준다. 
앞에서 부터 100넘은 것들은 count 하여 answer 배열에 추가 한다. 
그다음 100 안넘은 index에 대하여 덧셈을 실행 해준다. 

or
0번째 인덱스와 speeds 0번째 인텍스가 n번 더해지고 100>일 때
n을 speeds에 map으로 적용시켜준다. 
그 다음 progresses와 더해준다. 

100이 넘는 index 를 앞열에서 부터 카운트 // progresses 길이가 되면 stop
아니면 
아닌 index 에서 부터 다시 100이 넘을 때가지 실행

or
새로운 배열을 만들어 progresses index 와 speeds index 숫자가 100이 넘는 count를
배열로 맞춰 준다. 
그다음 새로운 arr 에서 다음 index 보다 크거나 같으면 count ++/ 아니면 return 후 다음부터 1진행... 

*/

let progresses = [93, 30, 55];
let speeds = [1, 30, 5];

function solution(progresses, speeds) {
  let arr = progresses.map((x, i) => {
    let count = 0;
    while (x < 100) {
      //이부분을 while 대신 Math.ceil를 사용하여 간결하게 만들었다.
      x += speeds[i];
      count++;
    }
    return count;
  });

  let strt = arr[0];
  let count = 1;
  let answer = [];
  for (let i = 1; i < arr.length; i++) {
    if (strt >= arr[i]) {
      count++;
    } else {
      answer.push(count);
      count = 1;
      strt = arr[i];
    }
  }
  answer.push(count);

  return answer;
}

console.log(solution(progresses, speeds));

//2207007 리팩토링
function solution(progresses, speeds) {
  let answer = [];

  //작업완료일 배열만들기
  let result = progresses.map((el, i) => {
    let count = 0;
    while (el < 100) {
      el += speeds[i];
      count++;
    }
    return count;
  });

  //결과 배열 만들기
  let count = 1;
  let temp = result[0];
  for (let i = 1; i < result.length; i++) {
    if (temp >= result[i]) {
      count++;
    } else {
      answer.push(count);
      count = 1;
      temp = result[i];
    }
  }
  answer.push(count);
  return answer;
}

//리팩토링
function solution(progresses, speeds) {
  //작업완료일 배열만들기
  let result = progresses.map((el, i) => {
    let count = 0;
    while (el < 100) {
      el += speeds[i];
      count++;
    }
    console.log(count);
    return count;
  });

  //결과 배열 만들기
  let answer = [];
  let count = 1;
  let temp = result[0];
  let i = 1;
  while (i < result.length) {
    if (temp >= result[i]) {
      count++;
      i++;
    } else {
      answer.push(count);
      count = 1;
      temp = result[i];
    }
  }
}

//reference 참고하고 리팩토링
function solution(progresses, speeds) {
  // 작업 완료 일 배열
  let days = progresses.map((el, i) => {
    let day = Math.ceil((100 - el) / speeds[i]);
    return day;
  });

  // 결과값 만들기
  let answer = [0];
  let temp = days[0];
  for (let i = 0, j = 0; i < days.length; i++) {
    if (temp >= days[i]) {
      answer[j]++;
    } else {
      temp = days[i];
      answer[++j] = 1;
    }
  }
  return answer;
}

//for과 length를 활용하여 리팩토링
function solution(progresses, speeds) {
  let answer = [];
  let day = 0;

  for (let i = 0; i < progresses.length; i++) {
    let days = Math.ceil((100 - progresses[i]) / speeds[i]);

    if (day >= days) {
      answer[answer.length - 1]++;
    } else if (day < days) {
      day = days;
      answer[answer.length] = 1;
    }
  }
}

//Reference : reduce 활용
