function calculateWater(){
    const heights = document.getElementById("block-heights").value
    .split(',')
    .map(num => parseInt(num, 10))
    console.log(heights)
    const waterUnits = calculateWaterUnits(heights);
    console.log(waterUnits);
    document.getElementById("result").innerText =`Total Water Stored: ${waterUnits} units`;
    renderBlocks(heights);
}

