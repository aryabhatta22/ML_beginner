const output=[];
const predictionPoint = 300;
const k = 3;


function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  output.push([dropPosition,bounciness,size,bucketLabel]);
    
}

function runAnalysis() {
  
    const bucket = _.chain(output)
                    .map(row => [distance(row[0]), row[3] ])
                    .sortBy(row => row[0])
                    .slice(0,k)
                    .countBy(row=>row[1])
                    .toPairs()
                    .sortBy(row => row[1])
                    .last()
                    .first()
                    .parseInt()
                    .value();

    console.log('The ball is likely to fall in the bucket #'+bucket+' if dropped from '+predictionPoint+'px');
    
    
}

function distance(point) {
    return Math.abs(point - predictionPoint);
}
