import Taro from '@tarojs/taro'

export interface GameRecord {
  id: string;
  date: string;
  level: string;
  timeElapsed: number;
  result: 'success' | 'fail';
  score: number;
  blankCount: number;
  completedCount: number;
}

const STORAGE_KEY = 'sudoku_game_history';

export const saveGameRecord = (record: Omit<GameRecord, 'id' | 'date'>) => {
  try {
    // Get existing records
    const existingRecords = getGameHistory();
    
    // Create new record with id and date
    const newRecord: GameRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    // Add to beginning of array
    existingRecords.unshift(newRecord);

    // Keep only last 100 records
    const trimmedRecords = existingRecords.slice(0, 100);

    // Save back to storage
    Taro.setStorageSync(STORAGE_KEY, trimmedRecords);

    return newRecord;
  } catch (error) {
    console.error('Failed to save game record:', error);
    return null;
  }
};

export const getGameHistory = (): GameRecord[] => {
  try {
    const records = Taro.getStorageSync(STORAGE_KEY);
    return records || [];
  } catch (error) {
    console.error('Failed to get game history:', error);
    return [];
  }
};

export const clearGameHistory = () => {
  try {
    Taro.removeStorageSync(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear game history:', error);
    return false;
  }
};

// Calculate score based on game performance
export const calculateScore = (
  timeElapsed: number,
  level: string,
  blankCount: number,
  isSuccess: boolean
): number => {
  if (!isSuccess) return 0;

  const baseScore = {
    simple: 1000,
    middle: 2000,
    hard: 3000
  }[level] || 1000;

  // Time factor: faster completion = higher score
  const timeScore = Math.max(0, baseScore - (timeElapsed * 2));
  
  // Blank count factor: more blanks = higher score
  const blankScore = blankCount * 10;

  return Math.round(timeScore + blankScore);
};
