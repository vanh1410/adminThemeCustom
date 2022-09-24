app.config(['$routeProvider', function config($routeProvider) {
   $routeProvider.
   when("/", {
      // template: '<h1> Home Page </h1>'
      templateUrl: '../component/mainView.html'
   }).
   when("/home_2", {
      templateUrl: '../component/subView.html'
   }).
   when("/home_3", {
      templateUrl: '../component/sub2View.html'
   })
   
   // widgets router
   .when("/pages/widgets", {
      templateUrl: '../pages/widgets.html'
   })
   
   // Users router
   .when("/pages/layout/login", {
      templateUrl: '../pages/layout/login.html',
      controller: 'users'
   }).
   when("/pages/layout/register", {
      templateUrl: '../pages/layout/register.html',
      controller: 'users'
   }).
   when("/pages/layout/view-user", {
      templateUrl: '../pages/layout/view-user.html',
      controller: 'users'
   })
   // Chart Router
   .
   when("/pages/Chart/index", {
      templateUrl: '../pages/Chart/charts.html',
      controller: 'orgChart'
   }).
   when("/pages/charts/light", {
      templateUrl: '../pages/Chart/chartLight.html',
      controller: 'chartLight'
   }).
   when("/pages/charts/sky", {
      templateUrl: '../pages/Chart/skyChart.html',
      controller: 'skyChart'
   }).
   when("/pages/charts/uplot", {
      templateUrl: '../pages/charts/uplot.html'
   })
   
   // Info Router
   .
   when("/pages/tables/add", {
      templateUrl: '../pages/tables/addData.html',
      controller: 'addData'
   }).
   when("/pages/tables/data", {
      templateUrl: '../pages/tables/data.html'
   }).
   when("/pages/tables/update", {
      templateUrl: '../pages/tables/updateData.html'
   })
}])


function test(value){
   return new Promise((resolve,reject)=>{
   if(value == 1){ 
      resolve(true)
   } else reject()
   })
}
