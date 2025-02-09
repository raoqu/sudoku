import React from 'react'
import { View } from '@tarojs/components'
import { Button, ConfigProvider } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

interface GameStats {
  level: string;
  timeElapsed: number;
  completedCount: number;
}

function Failure() {
  const stats = Taro.getCurrentInstance().router?.params as unknown as GameStats;
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTryAgain = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    });
  };

  return (
    <ConfigProvider>
      <View className='failure-container'>
        <View className='failure-content'>
          <View className='failure-title'>Game Over</View>
          <View className='failure-emoji'>😢</View>
          
          <View className='stats-container'>
            <View className='stat-item'>
              <View className='stat-label'>Level</View>
              <View className='stat-value'>{stats.level}</View>
            </View>
            
            <View className='stat-item'>
              <View className='stat-label'>Time Played</View>
              <View className='stat-value'>{formatTime(stats.timeElapsed)}</View>
            </View>
            
            <View className='stat-item'>
              <View className='stat-label'>Numbers Completed</View>
              <View className='stat-value'>{stats.completedCount}</View>
            </View>
          </View>

          <View className='message'>
            Don't give up! You can do better next time.
          </View>

          <Button 
            type='primary' 
            className='try-again-button'
            onClick={handleTryAgain}
          >
            Try Again
          </Button>
        </View>
      </View>
    </ConfigProvider>
  )
}

export default Failure
