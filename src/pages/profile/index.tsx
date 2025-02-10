import React from 'react'
import { View } from '@tarojs/components'
import { ConfigProvider, Avatar, Cell } from '@nutui/nutui-react-taro'
import './index.scss'

interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: number;
  totalScore: number;
  rank: number;
}

function Profile() {
  // Mock data - replace with actual user data
  const userStats: UserStats = {
    gamesPlayed: 50,
    gamesWon: 35,
    bestTime: 180,
    totalScore: 5000,
    rank: 42
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <ConfigProvider>
      <View className='profile-container'>
        <View className='profile-header'>
          <Avatar
            size='large'
            icon='my'
          />
          <View className='profile-info'>
            <View className='profile-name'>Player Name</View>
            <View className='profile-rank'>Rank #{userStats.rank}</View>
          </View>
        </View>

        <View className='stats-section'>
          <View className='section-title'>统计</View>
          <Cell.Group>
            <Cell title='练习次数' description={userStats.gamesPlayed.toString()} />
            <Cell
              title='成功率'
              description={`${Math.round((userStats.gamesWon / userStats.gamesPlayed) * 100)}%`}
            />
            <Cell title='最佳时间' description={formatTime(userStats.bestTime)} />
            <Cell title='总分数' description={userStats.totalScore.toString()} />
          </Cell.Group>
        </View>

        <View className='achievements-section'>
          <View className='section-title'>成就</View>
          <Cell.Group>
            <Cell title='首次达成' description='🏆' />
            <Cell title='速度先锋' description='⚡️' />
            <Cell title='完美达成' description='⭐️' />
          </Cell.Group>
        </View>
      </View>
    </ConfigProvider>
  )
}

export default Profile
