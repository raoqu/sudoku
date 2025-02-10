import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { generateSudoku, Board, Cell, Difficulty, isBoardComplete } from '../../utils/sudoku'
import { playSound } from '../../utils/sound'
import Taro, { eventCenter } from '@tarojs/taro'
import './index.scss'

interface CellError {
  row: number;
  col: number;
  value: number;
}

function Index() {
  const [board, setBoard] = useState<Board>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>('simple');
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [blankCount, setBlankCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [cellErrors, setCellErrors] = useState<CellError[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const MAX_ERRORS = 3;

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const startNewGame = () => {
    const newBoard = generateSudoku(difficulty);
    setBoard(newBoard);
    setStartTime(Date.now());
    setErrorCount(0);
    setCellErrors([]);
    setCompletedCount(0);
    
    // Count blank cells
    let blanks = 0;
    newBoard.forEach(row => {
      row.forEach(cell => {
        if (!cell.fixed) blanks++;
      });
    });
    setBlankCount(blanks);
  };

  const isValidMove = (row: number, col: number, value: number): boolean => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (x !== col && board[row][x].value === value) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (x !== row && board[x][col].value === value) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const currentRow = boxRow + i;
        const currentCol = boxCol + j;
        if (currentRow !== row && currentCol !== col && 
            board[currentRow][currentCol].value === value) {
          return false;
        }
      }
    }

    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (!board[row][col].fixed) {
      setSelectedCell([row, col]);
    }
  };

  const handleNumberInput = async (num: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      if (!board[row][col].fixed) {
        if (isValidMove(row, col, num)) {
          const newBoard = [...board];
          newBoard[row][col] = { ...newBoard[row][col], value: num };
          setBoard(newBoard);
          setCompletedCount(prev => prev + 1);

          // Remove from errors if it was previously marked as error
          setCellErrors(prev => prev.filter(err => err.row !== row || err.col !== col));

          if (isBoardComplete(newBoard)) {
            await playSound('success');
            const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
            Taro.redirectTo({
              url: `/pages/success/index?level=${difficulty}&timeElapsed=${timeElapsed}&blankCount=${blankCount}`
            });
          }
        } else {
          // Handle invalid move
          await playSound('error');
          const newErrorCount = errorCount + 1;
          setErrorCount(newErrorCount);
          
          // Add to error cells
          setCellErrors(prev => [...prev, { row, col, value: num }]);

          if (newErrorCount >= MAX_ERRORS) {
            await playSound('fail');
            const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
            Taro.redirectTo({
              url: `/pages/failure/index?level=${difficulty}&timeElapsed=${timeElapsed}&completedCount=${completedCount}`
            });
          }
        }
      }
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  };

  const isCellError = (row: number, col: number): boolean => {
    return cellErrors.some(err => err.row === row && err.col === col);
  };

  return (
    <View className='sudoku-container'>
      <View className='difficulty-buttons'>
        <View 
          className={`difficulty-button ${difficulty === 'simple' ? 'active' : ''}`}
          onClick={() => handleDifficultyChange('simple')}
          onTap={() => handleDifficultyChange('simple')}
        >
          <Text>Simple</Text>
        </View>
        <View
          className={`difficulty-button ${difficulty === 'middle' ? 'active' : ''}`}
          onClick={() => handleDifficultyChange('middle')}
          onTap={() => handleDifficultyChange('middle')}
        >
          <Text>Middle</Text>
        </View>
        <View
          className={`difficulty-button ${difficulty === 'hard' ? 'active' : ''}`}
          onClick={() => handleDifficultyChange('hard')}
          onTap={() => handleDifficultyChange('hard')}
        >
          <Text>Hard</Text>
        </View>
      </View>

      <View className='error-counter'>
        <Text>Mistakes: {errorCount} / {MAX_ERRORS}</Text>
      </View>

      <View className='sudoku-board'>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} className='sudoku-row'>
            {row.map((cell: Cell, colIndex) => (
              <View
                key={`${rowIndex}-${colIndex}`}
                className={`sudoku-cell ${cell.fixed ? 'fixed' : ''} ${
                  selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex ? 'selected' : ''
                } ${isCellError(rowIndex, colIndex) ? 'error' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onTap={() => handleCellClick(rowIndex, colIndex)}
              >
                <Text>{cell.value !== 0 ? cell.value : ''}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View className='number-pad'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <View
            key={num}
            className='number-button'
            onClick={() => handleNumberInput(num)}
            onTap={() => handleNumberInput(num)}
          >
            <Text>{num}</Text>
          </View>
        ))}
      </View>

      <View
        className='new-game-button'
        onClick={startNewGame}
        onTap={startNewGame}
      >
        <Text>New Game</Text>
      </View>
    </View>
  )
}

export default Index
