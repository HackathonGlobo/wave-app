angular.module('WaveApp')

.controller('AppCtrl', function($scope, waveService, $timeout, $interval) {

    var siriWave = new SiriWave({
        container: document.getElementById('wave-container'),
        height: 80,
        width: 600,
        cover: true,
        amplitude: 0,
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

        // if(code == $scope.lastFetch) return;

        // $scope.lastFetch = code;
        // waveService.fetch(code).then(function(response) {
        //     var card = response.data;

        //     card.date = card.is_merchan ? 'Patrocinado' : 'Agora';

        //     $scope.cards.push(card);
        //     navigator.vibrate(50);
        // });

        alert("iniciando audio");

        siriWave.setAmplitude(1);

        audioinput.start({
            streamToWebAudio: true
        });
        analyser = audioinput.getAudioContext().createAnalyser();
        analyser.fftSize = 2048;
        audioinput.connect(analyser);

        var dataArray = new Uint8Array(analyser.frequencyBinCount); // Uint8Array should be the same length as the frequencyBinCount 
        
        $interval(function() {
            analyser.getByteFrequencyData(dataArray);
            fineArray = dataArray.slice(890, 910);
            console.log(JSON.stringify(fineArray));
        }, 2000);
    }

})

.service('waveService', function($q, $http, endpoint) {
    this.fetch = function(code) {
        return $http.get(endpoint+'/waves?code='+code);
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
