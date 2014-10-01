/**
 * @license Blurgular
 * @Author Thomas LEDUC, Guillaume TEBOUL
 * License: MIT
 */
"use strict";
angular.module("com.epita.blurgular",[])
    .constant("BL_DEFAULT", {
        RADIUS: 22,
        DEBUG:false
    })
    .factory("BlBlur", function() {
        // BlBlur class
        // Static method :
        //  - BlBlur() : constructor
        //  - addBlur({element,radius}) : add blur on element
        //          - element : angular dom element
        //          - radius : int
        //  - removeBlur({element}) : remove blur from element
        //          - element : angular dom element

        // BlBlur class constructor
        function BlBlur() {

        }

        // checkElement
        // Static method that check the referenced parameters and print an error message in debug mode
        BlBlur.checkElement = function(ref) {
            // just a debug function ...
            if (ref.debug) {
                if (ref.element == undefined) {
                    console.error('blurgular', 'ref.element is not defined in blur service');
                    return false
                } else {
                    console.log('blurgular element', ref.element);
                }
            }
            return true
        };

        BlBlur.addBlur = function(ref) {
            if (this.checkElement(ref)) {
                var css_value = "blur(" + ref.radius + "px)";

                ref.element.css("-webkit-filter", css_value);
                ref.element.css("-moz-filter", css_value);
                ref.element.css("-o-filter", css_value);
                ref.element.css("-ms-filter", css_value);
                ref.element.css("filter", css_value);
                if (ref.imgBlurFirefox && navigator.userAgent.match(/Firefox/i)) {
                    ref.element.css("filter", 'url(' + ref.imgBlurFirefox + '#blur)');
                }

                if (navigator.userAgent.match(/internet explorer/i)) {
                    ref.element.css("filter", "progid:DXImageTransform.Microsoft.Blur(PixelRadius='3')");
                }
            }
        };

        BlBlur.removeBlur = function(ref) {
            if (this.checkElement(ref)) {
                var css_back = "none";

                ref.element.css("-webkit-filter", css_back);
                ref.element.css("-moz-filter", css_back);
                ref.element.css("-o-filter", css_back);
                ref.element.css("-ms-filter", css_back);
                ref.element.css("filter", css_back);
            }
        };

        return (BlBlur);
    })
    // blugular directive
    // For using only as an attribute
    // Firefox support only if config.imgBlurFirefox is provided
    // config {
    //    radius : int,
    //    debug : boolean,
    //    imgBlurFirefox : image string path of blur.svg
    // }
    .directive('blurgular', ["BL_DEFAULT", "BlBlur", function(BL_DEFAULT, BlBlur) {
        return {
            restrict: "A",
            scope: {
                config:"=blConfig"
            },
            link: function($scope, $element, $attrs) {
                // If it's not set put the default value
                if ($scope.config.radius === undefined) $scope.config.radius = BL_DEFAULT.RADIUS;
                if ($scope.config.debug === undefined) $scope.config.debug = BL_DEFAULT.DEBUG;

                if ($scope.config.debug) {
                    console.log("blBlurred scope", $scope);
                    console.log("blBlurred element", $element);
                    console.log("navigator.userAgent", navigator.userAgent);
                }

                $scope.config.element = $element;

                if ($scope.config.radius == 0) {
                    BlBlur.removeBlur($scope.config);
                } else {
                    BlBlur.addBlur($scope.config);
                }
            }
        };
    }]);