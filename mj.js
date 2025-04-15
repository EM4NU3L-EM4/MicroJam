function formatDate(date) {
    return date.toLocaleDateString('En', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

function createJamInfo(jamNumber, startDate) {
    const endDate = new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 dias
    const votingEnd = new Date(endDate.getTime() + 2 * 24 * 60 * 60 * 1000); // +2 dias para votação

    const link = `https://itch.io/jam/micro-jam-0${jamNumber}`;
    return {
        jamNumber,
        link,
        startDate,
        endDate,
        votingEnd
    };
}

function getJamData() {
    const baseDate = new Date('2025-03-22T00:00:00'); // Micro Jam 36
    const now = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysSinceStart = Math.floor((now - baseDate) / msPerDay);
    const jamIndex = Math.floor(daysSinceStart / 14);

    const currentJamStart = new Date(baseDate.getTime() + jamIndex * 14 * msPerDay);
    const previousJamStart = new Date(currentJamStart.getTime() - 14 * msPerDay);
    const nextJamStart = new Date(currentJamStart.getTime() + 14 * msPerDay);

    return {
        previous: createJamInfo(36 + jamIndex - 1, previousJamStart),
        current: createJamInfo(36 + jamIndex, currentJamStart),
        next: createJamInfo(36 + jamIndex + 1, nextJamStart)
    };
}

function renderJamInfo() {
    const { current, previous, next } = getJamData();
    const now = new Date();

    function jamHTML(jam, label) {
        let status = "";
        if (now >= jam.startDate && now < jam.endDate) {
            status = "Running";
        } else if (now >= jam.endDate && now < jam.votingEnd) {
            status = "Voting time";
        } else if (now < jam.startDate) {
            status = "Soon";
        } else {
            status = "Finished";
        }

        return `
  <a class="jam-link" href="${jam.link}" target="_blank"><div><strong>${label}</strong></div>
  <div>Micro Jam ${jam.jamNumber}</div>
  <div>${formatDate(jam.startDate)} > ${formatDate(jam.endDate)} <br></div>
  <div class="status">${status}</div></a>
`;
    }

    document.getElementById('jamCurrent').innerHTML = jamHTML(current, "NOW:");
    document.getElementById('jamPrevious').innerHTML = jamHTML(previous, "PREVIOUS:");
    document.getElementById('jamNext').innerHTML = jamHTML(next, "NEXT:");
}

renderJamInfo();