export function RedWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 800 200"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="120"
        fontWeight="600"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        gk
      </text>
      <text
        x="50%"
        y="85%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="32"
        fontWeight="300"
        fill="currentColor"
        opacity="0.7"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        .me
      </text>
    </svg>
  );
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 800 200">
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="120" font-weight="600" fill="${color}" font-family="system-ui, -apple-system, sans-serif">gk</text>
    <text x="50%" y="85%" dominant-baseline="middle" text-anchor="middle" font-size="32" font-weight="300" fill="${color}" opacity="0.7" font-family="system-ui, -apple-system, sans-serif">.me</text>
  </svg>`;
}
