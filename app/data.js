app.controller("addData", function($scope, $rootScope, $http) {
   $rootScope.addRow = function(user) {
      $rootScope.userData = angular.copy(user);
      $rootScope.repo.push(angular.copy(user));
      // Post Data
      const url = 'http://localhost:3000/repo';
      $http.post(url, angular.copy(user))
      .then(function(response){
         if (response.data)
            alert("Thêm dữ liệu thành công!");
         },function (response) {
            alert("thất bại");
         });
   };
   $scope.reset = function() {
      console.log("test");
      $rootScope.user = {
         id: "",
         name: "",
         created_at: "",
         private: "",
         description: ""
      }
   }
});