// Functions
const getRidOfUmlaute = ekwName => {
    ekwName = ekwName.replace(/ä/g, "ae");
    ekwName = ekwName.replace(/ö/g, "oe");
    ekwName = ekwName.replace(/ü/g, "ue");
    ekwName = ekwName.replace(/ß/g, "ss");
    ekwName = ekwName.replace(/ /g, "-");
    ekwName = ekwName.replace(/\./g, "");
    ekwName = ekwName.replace(/,/g, "");
    ekwName = ekwName.replace(/\(/g, "");
    ekwName = ekwName.replace(/\)/g, "");
    return ekwName;
};

module.exports = {
    handleEkwName: function(ekwName) {
        ekwName = getRidOfUmlaute(ekwName);
        return ekwName;
    }
};
