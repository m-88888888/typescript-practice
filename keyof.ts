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
