const phones = {
  apple: "iPhone",
  google: "Pixel",
  huawei: "P30",
};

// オブジェクトphoneからキーの型を抽出
type PhoneType = keyof typeof phones; // apple | google | huawei
// キーの型のみ代入可能
const phone: PhoneType = "apple";
console.log(phone);
// コンパイルエラー
// const phone2: PhoneType = "hoge";

// as const はConstアサーションと呼ばれるもの。
// プロパティをread-onlyにしてくれる。だから25行目の処理で文字列リテラル型が取得できる。
// as constを外すとstringになってしまう。
const phones2 = {
  apple: "iPhone" as const,
  google: "Pixel" as const,
  huawei: "P30" as const,
};

type PhoneType2 = keyof typeof phones2; // apple | google | huawei
// []を使ってキーを渡して該当するプロパティの値を取得
type PhoneVal = typeof phones2[PhoneType2]; // "iPhone" | "Pixel" | "P30"

// ユーティリティ型っぽく書く
type ValueOf<T> = T[keyof T];
type PhoneType = ValueOf<typeof phones2>;
