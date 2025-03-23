'use client';

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/card";
import Image from "next/image";

export default function Home() {
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState<{ sender: "AI" | "User"; text: string }[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (step === 1) {
      animateText("For which exam do you want to become a <span class='font-semibold'>maestro</span>? 🎓", () => {
        setShowButtons(true);
      });
    }
  }, [step]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (showButtons) {
        if (event.key === "1") handleExamChoice("EPAC");
        if (event.key === "2") handleExamChoice("EQE");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showButtons]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const animateText = (text: string, callback?: () => void) => {
    let i = 0;
    let output = "";
    setCurrentText("");
    setIsAnimating(true);
  
    const tagStack: { tag: string; index: number }[] = [];
    const regex = /<\/?[^>]+(>|$)/g; // Detects HTML tags
  
    const intervalId = setInterval(() => {
      if (text[i] === "<") {
        // Detect and store full HTML tag
        const tagMatch = text.slice(i).match(regex);
        if (tagMatch) {
          tagStack.push({ tag: tagMatch[0], index: output.length }); // Store tag + where to insert
          i += tagMatch[0].length;
        }
      } else {
        // Insert the tag at the exact character where it should start
        while (tagStack.length > 0 && tagStack[0].index === output.length) {
          output += tagStack.shift()?.tag || "";
        }
  
        // Append next character
        output += text[i];
        i++;
      }
  
      setCurrentText(output);
  
      if (i >= text.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          setMessages((prev) => [...prev, { sender: "AI", text }]);
          setCurrentText("");
          setIsAnimating(false);
          if (callback) callback();
        }, 500);
      }
    }, 50);
  };

  const handleExamChoice = (exam: string) => {
    setMessages((prev) => [...prev, { sender: "User", text: exam }]);
    setShowButtons(false);
    setStep(2);

    setTimeout(() => {
      animateText(
        "Got it! Try to answer the following EPEC question: <span class='font-semibold'>What documents are required on the filing date for the European Patent Office (EPO) to accord a filing date?</span>",
        () => setShowInput(true)
      );
    }, 500);
  };

  const handleSubmitAnswer = () => {
    if (userAnswer.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "User", text: userAnswer }]);
    setUserAnswer("");
    setShowInput(false);
    setStep(3);

    setTimeout(() => {
      animateText("Your answer is well-structured but lacks depth in legal references.");
    }, 500);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitAnswer();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Logo in the Top Left Corner */}
      <div className="absolute top-4 left-4">
        <Image src="/logo.png" alt="Patent Maestro Logo" width={200} height={66} />
      </div>

      {/* Chat Messages */}
      <div className="w-full max-w-4xl space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
            <Card
              className={`p-4 shadow-xl ${
                msg.sender === "User"
                  ? "blue text-white text-right rounded-lg max-w-[75%]"
                  : "bg-white text-left rounded-lg max-w-[75%]"
              }`}
              style={{ width: `max-content`, minWidth: "10%", maxWidth: "75%" }}
            >
              <CardContent>
                <p className="text-xl" dangerouslySetInnerHTML={{ __html: msg.text }}></p>
              </CardContent>
            </Card>
          </div>
        ))}

        {/* Show Animated AI Message ONLY if it's still typing */}
        {isAnimating && (
          <div className="flex justify-start">
            <Card className="p-4 shadow-xl bg-white text-left rounded-lg max-w-[75%]">
              <CardContent>
                <p className="text-xl" dangerouslySetInnerHTML={{ __html: currentText }}></p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {showButtons && (
        <div className="mt-6 flex justify-end w-full max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-lg flex gap-6">
            <motion.button
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExamChoice("EPAC")}
              className="bg-black text-white px-6 py-3 rounded-md text-xl transition"
            >
              EPAC
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, opacity: 0.9 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExamChoice("EQE")}
              className="bg-black text-white px-6 py-3 rounded-md text-xl transition"
            >
              EQE
            </motion.button>
          </div>
        </div>
      )}

      {/* User Input for Answer */}
      {showInput && (
        <div className="mt-6 w-full max-w-4xl flex flex-col items-end">
          <textarea
            ref={inputRef}
            className="w-full p-3 border rounded"
            rows={4}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your answer here..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmitAnswer}
            className="mt-2 bg-black text-white px-4 py-2 rounded-md"
          >
            Send
          </motion.button>
        </div>
      )}
    </div>
  );
}