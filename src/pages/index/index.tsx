import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, ConfigProvider, Dialog } from '@nutui/nutui-react-taro'
import { generateSudoku, Board, Cell, Difficulty, isBoardComplete } from '../../utils/sudoku'
import './index.scss'

function Index() {
  const [board, setBoard] = useState<Board>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('simple');
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const startNewGame = () => {
    const newBoard = generateSudoku(difficulty);
    setBoard(newBoard);
    setShowSuccess(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (!board[row][col].fixed) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = (num: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      if (!board[row][col].fixed) {
        const newBoard = [...board];
        newBoard[row][col] = { ...newBoard[row][col], value: num };
        setBoard(newBoard);

        if (isBoardComplete(newBoard)) {
          setShowSuccess(true);
        }
      }
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <ConfigProvider>
      <View className='sudoku-container'>
        <View className='difficulty-buttons'>
          <Button
            type={difficulty === 'simple' ? 'primary' : 'default'}
            onClick={() => handleDifficultyChange('simple')}
          >
            Simple
          </Button>
          <Button
            type={difficulty === 'middle' ? 'primary' : 'default'}
            onClick={() => handleDifficultyChange('middle')}
          >
            Middle
          </Button>
          <Button
            type={difficulty === 'hard' ? 'primary' : 'default'}
            onClick={() => handleDifficultyChange('hard')}
          >
            Hard
          </Button>
        </View>

        <View className='sudoku-board'>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} className='sudoku-row'>
              {row.map((cell: Cell, colIndex) => (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${cell.fixed ? 'fixed' : ''} ${
                    selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex ? 'selected' : ''
                  }`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell.value !== 0 ? cell.value : ''}
                </View>
              ))}
            </View>
          ))}
        </View>

        <View className='number-pad'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberInput(num)}
              type='default'
              className='number-button'
            >
              {num}
            </Button>
          ))}
        </View>

        <Button type='primary' onClick={startNewGame} className='new-game-button'>
          New Game
        </Button>

        <Dialog
          visible={showSuccess}
          title="Congratulations!"
          content="You've completed the Sudoku puzzle!"
          onConfirm={() => {
            setShowSuccess(false);
            startNewGame();
          }}
        />
      </View>
    </ConfigProvider>
  )
}

export default Index
