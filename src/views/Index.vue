<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div id="mybar" ref="mybar" style="height: 400px; width: 600px"></div>
      </el-col>
      <el-col :span="12">
        <div id="myangar" ref="myangar" style="height: 400px; width: 600px"></div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <div id="myfunnel" ref="myfunnel" style="height: 400px; width: 600px"></div>
      </el-col>
      <el-col :span="12">
        <div id="mygauge" ref="mygauge" style="height: 400px; width: 600px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import echarts from "echarts";
export default {
  created: function() {
    // 生命周期，数据初始化，Dom节点未挂载
  },
  mounted: function() {
    this.drawBar();
    this.drawAngar();
    this.drawFunnel();
    this.drawGauge();
  },
  methods: {
    drawBar: function() {
      // 1. 基于准备好的dom，初始化echarts实例
      const mycharts = echarts.init(this.$refs.mybar);
      // 设置加载时候的动画
      mycharts.showLoading();
      setTimeout(() => {
        // 2. 指定图表的配置项和数据
        let option = {
          title: {
            text: "商品销量"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        };
        // 隐藏loading提示框
        mycharts.hideLoading();
        // 3. 使用刚指定的配置项和数据显示图表。
        mycharts.setOption(option);
      }, 1000);
    },
    drawAngar: function() {
      const mycharts = echarts.init(this.$refs.myangar);

      let option = {
        // backgroundColor: "rgb(187, 187, 187)",
        title: {
          text: "访问统计",
          // subtext: "纯属虚构",
          x: "center"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ],
            roseType: "angle"
          }
        ]
      };

      mycharts.setOption(option);
    },
    drawFunnel: function() {
      const mycharts = echarts.init(this.$refs.myfunnel);

      let option = {
        title: {
          text: "漏斗图"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%"
        },
        legend: {
          data: ["展现", "点击", "访问", "咨询", "订单"]
        },
        series: [
          {
            name: "漏斗图",
            type: "funnel",
            left: "10%",
            top: 60,
            //x2: 80,
            bottom: 60,
            width: "80%",
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 60, name: "访问" },
              { value: 40, name: "咨询" },
              { value: 20, name: "订单" },
              { value: 80, name: "点击" },
              { value: 100, name: "展现" }
            ]
          }
        ]
      };

      mycharts.setOption(option);
    },
    drawGauge: function() {
      const mycharts = echarts.init(this.$refs.mygauge);

      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: 50, name: "完成率" }]
          }
        ]
      };

      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        mycharts.setOption(option, true);
      }, 2000);
    }
  }
};
</script>

<style>
</style>
