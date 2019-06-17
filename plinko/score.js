const outputs = [];
//const k = 3;


function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    outputs.push([dropPosition, bounciness, size, bucketLabel]);

}


function runAnalysis() {

    const testSetSize = 50;
    const k = 10;
    //array return by splidataset will be retuned and stored in testset and trainingset

    //    let numberCorrect = 0;
    //
    //    for (let i = 0; i < testSet.length; i++) {
    //        const bucket = knn(trainingSet, testSet[i][0]);
    //        if (bucket === testSet[i][3]) {
    //            numberCorrect++;
    //        }
    //    }
    //
    //    console.log('Accuracy: ' + ((numberCorrect / testSetSize) * 100) + '%');

    _.range(0, 3).forEach(feature => { //  _.range(0,3) = [0,1,2]

        const data = _.map(outputs, row => [row[feature], _.last(row)]); //ouputs =[ featureValue, bucket#]

        const [testSet, trainingSet] = splitDataset(minMax(data, 1), testSetSize);
        const accuracy = _.chain(testSet)
            .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === _.last(testPoint))
            .size()
            .divide(testSetSize)
            .value()

        console.log('For feature: ' + feature + ' Accuracy: ' + accuracy);

    });
}

//knn algo

function knn(data, point, k) {

    //point does not contain last value 

    return _.chain(data)
        .map(row => {
            return [
                        distance(_.initial(row), point),
                        _.last(row)
                    ]
        })
        .sortBy(row => row[0])
        .slice(0, k)
        .countBy(row => row[1])
        .toPairs()
        .sortBy(row => row[1])
        .last()
        .first()
        .parseInt()
        .value();

}


function distance(pointA, pointB) {

    //consider pointA = [1,2]
    //         pointB = [3,4]

    return _.chain(pointA)
        .zip(pointB) //[[1,2],[3,4]]
        .map(([a, b]) => (a - b) ** 2) // [(1-3)**2, (2-4)**2]
        .sum() // 4+4
        .value() ** 0.5;
}


//Creating training and test dataset

function splitDataset(data, testCount) {
    const shuffled = _.shuffle(data); //shufflest the data we took sequentially

    const testSet = _.slice(shuffled, 0, testCount); //takes data from index 0 to testCount
    const trainingSet = _.slice(shuffled, testCount); //takes data from index testCount to end of shuffle 

    return [testSet, trainingSet];
}


function minMax(data, featureCount) {
    const clonedData = _.cloneDeep(data);

    for (let i = 0; i < featureCount; i++) { //loop iterating to each column
        const column = clonedData.map(row => row[i]);

        const min = _.min(column);
        const max = _.max(column);

        for (let j = 0; j < clonedData; j++) { //loop iterating to each row
            clonedData[j][i] = (clonedData[j][i] - min) / (max - min);
        }
    }

    return clonedData;

}
