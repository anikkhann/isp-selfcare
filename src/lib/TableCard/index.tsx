import React from "react";
import { Button, Card } from "antd";

import styled from "styled-components";
import Link from "next/link";
import { PlusSquareOutlined } from "@ant-design/icons";

export const StyledCard = styled(Card)`
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',

  `;

interface CardProps {
  title: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  hasLink: boolean;
  addLink?: string | undefined;
}

const TableCard = ({ title, style, addLink, hasLink, children }: CardProps) => (
  <Card
    title={title}
    style={style}
    extra={
      hasLink &&
      addLink && (
        <Link href={addLink}>
          <Button
            type="primary"
            icon={<PlusSquareOutlined />}
            size={"middle"}
            style={{}}
          >
            Add New
          </Button>
        </Link>
      )
    }
  >
    {children}
  </Card>
);

export default TableCard;
