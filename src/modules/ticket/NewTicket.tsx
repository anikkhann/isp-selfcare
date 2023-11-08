import CreateTicketForm from "@/components/forms/ticket/CreateTicketForm";
import AppRowContainer from "@/lib/AppRowContainer";
import { Card } from "antd";

import React from "react";

const NewTicket = () => {
  return (
    <Card
      style={{
        width: "100%",
        backgroundColor: "#f5f5f5"
        // backgroundColor: "#d4e1ea"
      }}
    >
      <AppRowContainer>
        <div
          style={{
            width: "95%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            // border: "1px solid #F15F22",
            textAlign: "center"
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              color: "#F15F22",
              fontWeight: "bolder",
              padding: "0.5rem 0.5rem 0 0"
            }}
          >
            New Ticket
          </h1>
        </div>
        <Card
          // title="New Admin Ticket"
          hoverable
          style={{
            width: "95%",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            margin: "0 auto",
            textAlign: "center",
            // marginTop: "3rem",
            // marginBottom: "3rem"
            marginTop: "1rem",
            marginBottom: "1rem",
            border: "1px solid #F15F22"
          }}
        >
          <CreateTicketForm />
        </Card>
      </AppRowContainer>
    </Card>
  );
};

export default NewTicket;
