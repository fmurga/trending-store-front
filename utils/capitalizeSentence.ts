export const capitalizeWords = (sentence: string) => {
  let words = sentence.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  let capitalizedSentence = words.join(' ');

  return capitalizedSentence;
};