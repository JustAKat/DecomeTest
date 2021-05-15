let listArray = [];
//getting buttons for next steps and back to steps
const nextButtonOne = document.querySelector('#stepOneBtn');
const nextButtonTwo = document.querySelector('#stepTwoNextBtn');
const backButtonOne = document.querySelector('#stepTwoBackBtn');
const nextButtonThree = document.querySelector('#stepThreeNextBtn');
const backButtonTwo = document.querySelector('#stepThreeBackBtn');
const completedButton = document.querySelector('#completedBtn');
const backButtonThree = document.querySelector('#stepFourBackBtn');

//getting steps
const stepOnePage = document.querySelector('.stepOne');
const stepTwoPage = document.querySelector('.stepTwo');
const stepThreePage = document.querySelector('.stepThree');
const stepFourPage = document.querySelector('.stepFour');

//getting steps view at top of screen
const stepOne = document.querySelector('#step1');
const stepTwo = document.querySelector('#step2');
const stepThree = document.querySelector('#step3');
const stepFour = document.querySelector('#step4');

//getting dropping zone for image
const dropZone = document.querySelector('.putImageHere');
const imageButton = document.querySelector('.fileChoose');
const inputFromFile = document.querySelector('.fileInput');
var imageFile;

//after getting all colours get moveable box
const moveableBox = document.querySelector('.moveableBox');
const bigMoveBox = document.querySelector('.hugeBox');
let colourList = document.querySelector('.listPosition');

let stopInputImage = false;
let btn1Active=false,btn2Active=false,btn3Active=false,btn4Active=false;
inputImage();
//if user drags image over the box provided)

nextButtonOne.addEventListener('click', () => {
    stepOnePage.classList.add('hidden');//"stepOne hidden"
    stepTwoPage.classList.remove('hidden');//"stepTwo"
    stepOne.classList.remove('active');//"stepBox"
    stepTwo.classList.add('active');//"stepBox active"
    stopInputImage = true;
    btn1Active = true;
});

nextButtonTwo.addEventListener('click', () => {
    stepTwoPage.classList.add('hidden'); //"stepTwo hidden"
    stepThreePage.classList.remove('hidden');//"stepThree"
    stepTwo.classList.remove('active');//"stepBox"
    stepThree.classList.add('active');//"stepBox active"
    moveableBox.classList.remove('hidden');//shows moveable box to move colour around
    bigMoveBox.classList.remove('hidden');
    colourList.classList.remove('hidden');
    stopInputImage = true;
    btn2Active = true;
    createImageCanvas();
});

backButtonOne.addEventListener('click', () =>{
    stepOnePage.classList.remove('hidden');//"stepOne"
    stepTwoPage.classList.add('hidden');//"stepTwo hidden"
    stepTwo.classList.remove('active');//"stepBox"
    stepOne.classList.add('active');//"stepBox active"
    stopInputImage = false;
});

nextButtonThree.addEventListener('click', () => {
    stepThreePage.classList.add('hidden');//"stepThree hidden"
    stepFourPage.classList.remove('hidden');//"stepFour"
    stepThree.classList.remove('active');//"stepBox"
    stepFour.classList.add('active');//"stepBox active"
    bigMoveBox.classList.add('hidden');
    colourList.classList.add('hidden');
    updateScreenThreeBoxes(listArray);
    stopInputImage = true;
    btn3Active = true;
});

backButtonTwo.addEventListener('click', () =>{
    stepOnePage.classList.add('hidden');//"stepOne hidden"
    stepTwoPage.classList.remove('hidden');//"stepTwo"
    stepThreePage.classList.add('hidden');//"stepThree hidden"
    stepThree.classList.remove('active');//"stepBox"
    stepTwo.classList.add('active');//"stepBox active"
    bigMoveBox.classList.add('hidden');
    colourList.classList.add('hidden');
    stopInputImage = true;
    removeColourBoxes();
    
});

completedButton.addEventListener('click', ()=>{
    stepOnePage.classList.remove('hidden');//"stepOne"
    stepFourPage.classList.add("hidden");//"stepFour hidden"
    stepFour.classList.remove('active');//"stepBox"
    stepOne.classList.add('active');//"stepBox active"
    bigMoveBox.classList.add('hidden');
    colourList.classList.add('hidden');
    stopInputImage = false;
    btn3Active = false;
    btn2Active = false;
    btn1Active = false;
});

backButtonThree.addEventListener('click', () =>{
    stepOnePage.classList.add('hidden'); //"stepOne hidden"
    stepTwoPage.classList.add('hidden'); //"stepTwo hidden"
    stepThreePage.classList.remove('hidden');//"stepThree"
    stepFourPage.classList.add('hidden');//"stepFoir hidden"
    stepFour.classList.remove('active');//"stepBox"
    stepThree.classList.add('active');//"stepBox active"
    bigMoveBox.classList.remove('hidden');
    colourList.classList.remove('hidden');
    stopInputImage = true;
    removeItemBoxes();
});

function inputImage(){
  imageButton.addEventListener('click', ()=>{
    inputFromFile.click();
  });

  inputFromFile.addEventListener('change', ()=>{
    if(stopInputImage !== true)
    {
    if(inputFromFile.files.length){
        updateImageBox(dropZone, inputFromFile.files[0]);
    }
    stopInputImage = true;
    }
  });


  dropZone.addEventListener('dragover', (e) =>{
    e.preventDefault();
    dropZone.classList.add('active');
  });

  ['dragleave', 'dragend'].forEach(dragType =>{
    dropZone.addEventListener(dragType, (e)=>{
        dropZone.classList.remove('active');
    });
  });

  dropZone.addEventListener('drop', event=>{
    event.preventDefault();
    if(stopInputImage !== true)
    {
    if(event.dataTransfer.files.length){
        dropZone.files = event.dataTransfer.files;
        imageFile = event.dataTransfer.files[0];
        updateImageBox(dropZone, imageFile);
        stopInputImage = true;
    }
  }
    dropZone.classList.remove('active');
    // createImageCanvas();
  });
  

}

var loadImage = dropZone.querySelector('.loadImage');

function updateImageBox(dropZone, imageFile){
  // let loadImage = dropZone.querySelector('.loadImage');

  if(dropZone.querySelector('.dropPromt')){
      dropZone.querySelector('.dropPromt').remove();
  }

  if(dropZone.querySelector('.imageIcon')){
      dropZone.querySelector('.imageIcon').remove();
  }

  if(dropZone.querySelector('.fileChoose')){
      dropZone.querySelector('.fileChoose').remove();
  }

  if(!loadImage){
      loadImage = document.createElement('div');
      loadImage.classList.add('loadImage');
      dropZone.appendChild(loadImage);
      // console.log(loadImage);
  }

  loadImage.dataset.label = imageFile.name;
  if(imageFile.type.startsWith("image/")){
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () =>{
          let imageURL = reader.result;
          let imgTag = `<img src="${imageURL}" id="workingImage" class="brightness saturation">`;
          loadImage.innerHTML = imgTag;
          // document.querySelector('.imageHere').style.backgroundColor = 'white';  class="brightness saturation"
          changeBrightnessandSaturation();  
      };
  }else{
      loadImage.style.backgroundImage = null;
  }
}

var canvas = document.getElementById('canvas');

//brightness and saturation fixing

function changeBrightnessandSaturation(){
  if(!btn2Active)
  {
    if(document.getElementById('workingImage')){
      let brightnessInput = document.getElementById('sliderOne');
      let saturationInput = document.getElementById('sliderTwo');
      let brightnessValue,saturationValue;
      let imageChangeB = document.querySelector('.brightness');
      let imageChangeS = document.querySelector('.saturation');
      brightnessInput.oninput = (() =>{
          brightnessValue = brightnessInput.value;
          imageChangeB.style.filter = `brightness(${brightnessValue}%)`;
      });

      saturationInput.oninput = (() =>{
          saturationValue = saturationInput.value;
          imageChangeS.style.filter = `saturate(${saturationValue}%)`;
      });
  }
  }
  
}

function createImageCanvas(){
  if(canvas){
      const ctx = canvas.getContext('2d');
      var image = document.getElementById('workingImage');
      ctx.drawImage(image, 0, 0,100,50);
      createArray(ctx);
  }
}

var imageColourData = [];
// let result;
const MAX_ITERATIONS = 100;
function createArray(ctx){
    var k = 0;
    var imageData = new Array(100*50);
    for(var i=0;i<100;i++)
    {
        for(var j=0;j<50;j++)
        {
            imageData.splice(k, 0,ctx.getImageData(i,j,100,50));
            k++;
        }
    }
    
    for(var i=0;i<(100*50);i++)
    {
        imageColourData[i] = [];
        for(var j=0;j<3;j++)
        {
            imageColourData[i][j] = null;
            
        }
        // console.log(i);
    }
    for(var i=0;i<(100*50);i++)
    {
        for(var j=0;j<3;j++)
        {
            imageColourData[i][j] = imageData[i].data[j];
        }
        // console.log(i);
    }

    // console.log(imageColourData);

    kmeans(imageColourData, 6);
}




// let result = kmeans(imageColourData, 4);
// console.log("start");
// console.log(result);

function randomBetween(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  );
}

function calcMeanCentroid(dataSet, start, end) {
  const features = dataSet[0].length;
  const n = end - start;
  let mean = [];
  for (let i = 0; i < features; i++) {
    mean.push(0);
  }
  for (let i = start; i < end; i++) {
    for (let j = 0; j < features; j++) {
      mean[j] = mean[j] + dataSet[i][j] / n;
    }
  }
  return mean;
}

function getRandomCentroidsNaiveSharding(dataset, k) {
  // implementation of a variation of naive sharding centroid initialization method
  // (not using sums or sorting, just dividing into k shards and calc mean)
  // https://www.kdnuggets.com/2017/03/naive-sharding-centroid-initialization-method.html
  const numSamples = dataset.length;
  // Divide dataset into k shards:
  const step = Math.floor(numSamples / k);
  const centroids = [];
  for (let i = 0; i < k; i++) {
    const start = step * i;
    let end = step * (i + 1);
    if (i + 1 === k) {
      end = numSamples;
    }
    centroids.push(calcMeanCentroid(dataset, start, end));
  }
  return centroids;
}

function getRandomCentroids(dataset, k) {
  // selects random points as centroids from the dataset
  const numSamples = dataset.length;
  const centroidsIndex = [];
  let index;
  while (centroidsIndex.length < k) {
    index = randomBetween(0, numSamples);
    if (centroidsIndex.indexOf(index) === -1) {
      centroidsIndex.push(index);
    }
  }
  const centroids = [];
  for (let i = 0; i < centroidsIndex.length; i++) {
    const centroid = [...dataset[centroidsIndex[i]]];
    centroids.push(centroid);
  }
  return centroids;
}

function compareCentroids(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function shouldStop(oldCentroids, centroids, iterations) {
  if (iterations > MAX_ITERATIONS) {
    return true;
  }
  if (!oldCentroids || !oldCentroids.length) {
    return false;
  }
  let sameCount = true;
  for (let i = 0; i < centroids.length; i++) {
    if (!compareCentroids(centroids[i], oldCentroids[i])) {
      sameCount = false;
    }
  }
  return sameCount;
}

// Calculate Squared Euclidean Distance
function getDistanceSQ(a, b) {
  const diffs = [];
  for (let i = 0; i < a.length; i++) {
    diffs.push(a[i] - b[i]);
  }
  return diffs.reduce((r, e) => (r + (e * e)), 0);
}

// Returns a label for each piece of data in the dataset. 
function getLabels(dataSet, centroids) {
  // prep data structure:
  const labels = {};
  for (let c = 0; c < centroids.length; c++) {
    labels[c] = {
      points: [],
      centroid: centroids[c],
    };
  }
  // For each element in the dataset, choose the closest centroid. 
  // Make that centroid the element's label.
  for (let i = 0; i < dataSet.length; i++) {
    const a = dataSet[i];
    let closestCentroid, closestCentroidIndex, prevDistance;
    for (let j = 0; j < centroids.length; j++) {
      let centroid = centroids[j];
      if (j === 0) {
        closestCentroid = centroid;
        closestCentroidIndex = j;
        prevDistance = getDistanceSQ(a, closestCentroid);
      } else {
        // get distance:
        const distance = getDistanceSQ(a, centroid);
        if (distance < prevDistance) {
          prevDistance = distance;
          closestCentroid = centroid;
          closestCentroidIndex = j;
        }
      }
    }
    // add point to centroid labels:
    labels[closestCentroidIndex].points.push(a);
  }
  return labels;
}

function getPointsMean(pointList) {
  const totalPoints = pointList.length;
  const means = [];
  for (let j = 0; j < pointList[0].length; j++) {
    means.push(0);
  }
  for (let i = 0; i < pointList.length; i++) {
    const point = pointList[i];
    for (let j = 0; j < point.length; j++) {
      const val = point[j];
      means[j] = means[j] + val / totalPoints;
    }
  }
  return means;
}

function recalculateCentroids(dataSet, labels, k) {
  // Each centroid is the geometric mean of the points that
  // have that centroid's label. Important: If a centroid is empty (no points have
  // that centroid's label) you should randomly re-initialize it.
  let newCentroid;
  const newCentroidList = [];
  for (const k in labels) {
    const centroidGroup = labels[k];
    if (centroidGroup.points.length > 0) {
      // find mean:
      newCentroid = getPointsMean(centroidGroup.points);
    } else {
      // get new random centroid
      newCentroid = getRandomCentroids(dataSet, 1)[0];
    }
    newCentroidList.push(newCentroid);
  }
  return newCentroidList;
}

function kmeans(dataset, k, useNaiveSharding = true) {
  if (dataset.length && dataset[0].length && dataset.length > k) {
    // Initialize book keeping variables
    let iterations = 0;
    let oldCentroids, labels, centroids;

    // Initialize centroids randomly
    if (useNaiveSharding) {
      centroids = getRandomCentroidsNaiveSharding(dataset, k);
    } else {
      centroids = getRandomCentroids(dataset, k);
    }

    // Run the main k-means algorithm
    while (!shouldStop(oldCentroids, centroids, iterations)) {
      // Save old centroids for convergence test.
      oldCentroids = [...centroids];
      iterations++;

      // Assign labels to each datapoint based on centroids
      labels = getLabels(dataset, centroids);
      centroids = recalculateCentroids(dataset, labels, k);
    }
    fillColourBoxes(centroids);
    const clusters = [];
    for (let i = 0; i < k; i++) {
      clusters.push(labels[i]);
    }
    const results = {
      centroids: centroids,
    };
    // return results;
  } else {
    throw new Error('Invalid dataset');
  }
}

let colourSuggestionsDiv = document.querySelector('#colourSuggestions');

function fillColourBoxes(centroids){

    let boxesArray = [];
    let box1 = document.getElementById('colourOne');
    boxesArray.push(box1);
    let box2 = document.getElementById('colourTwo');
    boxesArray.push(box2);
    let box3 = document.getElementById('colourThree');
    boxesArray.push(box3);
    let box4 = document.getElementById('colourFour');
    boxesArray.push(box4);
    let box5 = document.getElementById('colourFive');
    boxesArray.push(box5);
    let box6 = document.getElementById('colourSix');
    boxesArray.push(box6);

    /////////
    let colour1 = "rgb(" + centroids[0][0] + "," + centroids[0][1] + "," +centroids[0][2] + ")";
    box1.style.backgroundColor = colour1;

    let colour2 = "rgb(" + centroids[1][0] + "," + centroids[1][1] + "," +centroids[1][2] + ")";
    box2.style.backgroundColor = colour2;

    let colour3 = "rgb(" + centroids[2][0] + "," + centroids[2][1] + "," +centroids[2][2] + ")";
    box3.style.backgroundColor = colour3;

    let colour4 = "rgb(" + centroids[3][0] + "," + centroids[3][1] + "," +centroids[3][2] + ")";
    box4.style.backgroundColor = colour4;

    let colour5 = "rgb(" + centroids[4][0] + "," + centroids[4][1] + "," +centroids[4][2] + ")";
    box5.style.backgroundColor = colour5;

    let colour6 = "rgb(" + centroids[5][0] + "," + centroids[5][1] + "," +centroids[5][2] + ")";
    box6.style.backgroundColor = colour6;

    colourSuggestionsDiv.classList.remove('hidden');
    choiceOptionForColours();
    
    let hsvOfCentroid1 = rgb2hsv( centroids[0][0] ,centroids[0][1],centroids[0][2]);
    let hsvOfCentroid2 = rgb2hsv(centroids[1][0] ,centroids[1][1],centroids[1][2]);
    let hsvOfCentroid3 = rgb2hsv(centroids[2][0] ,centroids[2][1],centroids[2][2]);
    let hsvOfCentroid4 = rgb2hsv(centroids[3][0] ,centroids[3][1],centroids[3][2]);
    let hsvOfCentroid5 = rgb2hsv(centroids[4][0] ,centroids[4][1],centroids[4][2]);
    let hsvOfCentroid6 = rgb2hsv(centroids[5][0] ,centroids[5][1],centroids[5][2]);
    
    let analogusColours;
    createBoxesForColours();

    //for first colour 
    let matchingBoxOne = document.getElementById('matching1');
    let matchingBoxSeven = document.getElementById('matching7');
    analogusColours = getColours(hsvOfCentroid1,1);
    matchingBoxOne.style.backgroundColor = analogusColours[0];
    matchingBoxSeven.style.backgroundColor = analogusColours[1];
    boxesArray.push(matchingBoxOne);
    boxesArray.push(matchingBoxSeven);

    //for second colour
    let matchingBoxTwo = document.getElementById('matching2');
    let matchingBoxEight = document.getElementById('matching8');
    analogusColours = getColours(hsvOfCentroid2,1);
    matchingBoxTwo.style.backgroundColor = analogusColours[0];
    matchingBoxEight.style.backgroundColor = analogusColours[1];
    boxesArray.push(matchingBoxTwo);
    boxesArray.push(matchingBoxEight);

    //for third colour
    let matchingBoxThree = document.getElementById('matching3');
    let matchingBoxNine = document.getElementById('matching9');
    analogusColours = getColours(hsvOfCentroid3,1);
    matchingBoxThree.style.backgroundColor = analogusColours[0];
    matchingBoxNine.style.backgroundColor = analogusColours[1];
    boxesArray.push(matchingBoxThree);
    boxesArray.push(matchingBoxNine);

    //for fourth colour
    let matchingBoxFour = document.getElementById('matching4');
    let matchingBoxTen = document.getElementById('matching10');
    analogusColours = getColours(hsvOfCentroid4,1);
    matchingBoxFour.style.backgroundColor = analogusColours[0];
    matchingBoxTen.style.backgroundColor = analogusColours[1];
    boxesArray.push(matchingBoxFour);
    boxesArray.push(matchingBoxTen);

    //for fifth colour
    let matchingBoxFive = document.getElementById('matching5');
    let matchingBoxEleven = document.getElementById('matching11');
    analogusColours = getColours(hsvOfCentroid5,1);
    matchingBoxFive.style.backgroundColor = analogusColours[0];
    matchingBoxEleven.style.backgroundColor = analogusColours[1];
    boxesArray.push(matchingBoxFive);
    boxesArray.push(matchingBoxEleven);

    //for sixth colour
    let matchingBoxSix = document.getElementById('matching6');
    let matchingBoxTwelve = document.getElementById('matching12');
    analogusColours = getColours(hsvOfCentroid6,1);
    matchingBoxSix.style.backgroundColor = analogusColours[0];
    matchingBoxTwelve.style.backgroundColor = analogusColours[1];
    boxesArray.push(matchingBoxSix);
    boxesArray.push(matchingBoxTwelve);


    let complementaryColours, triadicColours, tetradicColours;
    //contrasting colours
    //for first colour
    let contrastingBoxOne = document.getElementById('contrasting1');
    let contrastingBoxSeven = document.getElementById('contrasting7');
    let contrastingBoxThirteen = document.getElementById('contrasting13');
    let contrastingBoxNineteen = document.getElementById('contrasting19');
    boxesArray.push(contrastingBoxOne,contrastingBoxSeven,contrastingBoxThirteen,contrastingBoxNineteen);
    complementaryColours = getColours(hsvOfCentroid1,2);
    triadicColours = getColours(hsvOfCentroid1,3);
    tetradicColours = getColours(hsvOfCentroid1,4);
    contrastingBoxOne.style.backgroundColor = complementaryColours;
    contrastingBoxSeven.style.backgroundColor = triadicColours[0];
    contrastingBoxThirteen.style.backgroundColor = triadicColours[1];
    contrastingBoxNineteen.style.backgroundColor = tetradicColours;

    //for second colour
    let contrastingBoxTwo = document.getElementById('contrasting2');
    let contrastingBoxEight = document.getElementById('contrasting8');
    let contrastingBoxFourteen = document.getElementById('contrasting14');
    let contrastingBoxTwenty = document.getElementById('contrasting20');
    boxesArray.push(contrastingBoxTwo,contrastingBoxEight,contrastingBoxFourteen,contrastingBoxTwenty);
    complementaryColours = getColours(hsvOfCentroid2,2);
    triadicColours = getColours(hsvOfCentroid2,3);
    tetradicColours = getColours(hsvOfCentroid2,4);
    contrastingBoxTwo.style.backgroundColor = complementaryColours;
    contrastingBoxEight.style.backgroundColor = triadicColours[0];
    contrastingBoxFourteen.style.backgroundColor = triadicColours[1];
    contrastingBoxTwenty.style.backgroundColor = tetradicColours;

    //for third colour
    let contrastingBoxThree = document.getElementById('contrasting3');
    let contrastingBoxNine = document.getElementById('contrasting9');
    let contrastingBoxFifteen = document.getElementById('contrasting15');
    let contrastingBoxTwentyone = document.getElementById('contrasting21');
    boxesArray.push(contrastingBoxThree,contrastingBoxNine,contrastingBoxFifteen,contrastingBoxTwentyone);
    complementaryColours = getColours(hsvOfCentroid3,2);
    triadicColours = getColours(hsvOfCentroid3,3);
    tetradicColours = getColours(hsvOfCentroid3,4);
    contrastingBoxThree.style.backgroundColor = complementaryColours;
    contrastingBoxNine.style.backgroundColor = triadicColours[0];
    contrastingBoxFifteen.style.backgroundColor = triadicColours[1];
    contrastingBoxTwentyone.style.backgroundColor = tetradicColours;

    //for fourth colour
    let contrastingBoxFour = document.getElementById('contrasting4');
    let contrastingBoxTen = document.getElementById('contrasting10');
    let contrastingBoxSixteen = document.getElementById('contrasting16');
    let contrastingBoxTwentytwo = document.getElementById('contrasting22');
    boxesArray.push(contrastingBoxFour,contrastingBoxTen,contrastingBoxSixteen,contrastingBoxTwentytwo);
    complementaryColours = getColours(hsvOfCentroid4,2);
    triadicColours = getColours(hsvOfCentroid4,3);
    tetradicColours = getColours(hsvOfCentroid4,4);
    contrastingBoxFour.style.backgroundColor = complementaryColours;
    contrastingBoxTen.style.backgroundColor = triadicColours[0];
    contrastingBoxSixteen.style.backgroundColor = triadicColours[1];
    contrastingBoxTwentytwo.style.backgroundColor = tetradicColours;

    //for fifth colour
    let contrastingBoxFive = document.getElementById('contrasting5');
    let contrastingBoxEleven = document.getElementById('contrasting11');
    let contrastingBoxSeventeen = document.getElementById('contrasting17');
    let contrastingBoxTwentythree = document.getElementById('contrasting23');
    boxesArray.push(contrastingBoxFive,contrastingBoxEleven,contrastingBoxSeventeen,contrastingBoxTwentythree);
    complementaryColours = getColours(hsvOfCentroid5,2);
    triadicColours = getColours(hsvOfCentroid5,3);
    tetradicColours = getColours(hsvOfCentroid5,4);
    contrastingBoxFive.style.backgroundColor = complementaryColours;
    contrastingBoxEleven.style.backgroundColor = triadicColours[0];
    contrastingBoxSeventeen.style.backgroundColor = triadicColours[1];
    contrastingBoxTwentythree.style.backgroundColor = tetradicColours;

    //for sixth colour
    let contrastingBoxSix = document.getElementById('contrasting6');
    let contrastingBoxTwelve = document.getElementById('contrasting12');
    let contrastingBoxEightteen = document.getElementById('contrasting18');
    let contrastingBoxTwentyfour = document.getElementById('contrasting24');
    boxesArray.push(contrastingBoxSix,contrastingBoxTwelve,contrastingBoxEightteen,contrastingBoxTwentyfour);
    complementaryColours = getColours(hsvOfCentroid6,2);
    triadicColours = getColours(hsvOfCentroid6,3);
    tetradicColours = getColours(hsvOfCentroid6,4);
    contrastingBoxSix.style.backgroundColor = complementaryColours;
    contrastingBoxTwelve.style.backgroundColor = triadicColours[0];
    contrastingBoxEightteen.style.backgroundColor = triadicColours[1];
    contrastingBoxTwentyfour.style.backgroundColor = tetradicColours;
      
    fillNewColourBoxes(boxesArray);
    moveBigBoxOnImage();

}

// let spanColTwo;
let list;
function updateScreenThreeBoxes(listArray){
  let newListArray = [];
  let k=1;
  for(var i=0;i<listArray.length;i++)
  {
    let itemColour = document.getElementById(`chosen${(i+1)}`);
    if(itemColour !== null)
    {
      let itemColourBox = document.getElementById(`selected${k}`);
      itemColourBox.style.backgroundColor = itemColour.style.backgroundColor;
      let colourForItem = itemColourBox.style.backgroundColor;
      getColourHue(colourForItem);
      // colourItemList.push()
      itemColourBox.style.border='none';
      newListArray.push(itemColourBox);
      console.log(newListArray);
      k++;
    }
  }
  list = newListArray;
  // let colourTapTwo; 
 
  // newListArray.forEach(spanBoxTwo =>{
  //   spanBoxTwo.onclick = function(){
  //     console.log("yay");
  //     colourTapTwo = this.style.backgroundColor;
  //     spanColTwo = colourTapTwo;
  //   };
  // });
}


function fillNewColourBoxes(boxesArray)
{
  let plusButton = document.getElementById('plus');
  let minusButton = document.getElementById('minus');
  let minusButtonTwo = document.getElementById('minusTwo');
  // let listArray = [];
  let spanCol;
  boxesArray.forEach(spanBox =>{
    spanBox.onclick = function(){
      spanCol = this.style.backgroundColor;
      bigMoveBox.style.backgroundColor = this.style.backgroundColor;
    };
  });

  let listItem;
  let listItemCounter=0;
  plusButton.addEventListener('click', ()=>{
    if(listItemCounter<10)
    {
      if(colourList)
      {
        listItem = `<span id="chosen${(listArray.length+1)}" class="listBox">`;
        colourList.innerHTML += listItem;
        let itemX = document.getElementById(`chosen${(listArray.length+1)}`);
        itemX.style.backgroundColor = spanCol;
        listItemCounter++;
        listArray.push(itemX);
      }
    }

    if(listItemCounter>=10) {
      plusButton.style.borderColor = 'grey';
      plusButton.style.color = 'grey';
    }
  });

  minusButton.addEventListener('click', ()=>{
        if(listItemCounter>0){
          for(var i=0;i<listArray.length;i++)
            {
              let itemX = document.getElementById(`chosen${(i+1)}`);
              if(itemX != null)
              {
                if(itemX.style.backgroundColor === spanCol)
                {
                  itemX.parentNode.removeChild(itemX);
                  listItemCounter--;
                }
              }
            }
            plusButton.style.borderColor = 'rgb(232,90,80)';
            plusButton.style.color = 'rgb(232,90,80)';
          }
  });

  let spanColTwo; 
 
  list.forEach(spanBoxTwo =>{
    spanBoxTwo.onclick = function(){
      console.log("yay");
      spanColTwo = this.style.backgroundColor;
      // spanColTwo = colourTapTwo;
    };
  });
  
  minusButtonTwo.addEventListener('click', ()=>{
    if(listItemCounter>0){
      for(var i=0;i<listArray.length;i++)
        {
          
          let itemX = document.getElementById(`chosen${(i+1)}`);
         
          let itemColourSelected = document.getElementById(`selected${i+1}`);
          
          if(itemX != null && itemColourSelected != null)
          {
            if(itemX.style.backgroundColor === spanColTwo && itemColourSelected.style.backgroundColor === spanColTwo)
            {
              console.log(itemX);
              itemX.parentNode.removeChild(itemX);
              listItemCounter--;
              console.log(itemColourSelected);
              itemColourSelected.style.backgroundColor = 'white';
              itemColourSelected.style.border = '1px solid rgb(240, 240, 240)';
            }

            // if(itemColourSelected.style.backgroundColor === spanColTwo)
            // {
            //   console.log(itemColourSelected);
            //   itemColourSelected.style.backgroundColor = 'white';
            //   itemColourSelected.style.border = '1px solid rgb(240, 240, 240)';
            // }
          }
        }
      }
    });
    
}

function getColourHue(colourForItem){
  let seperate = colourForItem.indexOf(",") > -1 ? "," : " ";
  colourForItem = colourForItem.substr(4).split(")")[0].split(seperate);

  let r = (colourForItem[0]);
  let g = (colourForItem[1]);
  let b = (colourForItem[2]);

  let hsvColorOfItem = rgb2hsv(r,g,b);
  let hueOfItem = hsvColorOfItem[0];
  for(var i=0;i<itemsData.length;i++)
  {
    if(hueOfItem >= 0 && hueOfItem <=30 && itemsData[i].hue >= 0 && itemsData[i].hue <=30)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 31 && hueOfItem <=60 && itemsData[i].hue >= 31 && itemsData[i].hue <=60)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 61 && hueOfItem <=90 && itemsData[i].hue >= 61 && itemsData[i].hue <=90)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 91 && hueOfItem <=120 && itemsData[i].hue >= 91 && itemsData[i].hue <=120)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 121 && hueOfItem <=150 && itemsData[i].hue >= 121 && itemsData[i].hue <=150)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 151 && hueOfItem <=180 && itemsData[i].hue >= 151 && itemsData[i].hue <=180)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 181 && hueOfItem <=210 && itemsData[i].hue >= 181 && itemsData[i].hue <=210)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 211 && hueOfItem <=240 && itemsData[i].hue >= 211 && itemsData[i].hue <=240)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 241 && hueOfItem <=270 && itemsData[i].hue >= 241 && itemsData[i].hue <=270)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 271 && hueOfItem <=300 && itemsData[i].hue >= 271 && itemsData[i].hue <=300)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 301 && hueOfItem <=330 && itemsData[i].hue >= 301 && itemsData[i].hue <=330)
    {
      showImages(itemsData[i].imageName);
    }
    if(hueOfItem >= 331 && hueOfItem <=360 && itemsData[i].hue >= 331 && itemsData[i].hue <=360)
    {
      showImages(itemsData[i].imageName);
    }
  }
}   

const itemShowingArea = document.querySelector('.itemsShow');
let item,img,d=0;

function showImages(nameOfTheImage){
  item = `<span id="${d}" class="itemBox"></span>`;
  itemShowingArea.innerHTML += item;
  img = `<img src="decorating items/${nameOfTheImage}.png">`;
  let itemY = document.getElementById(`${d}`);
  itemY.innerHTML = img;
  d++;
}

function removeItemBoxes(){
  itemShowingArea.innerHTML = '';
}

function moveBigBoxOnImage(){
  let isDown;
  moveableBox.addEventListener('mousedown', function(e) {
      isDown = true;
      offset = [
          moveableBox.offsetLeft - e.clientX,
          moveableBox.offsetTop - e.clientY
      ];
  }, true);
  
  document.addEventListener('mouseup', function() {
      isDown = false;
  }, true);
  
  document.addEventListener('mousemove', function(event) {
      event.preventDefault();
      if (isDown) {
          mousePosition = {
  
              x : event.clientX,
              y : event.clientY
  
          };
            moveableBox.style.left = (mousePosition.x + offset[0]) + 'px';
            moveableBox.style.top  = (mousePosition.y + offset[1]) + 'px';
          
      }
  }, true);
}


function getColours(colour, x){
  let s = colour[1];
  let v = colour[2];
  if(x===1){
    let h = getAnalogColours(colour);
    let rgb = [hsvToRgb(h[0],s,v), hsvToRgb(h[1],s,v)];
    return rgb;
  }
   
  if(x===2){
    let h = getComplementaryColour(colour);
    let rgb = hsvToRgb(h,s,v);
    return rgb;
  }

  if(x===3){
    let h = getTriadicColours(colour);
    let rgb = [hsvToRgb(h[0],s,v), hsvToRgb(h[1],s,v)];
    return rgb;
  }

  if(x===4){
    let h = getTetradicColours(colour);
    let rgb = hsvToRgb(h,s,v);
    return rgb;
  }
}

var matchingBoxesDiv = document.querySelector('.colourBox2');
var contrastingBoxesDiv = document.querySelector('.colourBox3');

const all = document.getElementById('all');
const matching = document.getElementById('matching');
const contrasting = document.getElementById('contrasting');

const matchingDiv = document.querySelector('.matchingDiv');
const contrastingDiv = document.querySelector('.contrastingDiv');

let variable=0;

function choiceOptionForColours(){
  all.addEventListener('click', ()=>{
    variable = 1;
    if(!all.classList.contains('chosen'))
    {
      all.classList.add('chosen');
    }
    matching.classList.remove('chosen');
    contrasting.classList.remove('chosen');
    matchingDiv.classList.remove('hidden');
    contrastingDiv.classList.remove('hidden');
  });

  matching.addEventListener('click', ()=>{
    variable = 2;
    if(!matching.classList.contains('chosen'))
    {
    matching.classList.add('chosen');
    }
    all.classList.remove('chosen');
    contrasting.classList.remove('chosen');
    matchingDiv.classList.remove('hidden');
    contrastingDiv.classList.add('hidden');

  });

  contrasting.addEventListener('click', ()=>{
    variable = 3;
    if(!contrasting.classList.contains('chosen'))
    {
    contrasting.classList.add('chosen');
    }
    all.classList.remove('chosen');
    matching.classList.remove('chosen');
    contrastingDiv.classList.remove('hidden');
    matchingDiv.classList.add('hidden');
  });

}

function createBoxesForColours(){
  let spanTag;
  if(matchingBoxesDiv){
    for(var i=0;i<12;i++)
    {
      spanTag = `<span id="matching${i+1}" class="colourBoxes height2">`;
      matchingBoxesDiv.innerHTML += spanTag;
    }
  }

  if(contrastingBoxesDiv){
    for(var i=0;i<24;i++)
    {
      spanTag = `<span id="contrasting${i+1}" class="colourBoxes height3">`;
      contrastingBoxesDiv.innerHTML += spanTag;
    }
  }
}

function removeColourBoxes(){
  if(matchingBoxesDiv){
    matchingBoxesDiv.innerHTML = '';
  }
  if(contrastingBoxesDiv){
    contrastingBoxesDiv.innerHTML = '';
  }
}

function rgb2hsv (r, g, b) {
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs),
  diff = v - Math.min(rabs, gabs, babs);
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;
  if (diff == 0) {
      h = s = 0;
  } else {
      s = diff / v;
      rr = diffc(rabs);
      gg = diffc(gabs);
      bb = diffc(babs);

      if (rabs === v) {
          h = bb - gg;
      } else if (gabs === v) {
          h = (1 / 3) + rr - bb;
      } else if (babs === v) {
          h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
          h += 1;
      }else if (h > 1) {
          h -= 1;
      }
  }
  return [Math.round(h * 360), percentRoundFn(s * 100), percentRoundFn(v * 100)];
    
}

function hsvToRgb(h, s, v) {
  var r, g, b;
  h = h/360;
  s = s/100;
  v = v/100;
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return "rgb(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + ")";
}

function getComplementaryColour(valueC){
  let newColour = valueC[0];
  let colourC =  rotate(newColour, 180);
  return colourC;
}

function getAnalogColours(valueC){
  let newColour = valueC[0];
  let colourA1 = rotate(newColour, 30);
  let colourA2 = rotate(newColour, -30);
  return [colourA1, colourA2];
}

function getTriadicColours(valueC){
  let newColour = valueC[0];
  let colourT1 = rotate(newColour, 120);
  let colourT2 = rotate(newColour, -120);
  return [colourT1, colourT2];
}

function getTetradicColours(valueC){
  let newColour = valueC[0];
  let colourT3 = rotate(newColour, -60);
  return colourT3;
}

function rotate(C, angle){
  let newAngle = (C + angle) % 360;
  if(newAngle < 0)
  {
    newAngle = 360 + newAngle;
  }
  if(newAngle > 360)
  {
    newAngle = newAngle - 360;
  }

  return newAngle;
}


//brightness and saturation of canvas pixels
//get data of pictures from database