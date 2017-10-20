import G2 from "g2"

// 创建唯一的 ID
let uniqueId = 0

function generateUniqueId() {
  return `g2-chart-${uniqueId++}`
}

export default {
  name: 'g2-chart',

  data() {
    return {
      chart: null,
      id: generateUniqueId()
    }
  },
  props: {
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
  },
  methods: {
    // 初始化图表
    InitChart() {
      const {
        id,
        width,
        height,
        forceFit,
        data,
        config
      } = this
      const chart = new G2.Chart({
        id,
        width,
        height,
        forceFit
      })
      // 把chart实例和G2反给传入的函数
      config(chart, G2)
      // 渲染
      chart.render()
      this.chart = chart
    }
  },
  watch: {
    data: function (newData, oldData) {
      // 动态图表，数据请求后才得到，所以在watch里执行初始化
      this.InitChart()
    }
  },
  mounted() {
    if (this.data.length > 0) {
      // 静态图表，加载组件的时候就有数据,直接渲染
      this.InitChart()
    }
  },
  beforeDestory() {
    // 销毁图表
    this.chart.destory()
    this.chart = null
  },
  render(createElement) {
    return createElement('div', {
      attrs: {
        id: this.id
      }
    })
  }
}