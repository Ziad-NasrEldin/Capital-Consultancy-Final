export default function ScrambleText({ text, className, style }) {
  return (
    <span className={className} style={style}>
      {text}
    </span>
  );
}
