export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/history/index',
    'pages/rank/index',
    'pages/profile/index',
    'pages/success/index',
    'pages/failure/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Sudoku',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#667eea',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'Home'
      },
      {
        pagePath: 'pages/history/index',
        text: 'History'
      },
      {
        pagePath: 'pages/rank/index',
        text: 'Rank'
      },
      {
        pagePath: 'pages/profile/index',
        text: 'Profile'
      }
    ]
  }
})
