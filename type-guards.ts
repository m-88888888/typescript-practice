// 型がわからない値をうまく扱うために「型ガード」で安全を保証する。

// 1.プリミティブ型の場合：typeofを使う
const hoge: unknown = "hoge";

if (typeof hoge === "string") {
  console.log(hoge.split("o"));
}
// コンパイルエラー
// console.log(hoge.split("o"));

// 2.クラスインスタンスの場合：instanceofを使う
class HogeFuga {
  hogefuga = "hogefuga";
}

class Hoge extends HogeFuga {
  hoge = () => {
    console.log("hoge");
  };
}
class Fuga extends HogeFuga {
  fuga = () => {
    console.log("fuga");
  };
}

const doHoge = (arg: Hoge | Fuga) => {
  if (arg instanceof Hoge) {
    arg.hoge();
    // arg.fuga();
  } else {
    arg.fuga();
    // arg.hoge();
  }
  console.log(arg.hogefuga);
};

doHoge(new Hoge());
doHoge(new Fuga());

// 3.ただのオブジェクトの場合：ユーザー定義の型ガードを作る
type Phone = {
  kind: string;
  model: number;
};
// arg is Phoneという記述によって、この関数がtrueを返す場合にargの型がPhoneであることがコンパイラに通知できる。
const isPhone = (arg: unknown): arg is Phone => {
  const phone = arg as Phone;

  return typeof phone?.kind === "string" && typeof phone?.model === "number";
};

const p1: unknown = JSON.parse("{}");
const p2: unknown = JSON.parse('{ "kind": "iPhone", "model": 2020 }');
const p3: unknown = JSON.parse('{ "kind": "Xperia", "model": "2019" }');

[p1, p2, p3].forEach((p) => {
  if (isPhone(p)) {
    console.log("correct");
  } else {
    console.log("not correct");
  }
});
