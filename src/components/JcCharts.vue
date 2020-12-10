<template>
  <div class="jc-charts bg"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  name: "JcCharts",
  mixins: [],
  components: {},
  props: ["option"],
  data() {
    return {
      myChart:""
    };
  },
  computed: {},
  watch: {
    option:{
      deep:true,
      handler:function () {
        this.initCharts();
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  mounted() {
    let _this = this;
    window.onresize = function() {
      _this.initCharts()
      _this.myChart.resize();
    };
    window.addEventListener('resize', function() {
      _this.initCharts()
      _this.myChart.resize();
    })
  },
  methods: {
    initCharts() {
      this.myChart = echarts.init(this.$el);
      this.myChart.setOption(this.option, true)
    }
  }
};
</script>
<style scoped lang="scss">
.jc-charts {
  width: 100%;
  height: 100%;
}
</style>
