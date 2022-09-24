const app = angular.module("myApp", ["ngRoute"]);


// app.controller("")
const data = "http://localhost:3000/repo";


// call API
app.controller("table", ($rootScope,$scope, $http) => {
   $http.get(data)
   .then(function(response){
      $rootScope.repo = response.data;
   })
   $scope.deleteData = function(index) {
      console.log($scope.repo[index].id)
      $http.delete(
         `${data}//${$scope.repo[index].id}`,
         $scope.repo[index]
       )
      .then(function(response) {
         if (response.data)
            alert("xóa dữ liệu thành công!");
         }, function(response) {
            alert("xóa thất bại!")
         })
   }
   $rootScope.editRow = function(index) {
      $rootScope.user = {
         index: index,
         id: $rootScope.repo[index].id,
         name: $rootScope.repo[index].name,
         created_at: $rootScope.repo[index].created_at,
         private: $rootScope.repo[index].private,
         description: $rootScope.repo[index].description
      }
      console.log($scope.user)
   }
   $rootScope.updateRow = function(user) {
      $http.put(url= `${data}\\${angular.copy(user).id}`, angular.copy(user))
      .then(function(response) {
         if(response.data) {
            alert("đã cập nhật thông tin!");
         }
      }), function(response){
         alert("that bai!")
      };
   }
})