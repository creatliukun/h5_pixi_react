import React from 'react'

import './index.css'

import EchartComp from '../View/echart'
import CanvasComp from '../View/canvas'
import ThreeJsComp from '../View/threeJs'
import PixiComp from '../View/pixi'

export default function index(props) {
    const { children, currentTab } = props

    const ShowComponent = (props) => {
        const { currentTab } = props
        return (
            <>
                {currentTab === 0 && <EchartComp />}
                {currentTab === 1 && <CanvasComp />}
                {currentTab === 2 && <ThreeJsComp />}
                {currentTab === 3 && <PixiComp />}
            </>
        )

    }

    return (
        <div className='lk-layout-main'>
            <ShowComponent currentTab={currentTab} />
            {children}
        </div>
    )
}
