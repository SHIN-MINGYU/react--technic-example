String.prototype.lineBreak = function () {
  const brokenMessage: Array<string> = [];
  const tabCount: Array<number> = [];
  let index = 0;

  this.split("").forEach((char: string) => {
    if (brokenMessage[index] == undefined && tabCount[index] == undefined) {
      // indexが変わる旅に配列のインデックス番目の値を初期化する
      brokenMessage.push("");
      if (index === 0) tabCount.push(0);
      else tabCount.push(tabCount[index - 1]);
    }
    //　改行文字が出で来るまではcharacterをインデクス番目に入れる
    brokenMessage[index] += char;
    if (["{", "}", ",", ";"].includes(char)) {
      // 改行条件
      if (char === "{") {
        // タブが重なる場合
        if (index === 0) {
          tabCount[index] += 1;
        } else {
          tabCount[index] = tabCount[index - 1] + 1;
        }
      } else if (char === "}") {
        // タブを消す場合
        if (index === 0) tabCount[index] -= 1;
        else tabCount[index] = tabCount[index - 1] - 1;
      }
      //　改行条件によってインデックスによう改行を行う
      index++;
    }
  });

  return { brokenMessage, tabCount };
};

export default {};
