const usersData = "https://ext-api02.herokuapp.com//v1/users";
const registerAPI = 'https://ext-api02.herokuapp.com//v1/auth/register'
const loginAPI = 'https://ext-api02.herokuapp.com//v1/auth/login'

app.controller("users", function($scope, $rootScope, $http,) {
   $http({
      method: "GET",
      url: usersData
   })
   .then(function(response){
      $rootScope.users = response.data.results;
      console.log(response.data.results)
   }).
   catch(err => console.log(err));

   $scope.userCreate = function(user) {
      $http.post(registerAPI, angular.copy(user))
      .then(function(response){
         if(response.data){
            alert("Đăng kí thành công!");
         }
      }),function(response){
         alert("Xin hãy kiểm tra lại!")
      }
   }
   $scope.orderBy = function(columnName) {
      $scope.orderByColumnName = columnName;
   }
   $scope.deleteUser = (index) => {

      $http.delete(`${usersData}\\${$rootScope.users[index]._id}`, $rootScope.users[index])
      .then(function(response) {
         if(response.data){
            alert("Đã xóa người dùng"); 
         }
      }, function() {
         alert("Hãy thử lại!")
      })
   }
   $scope.login = function(user) {
      $http.post(loginAPI, angular.copy(user))
      .then(function(response){
         if(response.data){
            alert("Đăng kí thành công!");
         }
      }),function(response){
         alert("Xin hãy kiểm tra lại!")
      }
   }
   $scope.showNum = 3;
})