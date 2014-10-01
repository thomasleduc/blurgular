blurgular
=========

An angular module to blur any kind of html component

## Using ##

A demo may coming soon but for the moment you can use it like a basic angularJs module


Include it after angular.js and before your controller. But we strongly recommand to use a script like requireJs to manage dependencies.

```html
<html>
<head>
   <scirpt src="angular.js"></script>
   <script src="blurgular.js"></script>
   <script src="awesomecontroller.js"></script>
</head>
<body>
     <div ng-controller="AwesomeController">
          <img src="foo.png" blurgular bl-config="config" />
     </div>
</body>
</html>
```

and your controller :
```javascript

function AwesomeController($scope) {
    $scope.blurgular = {
       config: {
           radius:12,
           debug:false,
           imgBlurFirefox:'app/js/blurgular/blur.svg' // the path the FireFox svg filter if you want the compatibility
       }
    }
```

## Cross-browser ##

We can't test for the moment, but all the code is written with the good practice to be cross-browser.

## Coming soon ##

The Demo
The firefox svg radius changement.
