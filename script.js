const data = {
    Lyon: { 
        N: 68606000, P_femmes: 0.516, Pfville: 0.008, Pcelib: 0.399, Puniv: 0.75,
        Fwva: { A1: 0.10, A2: 0.10, A3: 0.08 },
        Fmva: { A1: 0.10, A2: 0.10, A3: 0.08 }
    },
    Marseille: { 
        N: 68606000, P_femmes: 0.516, Pfville: 0.012, Pcelib: 0.344, Puniv: 0.75,
        Fwva: { A1: 0.06, A2: 0.06, A3: 0.06 },
        Fmva: { A1: 0.06, A2: 0.06, A3: 0.06 }
    },
    Toulouse: { 
        N: 68606000, P_femmes: 0.516, Pfville: 0.008, Pcelib: 0.439, Puniv: 0.75,
        Fwva: { A1: 0.12, A2: 0.12, A3: 0.08 },
        Fmva: { A1: 0.12, A2: 0.12, A3: 0.08 }
    },
    Paris: { 
        N: 68606000, P_femmes: 0.516, Pfville: 0.030, Pcelib: 0.405, Puniv: 0.75,
        Fwva: { A1: 0.07, A2: 0.11, A3: 0.08 },
        Fmva: { A1: 0.07, A2: 0.11, A3: 0.08 }
    }
};

function calculate() {
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const beauty = parseInt(document.getElementById('beauty').value) / 10;
    const socialSkills = parseInt(document.getElementById('socialSkills').value) / 10;
    const attraction = parseFloat(document.getElementById('attraction').value);
    const includeUniversity = document.getElementById('university').checked;

    const cityData = data[city];
    const Fva = gender === "homme" ? cityData.Fwva[age] : cityData.Fmva[age];

    let G = cityData.N * cityData.P_femmes * cityData.Pfville * Fva * cityData.Pcelib;
    if (includeUniversity) {
        G *= cityData.Puniv;
    }
    G *= attraction * beauty * socialSkills;

    const lovePercentage = (G / cityData.N) * 100;  // Pourcentage de chances de trouver l'amour
    const avgPeopleMet = 80000;                     // Nombre moyen de personnes rencontrées dans une vie
    const chanceComparison = (G / avgPeopleMet) * 100;

    const lotoOdds = 1 / 13983816;                  // Probabilité de gagner au loto
    const isMoreProbableThanLoto = lovePercentage > (lotoOdds);

    const resultDiv = document.getElementById('result');
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        ❤️ <strong>Partenaires potentiels : <u>${Math.round(G)}</u></strong><br>
        📊 <strong>Pourcentage de chances de trouver l'amour : <u>${lovePercentage.toFixed(4)}%</u></strong><br><br>
        🌍 Cela représente environ ${chanceComparison.toFixed(2)}% des personnes que tu rencontreras dans ta vie.<br>
        <br>🎲 C'est <strong>${isMoreProbableThanLoto ? "plus" : "moins"} probable</strong> que de gagner au loto !<br>
    `;
}
