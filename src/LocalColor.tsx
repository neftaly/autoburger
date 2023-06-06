// Generate random hex color
export const getRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

export const LocalColor = ({ color }) => (
  <div>
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
