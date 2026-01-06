export const getRandomRGBColor = () => {
  const r = Math.floor(Math.random() * 256); // 0부터 255까지의 랜덤 정수
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`; // 예: rgb(123, 45, 200)
};
