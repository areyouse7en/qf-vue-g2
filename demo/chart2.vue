<template lang="pug">
  chart(:data="data",:config="Config")
</template>

<script>
import Chart from "qf-vue-g2";

export default {
  name: "chart2",
  data() {
    return {
      data: [],
      defs: {
        rate: {
          alias: "完成率（%）",
          min: 0,
          max: 100
        }
      }
    };
  },
  methods: {
    Config(chart) {
      const { data, defs } = this;
      // 不要图例
      chart.legend(false);
      // 横轴自定义标签，用图片
      const avatarMap = data.map(item => {
        return item.avatar;
      });
      chart.axis("name", {
        title: null,
        labels: {
          custom: true,
          renderer: (text, item, index) => {
            return '<img src="' + avatarMap[index] + '" style="width:30px;"/>';
          }
        },
        // 不要刻度线
        tickLine: null
      });
      chart.source(data, defs);
      chart
        .interval()
        .position("name*rate")
        .color("rate")
        .label("name");
    },
    GetData() {
      setTimeout(() => {
        this.data = [
          {
            name: "Peter",
            rate: 60,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png"
          },
          {
            name: "Peter",
            rate: 70,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png"
          },
          {
            name: "Peter",
            rate: 80,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png"
          },
          {
            name: "Peter",
            rate: 90,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png"
          }
        ];
      }, 500);
    }
  },
  components: {
    Chart
  }
};
</script>
