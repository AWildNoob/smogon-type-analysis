//Assumes that the pokemon-showdown server is installed at this folder
const {Dex} = require("./pokemon-showdown");

function viabilityCounter(speciesList, additionalFilterFUnction) {
    let counter = new Object();
    for (let t of Dex.types.all()) {
        counter[t.name] = {uber: 0, ou: 0, uu: 0, ru: 0, nu: 0, pu: 0};
    }
    counter["All"] = {uber: 0, ou: 0, uu: 0, ru: 0, nu: 0, pu: 0};
    
    let ignoreList = ["Pikachu-Original", "Pikachu-Hoenn", "Pikachu-Sinnoh", "Pikachu-Unova", "Pikachu-Kalos",
                        "Pikachu-Alola", "Pikachu-Partner", "Pikachu-World", "Cherrim-Sunshine", "Basculin-Blue-Striped",
                        "Keldeo-Resolute", "Genesect-Douse", "Genesect-Shock", "Genesect-Burn", "Genesect-Chill", 
                        "Aegislash-Blade", "Wishiwashi-School", "Mimikyu-Busted", "Magearna-Original", 
                        "Cramorant-Gulping", "Cramorant-Gorging", "Toxtricity-Low-Key", "Polteageist-Antique", 
                        "Eiscue-Noice", "Morpeko-Hangry", "Zarude-Dada", "Meltan"]
    //Edge cases: Basculin-Blue-Striped, Gourgeist forms, Indeedee?
    
    let c = 0;
    for (let s of speciesList) {
        if (s.exists && !s.isNonstandard && s.evos.length == 0 && s.tier != "Illegal" && ignoreList.indexOf(s.name) == -1 && additionalFilterFUnction(s)) {
            c += 1;
            for (let t of s.types) {
                if (s.tier == "AG" || s.tier == "Uber") {
                    counter[t].uber += 1;
                }
                else if (s.tier == "OU" || s.tier == "UUBL") {
                    counter[t].ou += 1;
                }
                else if (s.tier == "UU" || s.tier == "RUBL") {
                    counter[t].uu += 1;
                }
                else if (s.tier == "RU" || s.tier == "NUBL") {
                    counter[t].ru += 1;
                }
                else if (s.tier == "NU" || s.tier == "PUBL") {
                    counter[t].nu += 1;
                }
                else {
                    counter[t].pu += 1;
                }
            }
            if (s.tier == "AG" || s.tier == "Uber") {
                counter["All"].uber += 1;
            }
            else if (s.tier == "OU" || s.tier == "UUBL") {
                counter["All"].ou += 1;
            }
            else if (s.tier == "UU" || s.tier == "RUBL") {
                counter["All"].uu += 1;
            }
            else if (s.tier == "RU" || s.tier == "NUBL") {
                counter["All"].ru += 1;
            }
            else if (s.tier == "NU" || s.tier == "PUBL") {
                counter["All"].nu += 1;
            }
            else {
                counter["All"].pu += 1;
            }
        }
    }
    console.log(c + " species evaluated");
    
    let percentages = new Object();
    for (let t of Dex.types.all()) {
        let total = counter[t.name].uber + counter[t.name].ou + counter[t.name].uu + counter[t.name].ru + counter[t.name].nu + counter[t.name].pu;
        percentages[t.name] = {uber: counter[t.name].uber / total, 
                                ou: counter[t.name].ou / total, 
                                uu: counter[t.name].uu / total, 
                                ru: counter[t.name].ru / total, 
                                nu: counter[t.name].nu / total, 
                                pu: counter[t.name].pu / total};
    }
    let total = counter["All"].uber + counter["All"].ou + counter["All"].uu + counter["All"].ru + counter["All"].nu + counter["All"].pu;
    percentages["All"] = {uber: counter["All"].uber / total, 
                            ou: counter["All"].ou / total, 
                            uu: counter["All"].uu / total, 
                            ru: counter["All"].ru / total, 
                            nu: counter["All"].nu / total, 
                            pu: counter["All"].pu / total};
    
    return [counter, percentages];
}

let species = Dex.species.all();
let [counter1, percentages1] = viabilityCounter(species, s => true);
let [counter2, percentages2] = viabilityCounter(species, s => s.tags.indexOf("Restricted Legendary") == -1);
let [counter3, percentages3] = viabilityCounter(species, s => s.tags.length == 0);