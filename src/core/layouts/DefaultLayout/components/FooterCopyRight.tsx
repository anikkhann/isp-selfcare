import { FloatButton } from "antd";
import React, { useRef } from "react";
import dayjs from "dayjs";

function FooterCopyright() {
  const backTopRef = useRef(null);

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
          {dayjs().year()}
          &copy; All Rights Reserved.
        </div>
        {/* fix findDOMNode issue    */}

        <FloatButton.BackTop
          type="primary"
          tooltip="Back to Top"
          ref={backTopRef}
        />
      </div>
    </>
  );
}

export default FooterCopyright;
