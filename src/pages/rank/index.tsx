import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { ConfigProvider, Tabs } from '@nutui/nutui-react-taro'
import './index.scss'

interface RankItem {
  rank: number;
  name: string;
  score: number;
  level: string;
  bestTime: number;
}

function Rank() {
  const [activeTab, setActiveTab] = useState('1');

  // Mock data - replace with actual data
  const rankData: Record<string, RankItem[]> = {
    simple: [
      { rank: 1, name: 'Player 1', score: 1000, level: 'simple', bestTime: 180 },
      { rank: 2, name: 'Player 2', score: 950, level: 'simple', bestTime: 200 },
      { rank: 3, name: 'Player 3', score: 900, level: 'simple', bestTime: 220 }
    ],
    middle: [
      { rank: 1, name: 'Player 4', score: 1500, level: 'middle', bestTime: 300 },
      { rank: 2, name: 'Player 5', score: 1450, level: 'middle', bestTime: 320 },
      { rank: 3, name: 'Player 6', score: 1400, level: 'middle', bestTime: 340 }
    ],
    hard: [
      { rank: 1, name: 'Player 7', score: 2000, level: 'hard', bestTime: 450 },
      { rank: 2, name: 'Player 8', score: 1950, level: 'hard', bestTime: 470 },
      { rank: 3, name: 'Player 9', score: 1900, level: 'hard', bestTime: 490 }
    ]
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderRankList = (level: 'simple' | 'middle' | 'hard') => {
    return (
      <View className='rank-list'>
        {rankData[level].map((item, index) => (
          <View key={index} className={`rank-item rank-${item.rank}`}>
            <View className='rank-number'>{item.rank}</View>
            <View className='rank-info'>
              <View className='rank-name'>{item.name}</View>
              <View className='rank-details'>
                <View className='rank-score'>Score: {item.score}</View>
                <View className='rank-time'>Best Time: {formatTime(item.bestTime)}</View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ConfigProvider>
      <View className='rank-container'>
        <View className='rank-title'>Leaderboard</View>
        <Tabs 
          value={activeTab}
          onChange={({ value }) => setActiveTab(value)}
        >
          <Tabs.TabPane title='Simple' value='1'>
            {renderRankList('simple')}
          </Tabs.TabPane>
          <Tabs.TabPane title='Middle' value='2'>
            {renderRankList('middle')}
          </Tabs.TabPane>
          <Tabs.TabPane title='Hard' value='3'>
            {renderRankList('hard')}
          </Tabs.TabPane>
        </Tabs>
      </View>
    </ConfigProvider>
  )
}

export default Rank
