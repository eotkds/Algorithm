/*
모의고사
문제 설명
수포자는 수학을 포기한 사람의 준말입니다. 수포자 삼인방은 모의고사에 수학 문제를 전부 찍으려 합니다. 
수포자는 1번 문제부터 마지막 문제까지 다음과 같이 찍습니다.

1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...

1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 가장 많은 문제를 맞힌
 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

제한 조건
시험은 최대 10,000 문제로 구성되어있습니다.
문제의 정답은 1, 2, 3, 4, 5중 하나입니다.
가장 높은 점수를 받은 사람이 여럿일 경우, 
return하는 값을 오름차순 정렬해주세요.
입출력 예
answers	return
[1,2,3,4,5]	[1]
[1,3,2,4,2]	[1,2,3]
입출력 예 설명
입출력 예 #1

수포자 1은 모든 문제를 맞혔습니다.
수포자 2는 모든 문제를 틀렸습니다.
수포자 3은 모든 문제를 틀렸습니다.
따라서 가장 문제를 많이 맞힌 사람은 수포자 1입니다.

입출력 예 #2

모든 사람이 2문제씩을 맞췄습니다.
*/
/*
1번, 2번, 3번 수포자 배열을 만들 수있다

1번 = [1,2,3,4,5]
2번 = [2,1,2,3,2,4,2,5]
3번 = [3,3,1,1,2,2,4,4,5,5]
길이만 다를 뿐 계속 반복 할 뿐이다. 
길이를 반복 할 수 있는 방법을 찾아보자
1~5 반복
n = 6 ->  나머지를 이용하면 될거 같다

reduce를 통해 answer와 맞는 값에 1을 합산 할 생각이다. 

*/

let answers = [1, 2, 3, 4, 5];

function solution(answers) {
  let num1 = [1, 2, 3, 4, 5];
  let num2 = [2, 1, 2, 3, 2, 4, 2, 5];
  let num3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let answer = [0, 0, 0];
  answers.map((x, i) => {
    let index1 = i % num1.length;
    let index2 = i % num2.length;
    let index3 = i % num3.length;
    if (x === num1[index1]) {
      answer[0] += 1;
    }
    if (x === num2[index2]) {
      answer[1] += 1;
    }
    if (x === num3[index3]) {
      answer[2] += 1;
    }
  });

  let Max = Math.max(...answer);
  return answer.map((x, i) => x / Max + i).filter((x, i) => x === i + 1);
}

// 220603  다시 풀어보기
// 문제이해가 틀렸다. 0을 받은사람을 제거하는것이 아니라 최대점수를 받은 사람을 불러 오는 것이고
// 최대 점수가 같을 경우 순번 대로 불러오는 것이었다.
function solution(answers) {
  let num1 = [1, 2, 3, 4, 5];
  let num2 = [2, 1, 2, 3, 2, 4, 2, 5];
  let num3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let score = [
    [1, 0],
    [2, 0],
    [3, 0],
  ];
  // 한명씩 대조할 것인지, answers를 쭉 따라갈것인지.. count는?
  answers.forEach((x, i) => {
    if (x === num1[i % num1.length]) score[0][1]++;
    if (x === num2[i % num2.length]) score[1][1]++;
    if (x === num3[i % num3.length]) score[2][1]++;
  });
  //이제 0점일 경우 반영 x, 그 다음 등수를 나오는 배열 만들기
  let max = Math.max(score[0][1], score[1][1], score[2][1]);
  let answer = [];
  score.map((x) => {
    if (x[1] === max) return answer.push(x[0]);
  });

  return answer;
}
