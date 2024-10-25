function maxProfit(timeUnit) {
  // Define the buildings
  const buildings = [
    { type: "T", buildTime: 5, landSize: 2, earnings: 1500 }, // Theatre
    { type: "P", buildTime: 4, landSize: 1, earnings: 1000 }, // Pub
    { type: "C", buildTime: 10, landSize: 3, earnings: 3000 }, // Commercial Park
  ];

  let maxEarnings = 0;
  let bestSolution = { T: 0, P: 0, C: 0 };

  function backtrack(remainingTime, currentSolution, currentEarnings) {
    if (remainingTime < 0) return;
    if (
      currentEarnings > maxEarnings ||
      (currentEarnings === maxEarnings &&
        currentSolution.T + currentSolution.P + currentSolution.C >
          bestSolution.T + bestSolution.P + bestSolution.C)
    ) {
      maxEarnings = currentEarnings;
      bestSolution = { ...currentSolution };
    }
    for (let building of buildings) {
      if (remainingTime >= building.buildTime) {
        currentSolution[building.type]++;
        backtrack(
          remainingTime - building.buildTime,
          currentSolution,
          currentEarnings +
            Math.floor((remainingTime - building.buildTime) / 1) *
              building.earnings
        );
        currentSolution[building.type]--; // Backtrack by decrementing the building count
      }
    }
  }
  backtrack(timeUnit,{ T: 0, P: 0, C: 0 }, 0);
  return {
    earnings: maxEarnings,
    solution: `T: ${bestSolution.T} P: ${bestSolution.P} C: ${bestSolution.C}`
  }
}

console.log(maxProfit(7));
console.log(maxProfit(8));
console.log(maxProfit(13));
