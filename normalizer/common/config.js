import normalizers from '../classes/Normalizers.js'

let unusefulWordsForName = [
    "Celular",
    "Liberado",
    "Libre",
    "Cuotas",
    "Sin",
    "Interes",
    "Original",
    "Nuevo",
    "Modelo",
    "\\*1\\*",
  ];

//configuration for each field of the JSON object to normalize
var configuration = {
    name: new normalizers.CleanNormalizer(unusefulWordsForName),
    price:  new normalizers.MonetaryAmountNormalizer(),
    operatingSystem: new normalizers.OSNormalizer(["ANDROID", "IOS"], 'operatingSystemName'),
    mainCamera: new normalizers.mainCameraNormalizer('maxMegapixels'),
    speedProcessor: new normalizers.speedProcessorNormalizer('speedProcessorMhz'),
};

export default configuration;