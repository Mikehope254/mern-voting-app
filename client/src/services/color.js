// export const color = () => {
//   return (
//     '#' +
//     Math.random()
//       .toString(16)
//       .slice(2, 8)
//   );
// };

export const color = () => {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
};
