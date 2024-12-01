import React, { useState, useEffect } from "react";
import { Box, IconButton, TextField, Button, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  // const email = "ser@example.com"; // Replace with dynamic user email if needed
  const user = useSelector((state:any) => state.auth);

  console.log(user)
  const email=user?.user?.email || "karan@gmail.com";
  console.log(email)
  // Fetch chat history from the backend
  useEffect(() => {
    if (isOpen) {
      axios
        .post("https://chatbot-ba7n.onrender.com/chat-history", { email })
        .then((res) => {
          const chatHistory = res.data.map((chat: any) => [
            { text: chat.userMessage, sender: "You" },
            { text: chat.botResponse, sender: "Chatbot" },
          ]);
          setMessages(chatHistory.flat()); // Flatten the array
        })
        .catch((err) => console.error("Error fetching chat history:", err));
    }
  }, [isOpen]);

  // Handle message send
  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: "You" },
      ]);
      setInput(""); // Clear input field

      axios
        .post("https://chatbot-ba7n.onrender.com/ask", { message: userMessage, email })
        .then((res) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: res.data.response, sender: "Chatbot" },
          ]);
        })
        .catch((err) => console.error("Error sending message:", err));
    }
  };

  return (
    <div>
      {/* Chatbot Icon */}
      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#3F51B5",
            color: "#fff",
            borderRadius: "50%",
            padding: "10px",
            boxShadow: 2,
          }}
        >
          <ChatIcon />
        </IconButton>
      )}

      {/* Chatbot Dialog */}
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "90%",
            maxWidth: "700px",
            borderRadius: "8px",
            boxShadow: 3,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Chatbot
          </Typography>

          {/* Chat Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              maxHeight: "500px",
              marginBottom: "10px",
              //background color black and text are white
              backgroundColor: "#000",

              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
            }}
          >
            {messages.map((message, index) => (
              <Typography
                key={index}
                sx={{
                  marginBottom: "10px",
                  textAlign: message.sender === "You" ? "right" : "left",
                }}
              >
                <b>{message.sender}:</b> {message.text}
              </Typography>
            ))}
          </Box>

          {/* Input and Send Button */}
          <Box sx={{ display: "flex" }}>
            <Input
              
             
         className="w-[300px] gap-4 "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{ marginRight: "10px" }}
            />
            <Button onClick={handleSendMessage} variant="contained"  className="ml-10" >
              Send
            </Button>
          </Box>

          {/* Close Button */}
          <IconButton
            onClick={() => setIsOpen(false)}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "#000",
              color: "#f44336",
            }}
          >
            &times;
          </IconButton>
        </Box>
      )}
    </div>
  );
};

export default Chatbot;
