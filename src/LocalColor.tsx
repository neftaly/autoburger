// Generate random hex color
// eslint-disable-next-line react-refresh/only-export-components
export const getRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

export const LocalColor = ({ color }) => (
  <div style={{padding: '1rem'}}>
    Your color:&nbsp;
    <span
      style={{
        display: "inline-block",
        backgroundColor: color,
      }}
      children={color}
    />
  </div>
);
