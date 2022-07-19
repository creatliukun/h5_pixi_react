import './App.css';
import React, { useEffect } from 'react';
// import BrakeBanner from './Animate';
import * as echarts from 'echarts';

function App() {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('pixi-app'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
    window.onresize = function () {
      myChart.resize();
    };
  }, [])
  return (
    <div id="pixi-app">
      {/* <header className="App-header">
        <div className='font-text'>测试字体大小</div>
      </header> */}
    </div>
  );
}

export default App;
