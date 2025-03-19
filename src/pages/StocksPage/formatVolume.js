function formatVolume(volume) {
  // Convert string to number
  const num = parseInt(volume);

  // Convert to billions (if number is greater than 1 billion)
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(2)}B`;
  }
  // Convert to millions (if number is greater than 1 million)
  else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  }
  // Return the original number if less than 1 million
  return num.toLocaleString();
}

export default formatVolume;
