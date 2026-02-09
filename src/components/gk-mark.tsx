// GK's brand mark - "GK" logo with opacity effects
export function GKMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="300"
      height="200"
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <style>
          {`
            .text-base {
              font-family: var(--font-vt323), monospace;
              font-size: 170px;
              fill: rgba(150, 150, 150, 1);
            }
            .text-highlight {
              font-family: var(--font-vt323), monospace;
              font-size: 170px;
              fill: rgba(190, 190, 190, 0.4);
            }
          `}
        </style>
      </defs>
      <text x="150" y="144" textAnchor="middle">
        <tspan className="text-base">G</tspan>
        <tspan className="text-highlight">K</tspan>
      </text>
    </svg>
  );
}

export function getMarkSVG() {
  // "GK" brand mark - updated design with opacity effects
  return `<svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
      .text-base { font-family: 'VT323', monospace; font-size: 170px; fill: rgba(150, 150, 150, 1); }
       .text-highlight { font-family: 'VT323', monospace; font-size: 170px; fill: rgba(190, 190, 190, 0.4); }
    </style>
     <text x="150" y="144" text-anchor="middle">
       <tspan class="text-base">G</tspan>
       <tspan class="text-highlight">K</tspan>
     </text>
  </svg>`;
}
