import Taro from '@tarojs/taro'

export const playSound = async (type: 'success' | 'error' | 'fail') => {
  const soundMap = {
    success: 'https://raoqu.cc/success.mp3',
    error: 'https://raoqu.cc/error.mp3',
    fail: 'https://raoqu.cc/fail.mp3'
  };

  try {
    const innerAudioContext = Taro.createInnerAudioContext();
    innerAudioContext.src = soundMap[type];
    innerAudioContext.play();
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
};
