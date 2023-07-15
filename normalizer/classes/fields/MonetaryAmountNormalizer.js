import FieldNormalizer from "./FieldNormalizer.js";

export default class MonetaryAmountNormalizer extends FieldNormalizer {
  
  normalize(anObject, attribute) {
    let amount = anObject[attribute];
    this.debugField(`Price: ${amount}`);
    amount = this.getNormalizedAmount(amount);
    this.debugInfo(`Normalized price: ${amount}`);
    anObject[attribute] = amount;
  }

  getNormalizedAmount(anAmount) {
    if (!anAmount) {
      //it returns $ 0,00 if empty, undefined or null
      return "$ 0,00";
    }
    var amount = anAmount.replace(
      /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/\s]/gi,
      ""
    );
    amount = this.normalizeAmount(amount);
    return this.formatToArgentinianPeso(amount);
  }

  //It returns the given amount with 2 decimals for any currency
  normalizeAmount(anAmount) {
    let original = anAmount;
    let totalDecimals = countDecimals(original);
    let decimalPart = getDecimalValue(original, totalDecimals);
    let entirePart = getEntireValue(original, totalDecimals);

    if (original.includes(".") && original.includes(",")) {
      return normalizeAmountWithTwoSymbols(original);
    } else {
      if (original.includes(".") || original.includes(",")) {
        return normalizeAmountWithOneSymbol(original);
      } else {
        return original;
      }
    }

    function normalizeAmountWithTwoSymbols(aNumber) {
      entirePart = replaceSpecialChars(entirePart);
      if (decimalPart > 2) {
        decimalPart = decimalPart.slice(0, 2);
      }
      return entirePart + "." + decimalPart;
    }

    function normalizeAmountWithOneSymbol(aNumber) {
      let amount;
      if (totalDecimals > 2) {
        if (entirePart.length > 3) {
          if (entirePart.includes(".") || entirePart.includes(",")) {
            amount = replaceSpecialChars(entirePart) + decimalPart;
          } else {
            amount = entirePart + "." + decimalPart.slice(0, 2);
          }
        } else {
          amount = replaceSpecialChars(original);
        }
      } else {
        entirePart = replaceSpecialChars(entirePart);
        amount = entirePart + "." + decimalPart;
      }
      return amount;
    }

    function countDecimals(anAmount) {
      let decimals = 0;
      let totalChars = anAmount.length - 1;
      while (isCharNumber(anAmount.charAt(totalChars))) {
        decimals++;
        totalChars--;
      }
      return decimals;
    }

    function getDecimalValue(anAmount, decimals) {
      return anAmount.slice(anAmount.length - decimals, anAmount.length);
    }

    function getEntireValue(anAmount, decimals) {
      return anAmount.slice(0, anAmount.length - decimals - 1);
    }

    function replaceSpecialChars(anAmount) {
      while (anAmount.includes(".") || anAmount.includes(",")) {
        anAmount = anAmount.replace(",", "");
        anAmount = anAmount.replace(".", "");
      }
      return anAmount;
    }

    function isCharNumber(c) {
      return c >= "0" && c <= "9";
    }
  }

  formatToArgentinianPeso(anAmount) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(anAmount);
  }
};
