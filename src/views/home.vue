<template>
  <div class="main">
<!--    <dv-full-screen-container>-->
      <div id="container"></div>
<!--    </dv-full-screen-container>-->
  </div>
</template>

<script>
// @ is an alias to /src
import AMap from "AMap";

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  mounted() {
    const list = [
      {
        center: [117.709362, 39.026031],
        name: "天津经济技术开发区",
        img: "11.jpg"
      },
      {
        center: [117.719695, 39.033411],
        name: "南开大学",
        img: "11.jpg"
      },
      {
        center: [117.703022, 39.02276],
        name: "滨海新区政府",
        img: "11.jpg"
      },
      {
        center: [117.763101, 39.023769],
        name: "泰达金融广场",
        img: "11.jpg"
      }
    ];
    let map;
    // 区域搜索配置
    let districtSearchOpts = {
      subdistrict: 0,
      extensions: "all",
      level: "district"
    };
    let mapOpts = {
      center: [117.708418, 39.027768],
      disableSocket: true,
      viewMode: "3D", //开启3D视图,默认为关闭
      showLabel: false, //是否展示地图文字和 POI 信息
      labelzIndex: 130, //地图标注显示顺序，大于110即可将底图上的默认标注显示在覆盖物（圆、折线、面）之上
      pitch: 50, //俯仰角度，默认0，[0,83]，2D地图下无效
      zoom: 18, //地图显示的缩放级别 17
      resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
      rotateEnable: true, //地图是否可旋转，3D视图默认为true，2D视图默认false
      pitchEnable: true, //是否允许设置俯仰角度，3D视图下为true，2D视图下无效
      // rotation:-15, //地图顺时针旋转角度，取值范围 [0-360]，默认值：0
      expandZoomRange: true, //是否支持可以扩展最大缩放级别,和zooms属性配合使用
      zooms: [3, 20],
      buildingAnimation: true //楼块出现和消失的时候是否显示动画过程，3D视图有效，PC端默认true，手机端默认false
      // layers:[
      //   new AMap.TileLayer.RoadNet({
      //rejectMapMask:true
      // }),
      //new AMap.TileLayer.Satellite()
      //]
    };

    //利用行政区查询获取边界构建mask路径
    //也可以直接通过经纬度构建mask路径
    let district = new AMap.DistrictSearch(districtSearchOpts);
    district.search("滨海新区", function(status, result) {
      let bounds = result.districtList[0].boundaries;
      let mask = [];
      for (let i = 0; i < bounds.length; i++) {
        mask.push([bounds[i]]);
      }
      mapOpts.mask = mask;
      map = new AMap.Map("container", mapOpts);
      console.log(map.getZoom());
      map.clearMap(); // 清除地图覆盖物
      // let maskerIn = new AMap.Marker({
      //   position:[116.501415,39.926055],
      //   map:map
      // })
      // let maskerOut = new AMap.Marker({//区域外的不会显示
      //   position:[117.001415,39.926055],
      //   map:map
      // })
      //添加高度面 Object3DLayer用于承载Object3D对象的图层，继承了一般图层的通用属性和属性的set get方法
      let object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
      map.add(object3Dlayer);
      let height = -8000;
      let color = "#0088ffcc"; //rgba
      let wall = new AMap.Object3D.Wall({
        path: bounds,
        color: color
      });
      wall.transparent = true;
      // 平面图层
      object3Dlayer.add(wall);
      // 高度图层
      object3Dlayer.add(
        new AMap.Object3D.Wall({
          path: bounds,
          height: height,
          color: color
        })
      );
      //添加描边
      for (let i = 0; i < bounds.length; i++) {
        new AMap.Polyline({
          path: bounds[i],
          strokeColor: "#99ffff",
          strokeWeight: 4,
          map: map
        });
      }
      //主体样式
      map.setMapStyle("amap://styles/darkblue");
      // 控制器
      map.addControl(
        new AMap.ControlBar({
          showZoomBar: false,
          showControlButton: true,
          position: {
            right: "10px",
            top: "10px"
          }
        })
      );
      // 添加点位
      let markers = []; // 点位列表
      list.forEach((item, index) => {
        // 构造点标记
        let marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: item.center
        });
        // marker.content= `
        //   <div>
        // 		<img src="${item.img}" alt="">
        // 		<div>
        // 			<span>名字：</span><span>${item.name}</span>
        // 		</div>
        // 		<button onclick="lookVideoGo('${item.name}')">查看</button>
        // 	</div>
        //   `,
        markers.push(marker);
        // marker.on('click', newMAp);

        //
        var infoWindow = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          content: `
          <div style="background: #fff;">
            <div onclick="closeInfoWindow()">x</div>
            <img src="${item.img}" alt="">
            <div>
              <span>名字：</span>
              <span>${item.name}</span>
            </div>
            <button onclick="lookVideoGo('${item.name}')">查看</button>
          </div>
          `,
          offset: new AMap.Pixel(0, -30)
        });
        //鼠标点击marker弹出自定义的信息窗体
        AMap.event.addListener(marker, "click", function() {
          infoWindow.open(map, marker.getPosition());
        });
      });

      map.add(markers);
      // map.setFitView();
    });

    function newMAp(e) {
      console.log(e);
      var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
      infoWindow.setContent(e.target.content);
      infoWindow.open(map, e.target.getPosition());
    }
    function lookVideoGo(name) {
      console.log(name);
    }
    function closeInfoWindow() {
      map.clearInfoWindow();
    }
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.home {
  height: 100%;
}

#container {
  width: 100%;
  height: 100%;
}
</style>
