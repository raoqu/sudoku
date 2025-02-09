import { PropsWithChildren } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import '@nutui/nutui-react-taro/dist/style.css'
// 全局样式
import './app.scss'

const App: React.FC<PropsWithChildren> = ({ children }) => {
  useDidShow(() => {
    console.log('App show')
  })

  useDidHide(() => {
    console.log('App hide')
  })

  return (
    <ConfigProvider>
      {children}
    </ConfigProvider>
  )
}

export default App
