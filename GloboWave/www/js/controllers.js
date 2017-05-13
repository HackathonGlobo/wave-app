angular.module('WaveApp')

.controller('AppCtrl', function($scope, waveService) {

    var siriWave = new SiriWave({
        container: document.getElementById('wave-container'),
        height: 80,
        width: 600,
        cover: true,
        amplitude: 1,
        speed: 0.15,
        color: '#EC7D00'
    });

    siriWave.start();


    $scope.cards = [];

    var card = {};
    card.title = "Vote em sua voz favorita!";
    card.caption = "The Voice";
    card.date = "Há 2 Dias";
    card.img = "img/thevoice.jpg";
    $scope.cards.push(card);

    card = {};
    card.title = "Croquete de Aipim Cremoso";
    card.caption = "Mais Você";
    card.date = "Ontem";
    card.img = "img/aipim.jpeg";
    $scope.cards.push(card);

    $scope.fetchCard = function(code) {
        waveService.fetch(code).then(function(card) {
            $scope.cards.push(card);
        });
    }

})

.service('waveService', function($q, $http) {
    this.fetch = function(code) {

    }
})

.directive('backImg', function() {
    return function(scope, element, attrs) {
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value + ')',
                'background-size': 'cover'
            });
        });
    };
})

.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
})
