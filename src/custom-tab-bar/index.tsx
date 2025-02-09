import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Icon } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

interface TabItem {
  pagePath: string
  text: string
  icon: string
}

const tabList: TabItem[] = [
  {
    pagePath: '/pages/index/index',
    text: 'Home',
    icon: 'home'
  },
  {
    pagePath: '/pages/history/index',
    text: 'History',
    icon: 'clock'
  },
  {
    pagePath: '/pages/rank/index',
    text: 'Rank',
    icon: 'ranking'
  },
  {
    pagePath: '/pages/profile/index',
    text: 'Profile',
    icon: 'my'
  }
]

export default function CustomTabBar() {
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const pages = Taro.getCurrentPages()
    const page = pages[pages.length - 1]
    const path = '/' + page.route
    const index = tabList.findIndex(item => item.pagePath === path)
    if (index !== -1) {
      setSelected(index)
    }
  }, [])

  const switchTab = (index: number) => {
    const item = tabList[index]
    if (selected !== index) {
      Taro.switchTab({
        url: item.pagePath
      })
      setSelected(index)
    }
  }

  return (
    <View className='tab-bar'>
      {tabList.map((item, index) => {
        return (
          <View
            key={index}
            className={`tab-bar-item ${selected === index ? 'selected' : ''}`}
            onClick={() => switchTab(index)}
          >
            <Icon 
              name={item.icon}
              size='20'
              color={selected === index ? '#667eea' : '#666666'}
            />
            <View className='tab-bar-text'>{item.text}</View>
          </View>
        )
      })}
    </View>
  )
}
