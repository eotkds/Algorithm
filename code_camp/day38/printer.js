/*
프린터
문제 설명
일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다.
 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 
 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 
 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 
J를 대기목록의 가장 마지막에 넣습니다.
3. 그렇지 않으면 J를 인쇄합니다.
예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 
2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다.

내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다.
 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 
내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 
매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 
solution 함수를 작성해주세요.

제한사항
현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 
가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.
입출력 예
priorities	location	return
[2, 1, 3, 2]	2	1
[1, 1, 9, 1, 1, 1]	0	5
입출력 예 설명
예제 #1

문제에 나온 예와 같습니다.

예제 #2

6개의 문서(A, B, C, D, E, F)가 인쇄 대기목록에 있고 중요도가 1 1 9 1 1 1 이므로 C D E F A B 순으로 인쇄합니다.
 */

/*
객체를 이용하는 것이 어떨까?
idx 를 key, property를 value로 만들고, 나중에 확인이 안된다.
나중에 바꿔주면 객체를 바꿔주면 되려나?
0에서 가장 뒤로 갔다면 객에서 예를 들면
0 - > 4 로 바뀔것이다. 그러면 기존 location은 의미가 없는듯 

value로 현재 idx 값을 넣는 경우, 나중에 바꿔줄때 값을 찾아줘야 하는데..
예제로 예를 들어보자
0 : {value: 2, idx: 2},
1 : {value: 1, idx: 3},
2 : {value: 3}, idx,
3 : {value: 2}

[2,1,3,2] -? [1,3,2,2] -> [3,2,2,1]

아니면 idx값만 갖는 배열을 만들어 미러링을 해보자
[0,1,2,3] -> [1,2,3,0] -> [2,3,0,1]
[2,1,3,2] -> [1,3,2,2] -> [3,2,2,1]

이게 더 좋은 방법 같다.
우선 shift방식으로 0 idx 값을 바꿔주는 식으로 

for 문보다는 while 문으로 해야 할것이다. 
기존 배열은 없애고 idx만 기록으로


*/

function solution(priorities, location) {
  let arr = [];
  priorities.forEach((x, i) => {
    arr[i] = i;
  });
  let i = 0;
  while (priorities.length > 0) {
    console.log(priorities, arr);
    if (priorities[0] === Math.max(...priorities)) {
      priorities.shift();
      i++;
    } else {
      priorities.push(priorities[0]);
      priorities.shift();
      arr.push(arr[i]);
      arr.splice(i, 1);
    }
  }

  return arr.indexOf(location) + 1;
}

let priorities = [2, 1, 3, 2];
let location = 2;

//220719 Refactoring
function solution(priorities, location) {
  let arr = priorities.map((v, i) => [v, i]);
  let answer = []; //프린터 순서 배열
  let max = Math.max(...priorities);

  while (arr.length > 0) {
    let num = arr[0][0];
    //max이면 첫번째 순서이기 때문에 answer추가
    if (num === max) {
      answer[answer.length] = arr[0];
      //추가하고 0번째는 지워준다.
      arr.splice(0, 1);
      //priorities 배열에 있는 숫자도 지워주고, max값을 갱신
      priorities.splice(priorities.indexOf(max), 1);
      max = Math.max(...priorities);
    } else {
      //맨 뒤로 보내주고 지워준다.
      arr[arr.length] = arr[0];
      arr.splice(0, 1);
    }
  }

  //순서 찾아서 반환
  for (let i = 0; i < answer.length; i++) {
    if (answer[i][1] === location) return i + 1;
  }
}

//reference refactoring1 - 런타임 에러 발생
function solution(priorities, location) {
  //바꿀 때마다 배열을 평가
  let arr = priorities.map((v, i) => [v, i]);

  function recursion(arr, location) {
    let idx;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i][1] === location) idx = i + 1;
      if (arr[i][0] < arr[i + 1][0]) {
        arr[arr.length] = arr[0];
        arr.shift();
        return recursion(arr, location);
      }
    }

    return idx;
  }

  return recursion(arr, location);
}

//reference refactoring2 : 런타임 에러
function solution(priorities, location) {
  let arr = priorities.map((v, i) => [v, i]);

  function recursion(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i][0] < arr[i + 1][0]) {
        arr[arr.length] = arr[0];
        arr.shift();
        return recursion(arr);
      }
    }

    return arr;
  }
  let sorted_arr = recursion(arr);

  for (let i = 0; i < sorted_arr.length; i++) {
    if (sorted_arr[i][1] === location) return i + 1;
  }
}

//reference refactoring3 : 실패 시간 초과
//매번 array 정렬을 해야만 하니깐 오래 걸린것 같다. 중간에 location을 찾아주면 좀 낫지 않을까?
function solution(priorities, location) {
  let arr = priorities.map((v, i) => [v, i]);

  //그렇다면 직접 정렬을 해보자
  let start = true;

  while (start) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i][0] < arr[i + 1][0]) {
        arr[arr.length] = arr[0];
        arr.shift();
        break;
      }

      if (i === arr.length - 2) {
        start = false;
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] === location) return i + 1;
  }
}

///reference refactoring4
//모든 순회가 끝나야만 평가가 가능함 - sort()를 사용하여 미리 정렬된 배열을 쓰려고 했으나
//sort()는 mutator method 이기 때문에 불가능
/*
우선 순번이 location까지 문제가 없어야 하는데 그러기 위해서는 max값이 필요함
Reference에서는 location값을 따로 저장하고, 0으로 바꾸고 다시 원래값을 바꾸는 번거로움이 있다고 생각함.

다른사람 풀이를 참고하여 ...
*/
function solution(priorities, location) {
  let arr = priorities.map((v, i) => [v, i]);
  let count = 0;

  while (true) {
    let firstIdx = arr.shift();
    if (arr.some((el) => el[0] > firstIdx[0])) {
      arr.push(firstIdx);
    } else {
      //첫 번째요소가 가장 큰 번호라면 그리고 location이 아니면 count올리고 빠진채로 나머지를 순번을 다시본다.
      count++;
      if (firstIdx[1] === location) return count;
    }
  }
}
