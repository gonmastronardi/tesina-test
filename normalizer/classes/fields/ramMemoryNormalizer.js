import FieldNormalizer from "./FieldNormalizer.js";

export default class ramMemoryNormalizer extends FieldNormalizer {
    constructor(optionalField) {
        super();
        this.optionalField = optionalField;
    }

    normalize(anObject, attribute) {
        let ramMemory = anObject[attribute];
        if (ramMemory) {
            const match = ramMemory.match(/(\d+)\s*GB/);
            if (match) {
                anObject[this.optionalField] = parseInt(match[1], 10);
            }
        }
    }


};
