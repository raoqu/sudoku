import React from 'react'
import { View } from '@tarojs/components'
import { Button, ConfigProvider } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

interface GameStats {
  blankCount: number;
  timeElapsed: number;
  level: string;
}

function Success() {
  const stats = Taro.getCurrentInstance().router?.params as unknown as GameStats;
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleNewGame = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    });
  };

  return (
    <ConfigProvider>
      <View className='success-container'>
        <View className='success-content'>
          <View className='success-title'>Congratulations!</View>
          <View className='success-trophy'>🏆</View>
          
          <View className='stats-container'>
            <View className='stat-item'>
              <View className='stat-label'>Level</View>
              <View className='stat-value'>{stats.level}</View>
            </View>
            
            <View className='stat-item'>
              <View className='stat-label'>Time</View>
              <View className='stat-value'>{formatTime(stats.timeElapsed)}</View>
            </View>
            
            <View className='stat-item'>
              <View className='stat-label'>Filled Numbers</View>
              <View className='stat-value'>{stats.blankCount}</View>
            </View>
          </View>

          <Button 
            type='primary' 
            className='new-game-button'
            onClick={handleNewGame}
          >
            Start New Game
          </Button>
        </View>
      </View>
    </ConfigProvider>
  )
}

export default Success
