import React from "react";

function Button({
  onClick = undefined,
  disabled = false,
  children,
}) {
  return (
    <div
      className="button"
      style={{
        height: 24,
        padding: "0 12px",
        borderRadius: 6,
        display: "grid",
        placeContent: "center",
        backgroundColor: disabled ? "grey" : "unset",
      }}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  );
  
}

export default Button;