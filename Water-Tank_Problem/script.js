
function calculateWater(){
    const heights = document.getElementById("block-heights").value
    .split(',')
    .map(num => parseInt(num, 10))
    const waterUnits = calculateWaterUnits(heights);
    
    document.getElementById("result").innerText =`Total Water Stored: ${waterUnits} units`;
    renderBlocks(heights);
}

function calculateWaterUnits(heights) {
    const n = heights.length;

    let water = 0;
    
    const leftMax = Array(n).fill(0);
    
    const rightMax = Array(n).fill(0);
    

    leftMax[0] = heights[0];
    
    for(let i=1;i<n;i++){
        leftMax[i] = Math.max(leftMax[i-1], heights[i])
    }
    rightMax[n-1] = heights[n-1];
    
    for(let i = n-2; i>=0; i--){
        rightMax[i] = Math.max(rightMax[i+1], heights[i])
    }
    for(let i = 0;i<n;i++){
        water += Math.min(leftMax[i], rightMax[i]) - heights[i]
    }
    return water;
    
}


function renderBlocks(heights) {
    const svg = document.getElementById("water-visualization");
    svg.innerHTML = '';

    const maxBlockHeight = Math.max(...heights);
    const blockWidth = 40;
    const blockGap = 5;

    const leftMax = [];
    const rightMax = [];
    const n = heights.length;
    leftMax[0] = heights[0];
    for(let i=1;i<n;i++){
        leftMax[i] = Math.max(leftMax[i-1], heights[i])
    }
    rightMax[n-1] = heights[n-1];
    for(let i = n-2; i>=0; i--){
        rightMax[i] = Math.max(rightMax[i+1], heights[i])
    }
    heights.forEach((height, index)=>{
        const x = index *(blockWidth + blockGap);
        const blockHeight = (height / maxBlockHeight) *200;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("x", x);
        rect.setAttribute("y", 200 - blockHeight);
        rect.setAttribute("width", blockWidth);
        rect.setAttribute("height", blockHeight);
        rect.setAttribute("fill", "#3f51b5");
        svg.appendChild(rect);

        const waterHeight = ((Math.min(leftMax[index], rightMax[index]) - height)/ maxBlockHeight)*200;
        if(waterHeight>0){
            const waterRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
            waterRect.setAttribute("x", x);
            waterRect.setAttribute("y", 200 - blockHeight - waterHeight);
            waterRect.setAttribute("width", blockWidth);
            waterRect.setAttribute("height", waterHeight);
            waterRect.setAttribute("fill", "#f44336");
            svg.appendChild(waterRect);
        }
    })
}
