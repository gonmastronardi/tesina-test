const MonetaryAmountNormalizer = require("../classes/fields/MonetaryAmountNormalizer.js");

const monetaryAmountNormalizer = new MonetaryAmountNormalizer();
  // 15000,555
    // 15,000,555
    // 1,500,000
    // 1500,000
    // 150,555
    // 15,555
    // 1,000
    // 15.000.000

describe("getNormalizedAmount", () => {
  it("should normalize: $15000. Expected: $ 15.000,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15000");
    expect(result).toMatch(/15.000,00/);
  });
  it("should normalize: $1.533,333. Expected: $ 15.000,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1.533,333");
    expect(result).toMatch(/1.533,33/);
  });
  it("should normalize: $1,533,333. Expected: $ 1.533.333,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1,533,333");
    expect(result).toMatch(/1.533.333,00/);
  });
  "$\n\t\t\t\t28.499"
  it("should normalize: $1533,333. Expected: $ 1.533,33", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$\n\t\t\t\t28.499");
    expect(result).toMatch(/28.499,00/);
  });
  it("should normalize: $1533,333. Expected: $ 1.533,33", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1533,333");
    expect(result).toMatch(/1.533,33/);
  });
  it("should normalize: $1533,33. Expected: $ 1.533,33", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1533,33");
    expect(result).toMatch(/1.533,33/);
  });
  it("should normalize: $1.533,3. Expected: $ 1.533,30", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1.533,3");
    expect(result).toMatch(/1.533,30/);
  });
  it("should normalize: $1.533,3. Expected: $ 1.533,30", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1.533.30");
    expect(result).toMatch(/1.533,30/);
  });
  it("should normalize: $15000. Expected: $ 15.000,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1.533");
    expect(result).toMatch(/1.533,00/);
  });
  it("should normalize: $1.53. Expected: $ 1,53", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1.53");
    expect(result).toMatch(/1,53/);
  });  
  it("should normalize: $1.53. Expected: $ 1,53", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1,353,282.5");
    expect(result).toMatch(/1.353.282,50/);
  });
  it("should normalize: $1.53. Expected: $ 1,53", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1,353,282,500");
    expect(result).toMatch(/1.353.282.500,00/);
  });
  it("should normalize: $15,000. Expected: $ 15.000,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15,000");
    expect(result).toMatch(/15.000,00/);
  });
  it("should normalize: $15.000. Expected: $ 15.000,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15.000");
    expect(result).toMatch(/15.000,00/);
  });
  it("should normalize: $15000,555. Expected: $ 15.000,55", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15000,555");
    expect(result).toMatch(/15.000,55/);
  });
  it("should normalize: $15,000,555. Expected: $ 15.000.555,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15,000,555");
    expect(result).toMatch(/15.000.555,00/);
  });
  it("should normalize: $15.000,555. Expected: $ 15.000,55", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15.000,555");
    expect(result).toMatch(/15.000,55/);
  });
  it("should normalize: $15.000,555. Expected: $ 15.000,55", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15.000.000");
    expect(result).toMatch(/15.000.000,00/);
  });
  it("should normalize: $15,000.555. Expected: $ 15.000,55", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$15,000.555");
    expect(result).toMatch(/15.000,55/);
  });
  it("should normalize: $150,000. Expected: $ 150.000,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$150,000");
    expect(result).toMatch(/150.000,00/);
  });
  it("should normalize: $150.000. Expected: $ 150.000,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$150.000");
    expect(result).toMatch(/150.000,00/);
  });
  it("should normalize: $150.000,99. Expected: $ 150.000,99", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$150.000,99");
    expect(result).toMatch(/150.000,99/);
  });
  it("should normalize: $1555. Expected: $ 1.555,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1555");
    expect(result).toMatch(/1.555,00/);
  });
  it("should normalize: $100. Expected: $ 100,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$100");
    expect(result).toMatch(/100,00/);
  });
  it("should normalize: $1. Expected: $ 1,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$1");
    expect(result).toMatch(/1,00/);
  });
  it("should normalize: $100.50. Expected: $ 100,50", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount("$100.50");
    expect(result).toMatch(/100,50/);
  });
  //whitespace
  it("should normalize: ' '. Expected: $ 0,00 ", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount(" ");
    expect(result).toMatch(/0,00/);
  });
  it("should normalize: null. Expected: $ 0,00", () => {
    let result = monetaryAmountNormalizer.getNormalizedAmount(null);
    expect(result).toMatch(/0,00/);
  });
  it("should normalize: undefined. Expected: $ 0,00", () => {
    result = monetaryAmountNormalizer.getNormalizedAmount(undefined);
    expect(result).toMatch(/0,00/);
  });
});
