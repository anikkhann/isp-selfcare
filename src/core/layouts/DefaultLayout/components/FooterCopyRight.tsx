import { FloatButton } from "antd";

function FooterCopyright() {
  return (
    <div className="footerCopyright">
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
      <FloatButton.BackTop visibilityHeight={0} type="primary" />
    </div>
  );
}

export default FooterCopyright;
