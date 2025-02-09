import React from 'react'
import { View } from '@tarojs/components'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import './index.scss'

interface GameRecord {
  date: string;
  level: string;
  timeElapsed: number;
  result: 'success' | 'fail';
  score: number;
}

function History() {
  // Mock data - replace with actual data storage
  const gameHistory: GameRecord[] = [
    {
      date: '2025-02-09',
      level: 'simple',
      timeElapsed: 300,
      result: 'success',
      score: 100
    },
    {
      date: '2025-02-09',
      level: 'middle',
      timeElapsed: 450,
      result: 'fail',
      score: 50
    }
  ];

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <ConfigProvider>
      <View className='history-container'>
        <View className='history-title'>Game History</View>
        <View className='history-list'>
          {gameHistory.map((record, index) => (
            <View key={index} className={`history-item ${record.result}`}>
              <View className='history-item-header'>
                <View className='history-item-date'>{record.date}</View>
                <View className='history-item-result'>{record.result}</View>
              </View>
              <View className='history-item-details'>
                <View className='detail-row'>
                  <View className='detail-label'>Level:</View>
                  <View className='detail-value'>{record.level}</View>
                </View>
                <View className='detail-row'>
                  <View className='detail-label'>Time:</View>
                  <View className='detail-value'>{formatTime(record.timeElapsed)}</View>
                </View>
                <View className='detail-row'>
                  <View className='detail-label'>Score:</View>
                  <View className='detail-value'>{record.score}</View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ConfigProvider>
  )
}

export default History
