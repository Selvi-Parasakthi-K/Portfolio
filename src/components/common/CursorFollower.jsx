import { useEffect, useState } from "react";
import "./cursor.css";

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("mousemove", (e) =>
      setPos({ x: e.clientX, y: e.clientY }),
    );
  }, []);

  return <div className="cursor" style={{ left: pos.x, top: pos.y }} />;
}
