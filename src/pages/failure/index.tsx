import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Button } from '@nutui/nutui-react-taro'
import { saveGameRecord } from '../../utils/storage'
import { playSound } from '../../utils/sound'
import './index.scss'

function Failure() {
  const router = useRouter()
  const { timeElapsed = '0', blankCount = '0', level = 'simple', completedCount = '0' } = router.params

  useEffect(() => {
    playSound('fail')
    
    // Save game record
    saveGameRecord({
      level,
      timeElapsed: parseInt(timeElapsed),
      blankCount: parseInt(blankCount),
      completedCount: parseInt(completedCount),
      result: 'fail',
      score: 0
    })
  }, [])

  const formatTime = (seconds: string): string => {
    const totalSeconds = parseInt(seconds)
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleTryAgain = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  return (
    <View className='failure-container'>
      <View className='failure-content'>
        <View className='failure-title'>Game Over</View>
        <View className='failure-message'>Don't give up! Try again!</View>
        <View className='failure-stats'>
          <View className='stat-item'>
            <View className='stat-label'>Level</View>
            <View className='stat-value'>{level}</View>
          </View>
          <View className='stat-item'>
            <View className='stat-label'>Time Played</View>
            <View className='stat-value'>{formatTime(timeElapsed)}</View>
          </View>
          <View className='stat-item'>
            <View className='stat-label'>Completed</View>
            <View className='stat-value'>{completedCount} / {blankCount}</View>
          </View>
        </View>
        <Button 
          type='primary'
          className='try-again-button'
          onClick={(e) => {
            if (process.env.TARO_ENV === 'weapp') {
              handleTryAgain()
            } else {
              Taro.atMessage({
                'message': 'Try Again',
                'type': 'warning',
              })
            }
          }}
        >
          Try Again
        </Button>
      </View>
    </View>
  )
}

export default Failure
