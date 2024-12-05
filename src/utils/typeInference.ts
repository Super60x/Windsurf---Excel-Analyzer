export const inferColumnType = (values: any[]): 'numeric' | 'categorical' | 'datetime' => {
  const sample = values.find(v => v !== null && v !== undefined);
  
  if (!sample) return 'categorical';
  
  // Check if it's a number or can be converted to a number
  if (typeof sample === 'number' || (!isNaN(parseFloat(sample)) && isFinite(sample))) {
    return 'numeric';
  }
  
  // Check if it's a valid date
  const date = new Date(sample);
  if (date instanceof Date && !isNaN(date.getTime())) {
    return 'datetime';
  }
  
  return 'categorical';
};