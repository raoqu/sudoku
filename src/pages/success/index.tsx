import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Button, ConfigProvider } from '@nutui/nutui-react-taro'
import { saveGameRecord, calculateScore } from '../../utils/storage'
import { playSound } from '../../utils/sound'
import './index.scss'

function Success() {
  const router = useRouter()
  const { timeElapsed = '0', blankCount = '0', level = 'simple', completedCount = '0' } = router.params

  useEffect(() => {
    playSound('success')
    
    // Save game record
    const score = calculateScore(
      parseInt(timeElapsed),
      level,
      parseInt(blankCount),
      true
    )

    saveGameRecord({
      level,
      timeElapsed: parseInt(timeElapsed),
      blankCount: parseInt(blankCount),
      completedCount: parseInt(completedCount),
      result: 'success',
      score
    })
  }, [])

  const formatTime = (seconds: string): string => {
    const totalSeconds = parseInt(seconds)
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleNewGame = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  const score = calculateScore(
    parseInt(timeElapsed),
    level,
    parseInt(blankCount),
    true
  )

  return (
    <ConfigProvider>
      <View className='success-container'>
        <View className='success-title'>Congratulations! 🎉</View>
        <View className='success-content'>
          <View className='success-stats'>
            <View className='stat-item'>
              <View className='stat-label'>Level</View>
              <View className='stat-value level'>{level}</View>
            </View>
            <View className='stat-item'>
              <View className='stat-label'>Time</View>
              <View className='stat-value'>{formatTime(timeElapsed)}</View>
            </View>
            <View className='stat-item'>
              <View className='stat-label'>Completed</View>
              <View className='stat-value'>{completedCount}/{blankCount}</View>
            </View>
            <View className='stat-item'>
              <View className='stat-label'>Score</View>
              <View className='stat-value'>{score}</View>
            </View>
          </View>
        </View>
        <Button 
          type='primary'
          onClick={handleNewGame}
        >
          Start New Game
        </Button>
      </View>
    </ConfigProvider>
  )
}

export default Success
