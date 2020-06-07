const code = "123.1vaHd3v.123";

const encrypt = (string) => {
  let textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  let byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  let applySaltToChar = (code) =>
    textToChars(string).reduce((a, b) => a ^ b, code);

  return (text) =>
    text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};

const decrypt = (salt) => {
  let textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  let saltChars = textToChars(salt);
  let applySaltToChar = (code) => saltChars.reduce((a, b) => a ^ b, code);
  return (encoded) =>
    encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
};

module.exports = { encrypt, decrypt, code };
