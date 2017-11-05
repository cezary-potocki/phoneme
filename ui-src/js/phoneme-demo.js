var query = '["cezary potocki", "hamzeh al"]'
var address = 'http://54.36.53.127:8009/embedding'

console.log(query)

angular.module('phoneme-demo', [])
.controller('PhonemeDemo', function($scope, $http) {
    $http({
      method: 'POST',
      url: address,
      data: query
    }).
        then(function(response) {
            $scope.near_neighbors = response.data;
        });
});

console.log($scope.near_neighbors)
