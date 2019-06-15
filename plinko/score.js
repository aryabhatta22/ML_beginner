const outputs=[];
const k = 3;


function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition,bounciness,size,bucketLabel]);
    
}


function runAnalysis() {
    
    const testSetSize = 10;
    const [testSet, trainingSet]=splitDataset(outputs, testSetSize);     //array return by splidataset will be retuned and stored in testset and trainingset
    
    let numberCorrect = 0;
    
    for(let i=0;i< testSet.length; i++) {
        const bucket = knn(trainingSet, testSet[i][0]);
        if(bucket === testSet[i][3]) {
            numberCorrect++;
        }
    }
    
    console.log('Accuracy: '+ ((numberCorrect/testSetSize)*100)+'%');
    
}

//knn algo

function knn(data, point) {

    return _.chain(data)
            .map(row => [distance(row[0],point), row[3] ])
            .sortBy(row => row[0])
            .slice(0,k)
            .countBy(row=>row[1])
            .toPairs()
            .sortBy(row => row[1])
            .last()
            .first()
            .parseInt()
            .value();

}


function distance(pointA, pointB) {
    return Math.abs(pointA - pointB);
}


//Creating training and test dataset

function splitDataset(data, testCount) {
    const shuffled =_.shuffle(data);        //shufflest the data we took sequentially
    
    const testSet = _.slice(shuffled, 0 , testCount);       //takes data from index 0 to testCount
    const trainingSet = _.slice(shuffled,testCount);        //takes data from index testCount to end of shuffle 
    
    return [testSet, trainingSet];
}