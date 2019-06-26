// require('@tensorflow/tfjs-node');
const tf=require('@tensorflow/tfjs');
const loadCSV = require('./load-csv');

function knn(features, labels, predictionPoint, k) {
    const test= features
    .sub(predictionPoint)
                .pow(2)
            .sum(1)
            .pow(0.5)
            .expandDims(1)
            .concat(labels, 1)
            .unstack()
            .sort((a,b)=> a[0] > b[0]? 1: -1)
            .slice(0,k)
            .reduce((acc, pair) => acc+ pair[1], 0)/k;


    console.log(test);
}



let {features , labels, testFeatures, testLabels}=loadCSV('kc_house_data.csv', {
    shuffle: true,      //suffles the data of CSV file so that we dont rely on specific set of data everytim
    splitTest: 10,      //split the dataset into 10 for training set and rest for test set
    dataColumns:['lat', 'long'],    //To just consider latitude and longitude column from whole CSV datatset
    labelColumns: ['price']
});

features=tf.tensor(features);
labels= tf.tensor(labels);

 knn (features, labels, tf.tensor(testFeatures[0]), 10);
// console.log('Guess ', result,'testLabels', testLabels[0][0])

