# A plugin for integrating G2 to Vue
我只是G2的搬运工

### 用法
安装依赖
```
npm i -S vue G2 qf-vue-g2
或
cnpm i -S vue G2 qf-vue-g2
```
引用
``` javascript
import Vue from 'vue'
import Chart from 'qf-vue-g2'
```

### 配置项
```javaacript
{
  // 宽
  width: {
    type: Number | String,
    default: 300
  },
  // 高
  height: {
    type: Number | String,
    default: 300
  },
  // 强制全宽，这时候设置width是无效的
  forceFit: {
    type: Boolean,
    default: true
  },
  // 源数据
  data: {
    type: Array,
    default: []
  },
  // 渲染前的配置函数，可设置legend、axis等。接收参数（chart，frame）
  config: {
    type: Function
  }
}
```

#### Config函数
默认接收chart实例和G2对象，在这里写render之前的配置方法
举个栗子（demo文件夹内）
```
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

```
