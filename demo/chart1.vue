<template lang="pug">
  chart(:data="data",:config="Config")
</template>

<script>
import Chart from "qf-vue-g2";

export default {
  name: "chart1",
  data() {
    return {
      data: [],
      defs: {
        date: {
          type: "timeCat",
          alias: "月份",
          mask: "m"
        },
        number: {
          alias: "数量"
        }
      }
    };
  },
  methods: {
    Config(chart, { Frame }) {
      const { data, defs } = this;
      let frame = new Frame(data);
      // 合并列
      frame = Frame.combineColumns(frame, ["aim", "finish"], "number", "type");
      chart.source(frame, defs);
      chart
        .line()
        .position("date*number")
        .color("type")
        .shape("type", val => {
          if (val == "aim") {
            return "line";
          } else {
            return "dash";
          }
        });
    },
    GetData() {
      setTimeout(() => {
        this.data = [
          {
            aim: 100,
            finish: 10,
            date: "2017-01-01"
          },
          {
            aim: 90,
            finish: 20,
            date: "2017-02-01"
          },
          {
            aim: 100,
            finish: 30,
            date: "2017-03-01"
          },
          {
            aim: 100,
            finish: 60,
            date: "2017-04-01"
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
