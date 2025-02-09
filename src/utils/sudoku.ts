export type Difficulty = 'simple' | 'middle' | 'hard';

export interface Cell {
  value: number;
  fixed: boolean;
}

export type Board = Cell[][];

const getEmptyBoard = (): Board => {
  return Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({ value: 0, fixed: false }))
  );
};

const isValid = (board: Board, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x].value === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col].value === num) return false;
  }

  // Check 3x3 box
  const startRow = row - row % 3;
  const startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol].value === num) return false;
    }
  }

  return true;
};

const solveSudoku = (board: Board): boolean => {
  let row = -1;
  let col = -1;
  let isEmpty = false;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) {
        row = i;
        col = j;
        isEmpty = true;
        break;
      }
    }
    if (isEmpty) break;
  }

  if (!isEmpty) return true;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col].value = num;
      if (solveSudoku(board)) return true;
      board[row][col].value = 0;
    }
  }
  return false;
};

const getCellsToRemove = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'simple':
      return 30;
    case 'middle':
      return 40;
    case 'hard':
      return 50;
    default:
      return 30;
  }
};

export const generateSudoku = (difficulty: Difficulty = 'simple'): Board => {
  const board = getEmptyBoard();
  
  // Fill diagonal 3x3 boxes
  for (let box = 0; box < 9; box += 3) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let num;
        do {
          num = Math.floor(Math.random() * 9) + 1;
        } while (!isValid(board, box + i, box + j, num));
        board[box + i][box + j].value = num;
      }
    }
  }

  // Solve the rest
  solveSudoku(board);

  // Mark all cells as fixed
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j].fixed = true;
    }
  }

  // Remove numbers based on difficulty
  const cellsToRemove = getCellsToRemove(difficulty);
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col].value !== 0) {
      board[row][col].value = 0;
      board[row][col].fixed = false;
      removed++;
    }
  }

  return board;
};

export const isBoardComplete = (board: Board): boolean => {
  // Check if all cells are filled
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j].value === 0) return false;
    }
  }

  // Check if all rows are valid
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const value = board[row][col].value;
      if (seen.has(value)) return false;
      seen.add(value);
    }
  }

  // Check if all columns are valid
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const value = board[row][col].value;
      if (seen.has(value)) return false;
      seen.add(value);
    }
  }

  // Check if all 3x3 boxes are valid
  for (let box = 0; box < 9; box++) {
    const seen = new Set();
    const rowStart = Math.floor(box / 3) * 3;
    const colStart = (box % 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const value = board[rowStart + i][colStart + j].value;
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
  }

  return true;
};
