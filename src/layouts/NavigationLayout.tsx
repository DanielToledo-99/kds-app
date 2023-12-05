import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";

import { UserAvatar } from "./Avatar";

export interface MenuConfig {
  title?: string;
  twBackground?: string;
  twText?: string;
}

export const NavigationLayout: React.FC<{
  defaultTitle?: string;
  config?: MenuConfig;
}> = ({
  defaultTitle = "",
  config = { title: "", twBackground: "bg-slate-900", twText: "!text-white" },
}) => {
  const twTextDefault = "!text-white";

  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#571f44",
        textAlign: "center",
        padding: "16px",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "8px", right: "8px" }}>
        <UserAvatar />
      </div>
      <Title
        level={2}
        className={config.twText ? config.twText : twTextDefault}
        style={{ marginBottom: 0, color: "white" }}
      >
        {config.title ? config.title : defaultTitle}
      </Title>

      <div style={{ marginTop: "8px" }}>
        <ClockCircleOutlined style={{ marginRight: "4px", color: "white" }} />
        {currentTime !== null ? (
          <span style={{ color: "white" }}>{currentTime.toString()}</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
