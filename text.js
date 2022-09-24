nodeContent(function (d, i, arr, state) {
   if($scope.chartMode == 'light'){
       return `
       <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(d.data)}, ${d.depth})" style="padding-top:30px;background-color:none;margin-left:1px;height:${
         d.height
       }px;border-radius:2px;overflow:visible">
         <div style="height:${
           d.height - 32
         }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

           <img src=" ${
             d.data.hinh_anh
           }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

          <div style="margin-right:10px;margin-top:15px;float:right">${
            d.data.ma_phong_ban
          }</div>
          
          <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
            d.width - 2
          }px;border-radius:1px"></div>

          <div style="padding:20px; padding-top:35px;text-align:center">
              <div style="color:#111672;font-size:16px;font-weight:bold"> ${
                d.data.ten_nhan_vien
              } </div>
              <div style="color:#404040;font-size:16px;margin-top:4px"> ${
                d.data.vi_tri_cong_viec.ten
              } </div>
          </div>
          <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
            <div > Manages:  ${d.data._directSubordinates} 👤</div>  
            <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
          </div>
         </div>     
 </div>
`;
   } else if($scope.chartMode == 'sky') {
     const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
       const color = colors[d.depth % colors.length];
       return `
       <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(d.data)}, ${d.depth})" style="background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:50px">
          <img src=" ${
            d.data.hinh_anh
          }" style="position:absolute;margin-top:5px;margin-left:${5}px;border-radius:100px;width:60px;height:60px;" />
          <div style="position:absolute;top:-15px;width:${
            d.width
          }px;text-align:center;color:#fafafa;">
                <div style="margin:0 auto;background-color:${color};display:inline-block;padding:8px;padding-bottom:0px;border-radius:5px"> ${d.data.id}</div>
         </div>

         <div style="color:#fafafa;font-size:${
           d.depth < 2 ? 16 : 12
         }px;font-weight:bold;margin-left:70px;margin-top:15px"> ${d.depth < 2 ? d.data.ten_nhan_vien : (d.data.ten_nhan_vien || '').trim()} </div>
         <div style="color:#fafafa;margin-left:70px;margin-top:5px"> ${
           d.depth < 2 ? `Phòng ban` : d.data.dia_chi_thuong_tru
         } </div>
         
          
          <div style="padding:20px; padding-top:35px;text-align:center">
             
              
          </div> 
         
          <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
            <div > Manages:  ${d.data._directSubordinates} 👤</div>  
            <div > Oversees: ${d.data._totalSubordinates} 👤</div>
          </div>
      </div>
`;
   } else{
   const svgStr = `<svg width=150 height=75  style="background-color:none"> <path d="M 0,15 L15,0 L135,0 L150,15 L150,60 L135,75 L15,75 L0,60" fill="#2599DD" stroke="#2599DD"/> </svg>`;
   return `
                       <div class="left-top" style="position:absolute;left:-10px;top:-10px">  ${svgStr}</div>
                       <div class="right-top" style="position:absolute;right:-10px;top:-10px">  ${svgStr}</div>
                       <div class="right-bottom" style="position:absolute;right:-10px;bottom:-14px">  ${svgStr}</div>
                       <div class="left-bottom" style="position:absolute;left:-10px;bottom:-14px">  ${svgStr}</div>
                       <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(d.data)}, ${d.depth})" style="font-family: 'Inter'; background-color:#040910;sans-serif; position:absolute;margin-top:-1px; margin-left:-1px;width:${
                         d.width
                       }px;height:${d.height}px;border-radius:0px;border: 2px solid #2CAAE5" >
                         
                         <div class="pie-chart-wrapper" style="margin-left:-10px;margin-top:5px;width:320px;height:300px"></div>
                       
                         <div style="color:#2CAAE5;position:absolute;right:15px;top:-20px;">
                           <div style="font-size:15px;color:#2CAAE5;margin-top:32px"> ${
                             d.data.ma_nhan_vien
                           } </div>
                           <div style="font-size:10px;"> ${
                             d.data.ten_nhan_vien || ""
                           } </div>
                           <div style="font-size:10px;"> ${
                             d.data.ma_phong_ban || ""
                           } </div>
                           ${
                             d.depth == 0
                               ? `                              <br/>
                           <div style="max-width:200px;font-size:10px;">
                             Đây là đoạn văn mô tả  <br><br>Usually it is produced in written format but it can also be done in audio or audiovisually  
                           </div>
                           
                           `
                               : `
                               
                               `
                           }
                           
                         </div>

                         <div style="position:absolute;left:-5px;bottom:10px;">
                           <div style="font-size:10px;color:#2CAAE5;margin-left:20px;margin-top:32px"> Progress </div>
                           <div style="background:blue;color:#2CAAE5;margin-left:20px;margin-top:3px;height:10px; position: relative; width:150px"> 
                             <svg width=150 height=10 style="position: absolute; top: 0; left:0">
                               <rect width=${d.data.progress}% height=10 fill=red cx=0 cy=0
                               />
                             </svg>
                           </div>
                         </div>
                       </div>
</div>
                       
`;
 }})


 .nodeContent(
  function (d, i, arr, state) {
  if($scope.chartMode == 'light'){
      return `
      <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(d.data)}, ${d.depth})" style="padding-top:30px;background-color:none;margin-left:1px;height:${
        d.height
      }px;border-radius:2px;overflow:visible">
        <div style="height:${
          d.height - 32
        }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

          <img src=" ${
            d.data.hinh_anh
          }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

         <div style="margin-right:10px;margin-top:15px;float:right">${
           d.data.ma_phong_ban
         }</div>
         
         <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
           d.width - 2
         }px;border-radius:1px"></div>

         <div style="padding:20px; padding-top:35px;text-align:center">
             <div style="color:#111672;font-size:16px;font-weight:bold"> ${
               d.data.ten_nhan_vien
             } </div>
             <div style="color:#404040;font-size:16px;margin-top:4px"> ${
               d.data.vi_tri_cong_viec.ten
             } </div>
         </div>
         <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
           <div > Manages:  ${d.data._directSubordinates} 👤</div>  
           <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
         </div>
        </div>     
</div>
`;
  } else if($scope.chartMode == 'sky') {
    const colors = ['#278B8D', '#404040', '#0C5C73', '#33C6CB'];
      const color = colors[d.depth % colors.length];
      return `
      <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(d.data)}, ${d.depth})" style="background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:50px">
         <img src=" ${
           d.data.hinh_anh
         }" style="position:absolute;margin-top:5px;margin-left:${5}px;border-radius:100px;width:60px;height:60px;" />
         <div style="position:absolute;top:-15px;width:${
           d.width
         }px;text-align:center;color:#fafafa;">
               <div style="margin:0 auto;background-color:${color};display:inline-block;padding:8px;padding-bottom:0px;border-radius:5px"> ${d.data.id}</div>
        </div>

        <div style="color:#fafafa;font-size:${
          d.depth < 2 ? 16 : 12
        }px;font-weight:bold;margin-left:70px;margin-top:15px"> ${d.depth < 2 ? d.data.ten_nhan_vien : (d.data.ten_nhan_vien || '').trim()} </div>
        <div style="color:#fafafa;margin-left:70px;margin-top:5px"> ${
          d.depth < 2 ? `Phòng ban` : d.data.dia_chi_thuong_tru
        } </div>
        
         
         <div style="padding:20px; padding-top:35px;text-align:center">
            
             
         </div> 
        
         <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
           <div > Manages:  ${d.data._directSubordinates} 👤</div>  
           <div > Oversees: ${d.data._totalSubordinates} 👤</div>
         </div>
     </div>
`;
  } else{
  const svgStr = `<svg width=150 height=75  style="background-color:none"> <path d="M 0,15 L15,0 L135,0 L150,15 L150,60 L135,75 L15,75 L0,60" fill="#2599DD" stroke="#2599DD"/> </svg>`;
  return `
                      <div class="left-top" style="position:absolute;left:-10px;top:-10px">  ${svgStr}</div>
                      <div class="right-top" style="position:absolute;right:-10px;top:-10px">  ${svgStr}</div>
                      <div class="right-bottom" style="position:absolute;right:-10px;bottom:-14px">  ${svgStr}</div>
                      <div class="left-bottom" style="position:absolute;left:-10px;bottom:-14px">  ${svgStr}</div>
                      <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(d.data)}, ${d.depth})" style="font-family: 'Inter'; background-color:#040910;sans-serif; position:absolute;margin-top:-1px; margin-left:-1px;width:${
                        d.width
                      }px;height:${d.height}px;border-radius:0px;border: 2px solid #2CAAE5" >
                        
                        <div class="pie-chart-wrapper" style="margin-left:-10px;margin-top:5px;width:320px;height:300px"></div>
                      
                        <div style="color:#2CAAE5;position:absolute;right:15px;top:-20px;">
                          <div style="font-size:15px;color:#2CAAE5;margin-top:32px"> ${
                            d.data.ma_nhan_vien
                          } </div>
                          <div style="font-size:10px;"> ${
                            d.data.ten_nhan_vien || ""
                          } </div>
                          <div style="font-size:10px;"> ${
                            d.data.ma_phong_ban || ""
                          } </div>
                          ${
                            d.depth == 0
                              ? `                              <br/>
                          <div style="max-width:200px;font-size:10px;">
                            Đây là đoạn văn mô tả  <br><br>Usually it is produced in written format but it can also be done in audio or audiovisually  
                          </div>
                          
                          `
                              : `
                              
                              `
                          }
                          
                        </div>

                        <div style="position:absolute;left:-5px;bottom:10px;">
                          <div style="font-size:10px;color:#2CAAE5;margin-left:20px;margin-top:32px"> Progress </div>
                          <div style="background:blue;color:#2CAAE5;margin-left:20px;margin-top:3px;height:10px; position: relative; width:150px"> 
                            <svg width=150 height=10 style="position: absolute; top: 0; left:0">
                              <rect width=${d.data.progress}% height=10 fill=red cx=0 cy=0
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
</div>
                      
`;
}})
.nodeUpdate(
  function (d, i, arr) {
    if($scope.chartMode == 'default') {
      d3.select(this)
      .select(".node-rect")
      .attr("stroke", (d) =>
        d.data._highlighted || d.data._upToTheRootHighlighted
          ? "#14760D"
          : "none"
      )
      .attr(
        "stroke-width",
        d.data._highlighted || d.data._upToTheRootHighlighted ? 40 : 1
      );

    const pieChartWrapperNode = d3
      .select(this)
      .select(".pie-chart-wrapper")
      .node();
    const val = (d.data.ten_nhan_vien.length * 5) % 100; // Dummy calc
    // General pie chart invokation code
    new PieChart()
      .data([
        { key: "plan", color: "#6EC2EA", value: val },
        { key: "exec", color: "#0D5AAF", value: 100 - val },
      ])
      .container(pieChartWrapperNode)
      .svgHeight(200)
      .svgWidth(320)
      .marginTop(40)
      // avartar
      .image(d.data.hinh_anh)
      .backCircleColor("#1F72A7")
      .defaultFont("Inter")
      .render();
    }else{
      // console.log(d.data)
    }
  }
)
.render();



if ($scope.chartMode == "light") {
  console.log("Giá trị: ", $scope.chartMode);
  $scope.chart
    .nodeContent(function (d, r, i, state) {
      return `
 <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(
   d.data
 )}, ${d.depth})" style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
   <div style="height:${
     d.height - 32
   }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

     <img src=" ${
       d.data.hinh_anh
     }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

    <div style="margin-right:10px;margin-top:15px;float:right">${
      d.data.ma_phong_ban
    }</div>
    
    <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
      d.width - 2
    }px;border-radius:1px"></div>

    <div style="padding:20px; padding-top:35px;text-align:center">
        <div style="color:#111672;font-size:16px;font-weight:bold"> ${
          d.data.ten_nhan_vien
        } </div>
        <div style="color:#404040;font-size:16px;margin-top:4px"> ${
          d.data.vi_tri_cong_viec.ten
        } </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
      <div > Manages:  ${d.data._directSubordinates} 👤</div>  
      <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
    </div>
   </div>     
</div>
`;
    })
    
 // console.log($scope.chart.nodeContent());
} else if ($scope.chartMode == "sky") {
  $scope.chart.nodeContent(function (d, i, arr, state) {
    const colors = ["#278B8D", "#404040", "#0C5C73", "#33C6CB"];
    const color = colors[d.depth % colors.length];
    return `
 <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(
   d.data
 )}, ${d.depth})" style="background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:50px">
    <img src=" ${
      d.data.hinh_anh
    }" style="position:absolute;margin-top:5px;margin-left:${5}px;border-radius:100px;width:60px;height:60px;" />
    <div style="position:absolute;top:-15px;width:${
      d.width
    }px;text-align:center;color:#fafafa;">
          <div style="margin:0 auto;background-color:${color};display:inline-block;padding:8px;padding-bottom:0px;border-radius:5px"> ${d.data.id}</div>
   </div>

   <div style="color:#fafafa;font-size:${
     d.depth < 2 ? 16 : 12
   }px;font-weight:bold;margin-left:70px;margin-top:15px"> ${d.depth < 2 ? d.data.ten_nhan_vien : (d.data.ten_nhan_vien || "").trim()} </div>
   <div style="color:#fafafa;margin-left:70px;margin-top:5px"> ${
     d.depth < 2 ? `Phòng ban` : d.data.dia_chi_thuong_tru
   } </div>
   
    
    <div style="padding:20px; padding-top:35px;text-align:center">
       
        
    </div> 
   
    <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
      <div > Manages:  ${d.data._directSubordinates} 👤</div>  
      <div > Oversees: ${d.data._totalSubordinates} 👤</div>
    </div>
</div>
`;
  })
  
} else {
  $scope.chart
    .nodeContent(function (d, i, arr, state) {
      const svgStr = `<svg width=150 height=75  style="background-color:none"> <path d="M 0,15 L15,0 L135,0 L150,15 L150,60 L135,75 L15,75 L0,60" fill="#2599DD" stroke="#2599DD"/> </svg>`;
      return `
                 <div class="left-top" style="position:absolute;left:-10px;top:-10px">  ${svgStr}</div>
                 <div class="right-top" style="position:absolute;right:-10px;top:-10px">  ${svgStr}</div>
                 <div class="right-bottom" style="position:absolute;right:-10px;bottom:-14px">  ${svgStr}</div>
                 <div class="left-bottom" style="position:absolute;left:-10px;bottom:-14px">  ${svgStr}</div>
                 <div onclick="angular.element(this).scope().modal(${dataFlattened.result.indexOf(
                   d.data
                 )}, ${d.depth})" style="font-family: 'Inter'; background-color:#040910;sans-serif; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:0px;border: 2px solid #2CAAE5" >
                   
                   <div class="pie-chart-wrapper" style="margin-left:-10px;margin-top:5px;width:320px;height:300px"></div>
                 
                   <div style="color:#2CAAE5;position:absolute;right:15px;top:-20px;">
                     <div style="font-size:15px;color:#2CAAE5;margin-top:32px"> ${
                       d.data.ma_nhan_vien
                     } </div>
                     <div style="font-size:10px;"> ${
                       d.data.ten_nhan_vien || ""
                     } </div>
                     <div style="font-size:10px;"> ${
                       d.data.ma_phong_ban || ""
                     } </div>
                     ${
                       d.depth == 0
                         ? `                              <br/>
                     <div style="max-width:200px;font-size:10px;">
                       Đây là đoạn văn mô tả  <br><br>Usually it is produced in written format but it can also be done in audio or audiovisually  
                     </div>
                     
                     `
                         : `
                         
                         `
                     }
                     
                   </div>

                   <div style="position:absolute;left:-5px;bottom:10px;">
                     <div style="font-size:10px;color:#2CAAE5;margin-left:20px;margin-top:32px"> Progress </div>
                     <div style="background:blue;color:#2CAAE5;margin-left:20px;margin-top:3px;height:10px; position: relative; width:150px"> 
                       <svg width=150 height=10 style="position: absolute; top: 0; left:0">
                         <rect width=${
                           d.data.progress
                         }% height=10 fill=red cx=0 cy=0
                         />
                       </svg>
                     </div>
                   </div>
                 </div>
</div>
                 
`;
    })
    .nodeUpdate(function (d, i, arr) {
      if ($scope.chartMode == "default") {
        d3.select(this)
          .select(".node-rect")
          .attr("stroke", (d) =>
            d.data._highlighted || d.data._upToTheRootHighlighted
              ? "#14760D"
              : "none"
          )
          .attr(
            "stroke-width",
            d.data._highlighted || d.data._upToTheRootHighlighted
              ? 40
              : 1
          );

        const pieChartWrapperNode = d3
          .select(this)
          .select(".pie-chart-wrapper")
          .node();
        const val = (d.data.ten_nhan_vien.length * 5) % 100; // Dummy calc
        // General pie chart invokation code
        new PieChart()
          .data([
            { key: "plan", color: "#6EC2EA", value: val },
            { key: "exec", color: "#0D5AAF", value: 100 - val },
          ])
          .container(pieChartWrapperNode)
          .svgHeight(200)
          .svgWidth(320)
          .marginTop(40)
          // avartar
          .image(d.data.hinh_anh)
          .backCircleColor("#1F72A7")
          .defaultFont("Inter")
          .render();
      } else {
        // console.log(d.data)
      }
    })
    
}
