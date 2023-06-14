import { FloatButton } from "antd";
import React from "react";

function FooterCopyright() {
  const nodeRef = React.useRef(null);

  return (
    <>
      <div className="container">
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            fontSize: "16px",
            fontWeight: 700
          }}
        >
          {new Date().getFullYear()} &copy; All Rights Reserved.
        </div>
      </div>
      <div ref={nodeRef}>
        <FloatButton.BackTop type="primary" tooltip="Back to Top" />
      </div>
    </>
  );
}

export default FooterCopyright;
