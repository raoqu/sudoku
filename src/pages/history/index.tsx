import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { ConfigProvider, Empty, Button } from '@nutui/nutui-react-taro'
import { getGameHistory, clearGameHistory, GameRecord } from '../../utils/storage'
import './index.scss'

function History() {
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load history whenever the page is shown
  useDidShow(() => {
    loadHistory();
  });

  const loadHistory = () => {
    const history = getGameHistory();
    setGameHistory(history);
  };

  const handleClearHistory = () => {
    clearGameHistory();
    loadHistory();
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (gameHistory.length === 0) {
    return (
      <ConfigProvider>
        <View className='history-container'>
          <View className='history-title'>Game History</View>
          <Empty description='No games played yet' />
        </View>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider>
      <View className='history-container'>
        <View className='history-header'>
          <View className='history-title'>Game History</View>
          <Button 
            type='danger'
            size='small'
            onClick={handleClearHistory}
          >
            Clear History
          </Button>
        </View>

        <View className='history-list'>
          {gameHistory.map((record) => (
            <View key={record.id} className={`history-item ${record.result}`}>
              <View className='history-item-header'>
                <View className='history-item-date'>{formatDate(record.date)}</View>
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

                <View className='detail-row'>
                  <View className='detail-label'>Numbers Filled:</View>
                  <View className='detail-value'>{record.completedCount} / {record.blankCount}</View>
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
