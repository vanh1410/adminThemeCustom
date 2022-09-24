app.factory('usersHttpRequest', function() {
   const usersData = "http://localhost:2021/users";
   return {
      getAllUsers: () => {
         $http.post(usersData, angular.copy(user))
         .then(function(response){
            if(response.data){
               alert("Đăng kí thành công!");
            }
         }),function(response){
            alert("Xin hãy kiểm tra lại!")
         }
         console.log("tesst")
      }
   }
})