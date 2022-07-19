import React, { useEffect, useState } from 'react';
import Layouts from "./Layouts"
import './App.css';

function App() {
  const layoutsTab = [
    {
      id: 0,
      name: "echart"
    },
    {
      id: 1,
      name: "canvas"
    },
    {
      id: 2,
      name: "three"
    },
    {
      id: 3,
      name: "pixi"
    }
  ]
  const [currentTab, setCurrentTab] = useState(1)
  const clickTab = (e) => {
    setCurrentTab(e)
  }
  return (
    <Layouts currentTab={currentTab}>
      <div className='lk-layout-tab'>
        {layoutsTab?.map((item, index) => {
          return (
            <div
              style={{
                background: "rgb(" + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ")"
              }}
              key={item?.id || index}
              className='lk-layout-tab-item'
              onClick={() => { clickTab(item?.id) }}
            >
              {item?.name}
            </div>
          )
        })}
      </div>
    </Layouts>

  );
}

export default App;
