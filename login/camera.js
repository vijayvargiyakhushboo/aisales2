'use strict'
aisales.controller('cameraCtrl', function($rootScope, $scope, $mdToast, $mdDialog, $http,$location, TOAST_DELAY, TOAST_POS) {
  
  // Define constants
  const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")
      
  $scope.showStopCamera = false;
  $scope.showTakePicture = true;
  $scope.takePicName = "Take a picture";

  $rootScope.stopStream = (ev)=>{
    $rootScope.track.stop();
    $scope.showStopCamera = false;
    $scope.showTakePicture = false;
  }
  $rootScope.cancelStream = (ev)=>{
    cameraSensor.getContext("2d").clearRect(0, 0, cameraSensor.width, cameraSensor.height);
  }
  
  $rootScope.stopStream = (ev)=>{
    $rootScope.track.stop();
    $scope.showStopCamera = false;
    $scope.showTakePicture = false;
    video.pause();
    $rootScope.cameraStream.stop();
  }
  
  $scope.openCamera = (ev)=>{
    $rootScope.showDialog(ev,'customer', {}, 'camera.html','Take Picture?')
    .then((answer)=>{
      if(answer == 'submit') {
        $scope.confirmCustomer(customer);
      }
    });
  }
  

  // Set constraints for the video stream
  var constraints = { video: { facingMode: "user" }, audio: false };

  // Access the device camera and stream to cameraView
  $scope.cameraStart = ()=>{
      return navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(stream) {
            $scope.showStopCamera = true;
            $rootScope.track = stream.getTracks()[0];
            cameraView.srcObject = stream;
            $rootScope.cameraStream = stream;
            video.src = window.URL.createObjectURL(stream);
          })
  }
  
  // Take a picture when cameraTrigger is tapped
  // Start the video stream when the window loads
  //window.addEventListener("load", cameraStart, false);
  // default camera ends here
  
    $scope.takePicture = ()=>{
      $scope.takePicName = "Take another picture";
      cameraSensor.width = cameraView.videoWidth;
      cameraSensor.height = cameraView.videoHeight;
      cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
      //cameraOutput.src = cameraSensor.toDataURL("image/webp");
      //cameraOutput.classList.add("taken");
    }
    
    if($rootScope.signIn == 'Sign In') {
      $scope.cameraStart().then((data) =>{ $scope.showTakePicture = true;}).catch(error => console.error("Oops. Something is broken.", error));

    }else{
      $rootScope.logout();
    }
})