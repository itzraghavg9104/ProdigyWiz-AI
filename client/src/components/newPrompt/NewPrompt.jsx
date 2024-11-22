import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MenuButton from "../menuButton/MenuButton";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chat, setChat] = useState(null);
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  // Initialize chat when component mounts or data changes
  useEffect(() => {
    if (data?.history) {
      const validRoles = ["user", "model", "function", "system"]; // Valid roles for Google AI
      const formattedHistory = data.history.map(({ role, parts }) => ({
        role: validRoles.includes(role) ? role : "user", // Validate role or default to "user"
        parts: [{ text: parts[0]?.text || "" }], // Safeguard against undefined text
      }));

      if (formattedHistory.length === 0) {
        formattedHistory.push({
          role: "user",
          parts: [{ text: "" }], // Ensure at least one user message
        });
      }

      const newChat = model.startChat({
        history: formattedHistory,
        generationConfig: {
          // Add any additional configuration here, if needed
        },
      });

      setChat(newChat);
    }
  }, [data]);

  // Auto-scroll to the end of chat
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
    },
  });

  const add = async (text, isInitial) => {
    if (!chat) return;
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (err) {
      console.error("Chat Stream Error:", err);
      setAnswer("An error occurred while processing your request. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text?.value || ""; // Safeguard against undefined `text`
    if (!text.trim()) return; // Prevent empty messages

    add(text, false);
  };

  // Run only once when the chat is initialized
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && chat) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, false);
      }
    }
    hasRun.current = true;
  }, [chat]);
  const handleMenu = (text) => {
    add(text, false);
  }
  return (
    <>
      {/* Add New Chat */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Type 'START' to start the learning session or choose option from the menu." />
        <button>
          <img src="/send.png" alt="Send" />
        </button>
        <MenuButton handleMenu={handleMenu} />
      </form>
    </>
  );
};

export default NewPrompt;