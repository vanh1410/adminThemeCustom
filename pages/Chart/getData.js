app.controller(
  "orgChart",
  function ($scope, $timeout) {
    $scope.chartMode = "default";
    $scope.render = (chartMode) => {
      $scope.chartMode = chartMode;
      $scope.chart.render()
      console.log(chartMode);
      // $scope.chart.update()
    }
    $scope.reRender = () => {
      $scope.chart.render()
    }
    var chart;
    // d3.csv(
    //   "https://docs.google.com/spreadsheets/d/1gayOeN0oajTHs8bHU6DK-dp4aMiQ1Y8e6twc3tolhbI/export?format=csv"
    // )
    // d3.json("http://localhost:3000/data")
    d3.json(
      "https://extapi01.herokuapp.com/v1/users/chart"
    )
      // d3.json("http://localhost:2022/result")
      .then((dataFlattened) => {
        console.log("Tai lieu get ve: ",dataFlattened);
        $scope.dataFlattened = dataFlattened.data;
        dataFlattened.result.forEach((d) => {
          d.ten_phong_ban = d.phong_ban.ten;
          d.ma_phong_ban = d.phong_ban.ma;
        });
        const groupByMa = _.indexBy(dataFlattened.result, "ma_phong_ban");
        const groupByTen = _.indexBy(dataFlattened.result, "ten_phong_ban");
        const keysOfMa = Object.keys(groupByMa);
        const keysOfTen = Object.keys(groupByTen);
        console.log(keysOfMa);
        console.log(keysOfTen);
        keysOfMa.forEach((key, i) => {
          const item = {
            ma_nhan_vien: key,
            ten_nhan_vien: keysOfTen[i],
            ma_phong_ban: 1,
            vi_tri_cong_viec: {
              ma: key,
              ten: keysOfTen[i],
            },
            hinh_anh:
              "https://anhdepfree.com/wp-content/uploads/2020/10/mua-he-den-nang-vang-tren-bai-bien.jpg",
          };
          dataFlattened.result.push(item);
        });
        const itemRoot = {
          ten_nhan_vien: "Công ty XYZ",
          ma_nhan_vien: 1,
          ma_phong_ban: "",
          vi_tri_cong_viec: {
            ma: 1,
            ten: "Công ty XYZ",
          },
          hinh_anh:
            "https://anhdepfree.com/wp-content/uploads/2020/10/mua-he-den-nang-vang-tren-bai-bien.jpg",
        };
        dataFlattened.result.push(itemRoot);
        dataFlattened.result.forEach((d) => {
          (d.id = d.ma_nhan_vien), (d.parentId = d.ma_phong_ban);
          d.progress = Math.random() * 100;
        });
        console.log(dataFlattened.result);
        //SETUP DESIGN
        // $interval(function () {

        $scope.chart = new d3.OrgChart()
          .container(".chart-container")
          .svgHeight(`${900}`)
          .data(dataFlattened.result)
          .nodeHeight((d) => 170)
          .nodeWidth((d) => {
            if (d.depth == 0) return 500;
            return 330;
          })
          .childrenMargin((d) => 90)
          .compactMarginBetween((d) => 65)
          .compactMarginPair((d) => 100)
          .neightbourMargin((a, b) => 50)
          .siblingsMargin((d) => 100)
          .buttonContent(({ node, state }) => {
            return `<div style="color:#2CAAE5;border-radius:5px;padding:3px;font-size:10px;margin:auto auto;background-color:#040910;border: 1px solid #2CAAE5"> <span style="font-size:9px">${
              node.children
                ? `<i class="fas fa-angle-up"></i>`
                : `<i class="fas fa-angle-down"></i>`
            }</span> ${node.data._directSubordinates}  </div>`;
          })
          .linkUpdate(function (d, i, arr) {
            d3.select(this)
              .attr("stroke", (d) =>
                d.data._upToTheRootHighlighted ? "#14760D" : "#FFB90F"
              )
              .attr("stroke-width", (d) =>
                d.data._upToTheRootHighlighted ? 15 : 1
              );

            if (d.data._upToTheRootHighlighted) {
              d3.select(this).raise();
            }
          })

        // CONTENT CUSTOM
        
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

        // }, 5000)
        console.log(new d3.OrgChart());
        // console.log($scope.chart.nodeUpdate());
        $scope.modal = (index, depth) => {
          $timeout(function () {
            $scope.userModal = {
              index,
              ma_nhan_vien: dataFlattened.result[index].ma_nhan_vien,
              ten_nhan_vien: dataFlattened.result[index].ten_nhan_vien,
              hinh_anh: dataFlattened.result[index].hinh_anh,
              gioi_tinh: dataFlattened.result[index].gioi_tinh,
              dia_chi_thuong_tru:
                dataFlattened.result[index].dia_chi_thuong_tru,
              dien_thoai: dataFlattened.result[index].dien_thoai,
              phong_ban: dataFlattened.result[index].ten_phong_ban,
              vi_tri_cong_viec:
                dataFlattened.result[index].vi_tri_cong_viec.ten,
            };
            console.log($scope.userModal.ten_nhan_vien);
            console.log(index);

            angular
              .element(document.querySelector(".userModal"))
              .removeClass("ng-hide");
          }, 200);
        };
        $scope.close = () => {
          angular
            .element(document.querySelector(".userModal"))
            .addClass("ng-hide");
        };
        $scope.refresh = () => {
          console.log("test");
        };
        const url = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QMaAyMA1SdmlAAAAVRJREFUeNrt26FOw2AUhuFTElzrETNLMNPtJVRVVFbtlnYXKGQFqldANo3EoLDUITazzCxBTNBk53lv4M+XJ/ndKZ52L9uft9eP+Oeqbtgs8O7+cbWO36/PiIgmwd4ojsdIU9n2l7XzNBYZNj9Eos6oTRbcdMAZAwxYgAVYgAVYgAUYsAALsAALsAALMGABFmABFmABFmABBizAAqwFgZ/fv+slHl7q3aobNpn2proujIgo276ep/HgixZgARZgARZgAQYswAIswAIswAIswIAFWIAFWIAFWIABC7AAC7AAC7D+AHZdeN97XRf6ogVYgAVYgAVYgAELsAALsAALsAADFmABFmABFmABFmDAAizAAizAAqxrYNeF973XdaEvWoAFWIAFWIAFGLAAC7AAC7AACzBgARZgARZgARZgAQYswAIswAKsW0p1m1S2/WXtPI1Fhs0nxU1Jj2yxm2sAAAAASUVORK5CYII=`;
        const replaced = url.replace(/(\r\n|\n|\r)/gm);
        d3.select(".svg-chart-container")
          .style(
            "background",
            'radial-gradient(circle at center, #04192B 0, #000B0E 100%) url("https://raw.githubusercontent.com/bumbeishvili/coronavirus.davidb.dev/master/glow.png")'
          )
          .style(
            "background-image",
            `url(${replaced}), radial-gradient(circle at center, #04192B 0, #000B0E 100%)`
          );
      });

    $scope.downloadPdf = function () {
      console.log("export PDF");
      $scope.chart.exportImg({
        save: false,
        onLoad: (base64) => {
          var pdf = new jspdf.jsPDF();
          var img = new Image();
          img.src = base64;
          img.onload = function () {
            pdf.addImage(
              img,
              "JPEG",
              5,
              5,
              595 / 3,
              ((img.height / img.width) * 595) / 3
            );
            pdf.save("chart.pdf");
          };
        },
      });
    };
  }
);

app.controller("chartLight", function ($scope) {
  var chart;
  // d3.csv(
  //   'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
  // )
  d3.json("http://localhost:3000/data").then((dataFlattened) => {
    $scope.chart = new d3.OrgChart()
      .container(".chart-container")
      .data(dataFlattened)
      .nodeHeight((d) => 70)
      .nodeWidth((d) => {
        if (d.depth == 0) return 250;
        if (d.depth == 1) return 220;
        return 140;
      })
      .childrenMargin((d) => 50)
      .compactMarginBetween((d) => 35)
      .compactMarginPair((d) => 30)
      .neightbourMargin((a, b) => 20)
      .buttonContent(({ node, state }) => {
        return `<div style="border-radius:3px;padding:3px;font-size:10px;margin:auto auto;background-color:lightgray"> <span style="font-size:9px">${
          node.children
            ? `<i class="fas fa-chevron-up"></i>`
            : `<i class="fas fa-chevron-down"></i>`
        }</span> ${node.data._directSubordinates}</div>`;
      })
      .nodeContent(function (d, i, arr, state) {
        const colors = ["#278B8D", "#404040", "#0C5C73", "#33C6CB"];
        const color = colors[d.depth % colors.length];
        return `
            <div onclick="angular.element(this).scope().modal(${dataFlattened.indexOf(
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
              }px;font-weight:bold;margin-left:70px;margin-top:15px"> ${d.depth < 2 ? d.data.name : (d.data.name || "").trim().split(/\s+/g)[0]} </div>
              <div style="color:#fafafa;margin-left:70px;margin-top:5px"> ${
                d.depth < 2 ? d.data.dia_chi_thuong_tru : d.data.area
              } </div>
              
               <!--
               <div style="padding:20px; padding-top:35px;text-align:center">
                  
                   
               </div> 
              
               <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                 <div > Manages:  ${d.data._directSubordinates} 👤</div> 
                 <div > Oversees: ${d.data._totalSubordinates} 👤</div>   
               </div>
               -->
           </div>
  `;
      })
      .render();
  });
});
app.controller("skyChart", function ($scope) {
  var chart;

  d3.csv(
    "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
  ).then((dataFlattened) => {
    $scope.chart = new d3.OrgChart()
      .container(".chart-container")
      .data(dataFlattened)
      .nodeWidth((d) => 250)
      .initialZoom(0.7)
      .nodeHeight((d) => 175)
      .childrenMargin((d) => 40)
      .compactMarginBetween((d) => 15)
      .compactMarginPair((d) => 80)
      .nodeContent(function (d, i, arr, state) {
        return `
            <div style="padding-top:30px;background-color:none;margin-left:1px;height:${
              d.height
            }px;border-radius:2px;overflow:visible">
              <div style="height:${
                d.height - 32
              }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

                <img src=" ${
                  d.data.hinh_anh
                }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

               <div style="margin-right:10px;margin-top:15px;float:right">${
                 d.data.id
               }</div>
               
               <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
                 d.width - 2
               }px;border-radius:1px"></div>

               <div style="padding:20px; padding-top:35px;text-align:center">
                   <div style="color:#111672;font-size:16px;font-weight:bold"> ${
                     d.data.name
                   } </div>
                   <div style="color:#404040;font-size:16px;margin-top:4px"> ${
                     d.data.positionName
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
      .render();
  });
});
