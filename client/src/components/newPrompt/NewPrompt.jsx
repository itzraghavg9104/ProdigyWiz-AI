// import { useEffect, useRef, useState } from "react";
// import "./newPrompt.css";
// import Upload from "../upload/Upload";
// import { IKImage } from "imagekitio-react";
// import model from "../../lib/gemini";
// import Markdown from "react-markdown";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import MenuButton from "../menuButton/MenuButton";

// const NewPrompt = ({ data }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [chat, setChat] = useState(null);
//   const [img, setImg] = useState({
//     isLoading: false,
//     error: "",
//     dbData: {},
//     aiData: {},
//   });

//   const endRef = useRef(null);
//   const formRef = useRef(null);

//   // Initialize chat when component mounts or data changes
//   useEffect(() => {
//     if (data?.history) {
//       const validRoles = ["user", "model", "function", "system"]; // Valid roles for Google AI
//       const formattedHistory = data.history.map(({ role, parts }) => ({
//         role: validRoles.includes(role) ? role : "user", // Validate role or default to "user"
//         parts: [{ text: parts[0]?.text || "" }], // Safeguard against undefined text
//       }));

//       if (formattedHistory.length === 0) {
//         formattedHistory.push({
//           role: "user",
//           parts: [{ text: "" }], // Ensure at least one user message
//         });
//       }

//       const newChat = model.startChat({
//         history: formattedHistory,
//         generationConfig: {
//           // Add any additional configuration here, if needed
//         },
//       });

//       setChat(newChat);
//     }
//   }, [data]);

//   // Auto-scroll to the end of chat
//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [data, question, answer, img.dbData]);

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: () => {
//       return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question: question.length ? question : undefined,
//           answer,
//           img: img.dbData?.filePath || undefined,
//         }),
//       }).then((res) => res.json());
//     },
//     onSuccess: () => {
//       queryClient
//         .invalidateQueries({ queryKey: ["chat", data._id] })
//         .then(() => {
//           formRef.current.reset();
//           setQuestion("");
//           setAnswer("");
//           setImg({
//             isLoading: false,
//             error: "",
//             dbData: {},
//             aiData: {},
//           });
//         });
//     },
//     onError: (err) => {
//       console.error("Mutation Error:", err);
//     },
//   });

//   const add = async (text, isInitial) => {
//     if (!chat) return;
//     if (!isInitial) setQuestion(text);

//     try {
//       const result = await chat.sendMessageStream(
//         Object.entries(img.aiData).length ? [img.aiData, text] : [text]
//       );
//       let accumulatedText = "";
//       for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         console.log(chunkText);
//         accumulatedText += chunkText;
//         setAnswer(accumulatedText);
//       }
//       accumulatedText = "";
//       // setAnswer(accumulatedText);
//       // console.log(accumulatedText);

//       mutation.mutate();
//     } catch (err) {
//       console.error("Chat Stream Error:", err);
//       setAnswer("An error occurred while processing your request. Please try again.");
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const text = e.target.text?.value || ""; // Safeguard against undefined `text`
//     if (!text.trim()) return; // Prevent empty messages

//     add(text, false);
//   };

//   // Run only once when the chat is initialized
//   const hasRun = useRef(false);

//   useEffect(() => {
//     if (!hasRun.current && chat) {
//       if (data?.history?.length === 1) {
//         add(data.history[0].parts[0].text, false);
//       }
//     }
//     hasRun.current = true;
//   }, [chat]);
//   const handleMenu = (text) => {
//     add(text, false);
//   }
//   return (
//     <>
//       {/* Add New Chat */}
//       {img.isLoading && <div className="">Loading...</div>}
//       {img.dbData?.filePath && (
//         <IKImage
//           urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
//           path={img.dbData?.filePath}
//           width="380"
//           transformation={[{ width: 380 }]}
//         />
//       )}
//       {question && <div className="message user">{question}</div>}
//       {answer && (
//         <div className="message">
//           <Markdown>{answer}</Markdown>
//         </div>
//       )}
//       <div className="endChat" ref={endRef}></div>
//       <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
//         <Upload setImg={setImg} />
//         <input id="file" type="file" multiple={false} hidden />
//         <input type="text" name="text" placeholder="Type 'START' to start the learning session or choose option from the menu." />
//         <button>
//           <img src="/send.png" alt="Send" />
//         </button>
//         <MenuButton handleMenu={handleMenu} />
//       </form>
//     </>
//   );
// };

// export default NewPrompt;

// import { useEffect, useRef, useState } from "react";
// import "./newPrompt.css";
// import Upload from "../upload/Upload";
// import { IKImage } from "imagekitio-react";
// import model from "../../lib/gemini";
// import Markdown from "react-markdown";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import MenuButton from "../menuButton/MenuButton";

// const NewPrompt = ({ data }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [chat, setChat] = useState(null);
//   const [img, setImg] = useState({
//     isLoading: false,
//     error: "",
//     dbData: {},
//     aiData: {},
//   });

//   const endRef = useRef(null);
//   const formRef = useRef(null);

//   useEffect(() => {
//     if (data?.history) {
//       const validRoles = ["user", "model", "function", "system"];
//       const formattedHistory = data.history.map(({ role, parts }) => ({
//         role: validRoles.includes(role) ? role : "user",
//         parts: [{ text: parts[0]?.text || "" }],
//       }));

//       if (formattedHistory.length === 0) {
//         formattedHistory.push({
//           role: "user",
//           parts: [{ text: "" }],
//         });
//       }

//       const newChat = model.startChat({
//         history: formattedHistory,
//         generationConfig: {},
//       });

//       setChat(newChat);
//     }
//   }, [data]);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [data, question, answer, img.dbData]);

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: () => {
//       return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question: question.length ? question : undefined,
//           answer,
//           img: img.dbData?.filePath || undefined,
//         }),
//       }).then((res) => res.json());
//     },
//     onSuccess: () => {
//       queryClient
//         .invalidateQueries({ queryKey: ["chat", data._id] })
//         .then(() => {
//           formRef.current.reset();
//           setQuestion("");
//           setAnswer("");
//           setImg({
//             isLoading: false,
//             error: "",
//             dbData: {},
//             aiData: {},
//           });
//         });
//     },
//     onError: (err) => {
//       console.error("Mutation Error:", err);
//     },
//   });

//   const add = async (text, isInitial) => {
//     if (!chat) return;
//     if (!isInitial) setQuestion(text);

//     try {
//       const result = await chat.sendMessageStream(
//         Object.entries(img.aiData).length ? [img.aiData, text] : [text]
//       );

//       let accumulatedText = "";
//       for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         accumulatedText += chunkText;
//         setAnswer(accumulatedText);
//         console.log(accumulatedText);
//       }
//       // console.log("hello:", answer);
//       // setAnswer(accumulatedText);


//       // Ensure the final state is set after the stream ends
//       // await new Promise(resolve => setTimeout(resolve, 0));
//       // setAnswer(accumulatedText);

//       mutation.mutate();
//     } catch (err) {
//       console.error("Chat Stream Error:", err);
//       setAnswer("An error occurred while processing your request. Please try again.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const text = e.target.text?.value || "";
//     if (!text.trim()) return;
//     add(text, false);
//   };

//   const hasRun = useRef(false);

//   useEffect(() => {
//     if (!hasRun.current && chat) {
//       if (data?.history?.length === 1) {
//         add(data.history[0].parts[0].text, false);
//       }
//     }
//     hasRun.current = true;
//   }, [chat]);

//   const handleMenu = (text) => {
//     add(text, false);
//   };

//   return (
//     <>
//       {img.isLoading && <div className="">Loading...</div>}
//       {img.dbData?.filePath && (
//         <IKImage
//           urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
//           path={img.dbData?.filePath}
//           width="380"
//           transformation={[{ width: 380 }]}
//         />
//       )}
//       {question && <div className="message user">{question}</div>}
//       {answer && (
//         <div className="message">
//           <Markdown>{answer}</Markdown>
//         </div>
//       )}
//       <div className="endChat" ref={endRef}></div>
//       <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
//         <Upload setImg={setImg} />
//         <input id="file" type="file" multiple={false} hidden />
//         <input type="text" name="text" placeholder="Type 'START' to start the learning session or choose option from the menu." />
//         <button>
//           <img src="/send.png" alt="Send" />
//         </button>
//         <MenuButton handleMenu={handleMenu} />
//       </form>
//     </>
//   );
// };

// export default NewPrompt;

// Final correct solution without styling

// import { useEffect, useRef, useState } from "react";
// import "./newPrompt.css";
// import Upload from "../upload/Upload";
// import { IKImage } from "imagekitio-react";
// import model from "../../lib/gemini";
// import Markdown from "react-markdown";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import MenuButton from "../menuButton/MenuButton";

// const NewPrompt = ({ data }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [chat, setChat] = useState(null);
//   const [img, setImg] = useState({
//     isLoading: false,
//     error: "",
//     dbData: {},
//     aiData: {},
//   });

//   const endRef = useRef(null);
//   const formRef = useRef(null);
//   const isStreaming = useRef(false);

//   useEffect(() => {
//     if (data?.history) {
//       const validRoles = ["user", "model", "function", "system"];
//       const formattedHistory = data.history.map(({ role, parts }) => ({
//         role: validRoles.includes(role) ? role : "user",
//         parts: [{ text: parts[0]?.text || "" }],
//       }));

//       if (formattedHistory.length === 0) {
//         formattedHistory.push({
//           role: "user",
//           parts: [{ text: "" }],
//         });
//       }

//       const newChat = model.startChat({
//         history: formattedHistory,
//         generationConfig: {},
//       });

//       setChat(newChat);
//     }
//   }, [data]);

//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [data, question, answer, img.dbData]);

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: async () => {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question: question.length ? question : undefined,
//           answer,
//           img: img.dbData?.filePath || undefined,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update chat');
//       }

//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["chat", data._id] })
//         .then(() => {
//           if (!isStreaming.current) {
//             formRef.current.reset();
//             setQuestion("");
//             setAnswer("");
//             setImg({
//               isLoading: false,
//               error: "",
//               dbData: {},
//               aiData: {},
//             });
//           }
//         });
//     },
//     onError: (err) => {
//       console.error("Mutation Error:", err);
//     },
//   });

//   const add = async (text, isInitial) => {
//     if (!chat) return;
//     if (!isInitial) setQuestion(text);

//     try {
//       isStreaming.current = true;
//       setAnswer(""); // Clear previous answer

//       const result = await chat.sendMessageStream(
//         Object.entries(img.aiData).length ? [img.aiData, text] : [text]
//       );

//       let accumulatedText = "";
//       for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         accumulatedText += chunkText;
//         setAnswer(prevAnswer => accumulatedText); // Use functional update
//         console.log(accumulatedText);
//       }

//       // Wait for final state update to complete
//       await new Promise(resolve => setTimeout(resolve, 100));

//       // Only mutate after stream is complete and state is updated
//       isStreaming.current = false;
//       mutation.mutate();

//     } catch (err) {
//       console.error("Chat Stream Error:", err);
//       setAnswer("An error occurred while processing your request. Please try again.");
//       isStreaming.current = false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const text = e.target.text?.value || "";
//     if (!text.trim()) return;
//     add(text, false);
//   };

//   const hasRun = useRef(false);

//   useEffect(() => {
//     if (!hasRun.current && chat) {
//       if (data?.history?.length === 1) {
//         add(data.history[0].parts[0].text, false);
//       }
//     }
//     hasRun.current = true;
//   }, [chat]);

//   const handleMenu = (text) => {
//     add(text, false);
//   };

//   return (
//     <>
//       {img.isLoading && <div className="">Loading...</div>}
//       {img.dbData?.filePath && (
//         <IKImage
//           urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
//           path={img.dbData?.filePath}
//           width="380"
//           transformation={[{ width: 380 }]}
//         />
//       )}
//       {question && <div className="message user">{question}</div>}
//       {answer && (
//         <div className="message">
//           <Markdown>{answer}</Markdown>
//         </div>
//       )}
//       <div className="endChat" ref={endRef}></div>
//       <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
//         <Upload setImg={setImg} />
//         <input id="file" type="file" multiple={false} hidden />
//         <input
//           type="text"
//           name="text"
//           placeholder="Type 'START' to start the learning session or choose option from the menu."
//           disabled={isStreaming.current}
//         />
//         <button disabled={isStreaming.current}>
//           <img src="/send.png" alt="Send" />
//         </button>
//         <MenuButton handleMenu={handleMenu} />
//       </form>
//     </>
//   );
// };

// export default NewPrompt;

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MenuButton from "../menuButton/MenuButton";

// Styled Components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const MessageContainer = styled.div`
  padding: 1rem;
  border-radius: 12px;
  max-width: 90%;
  word-wrap: break-word;
  
  &.user {
    background-color: #2c2937;
    color: #ececec;
    align-self: flex-end;
    margin-left: 2rem;
  }
  
  &.assistant {
    background-color: #363342;
    color: #ececec;
    align-self: flex-start;
    margin-right: 2rem;
  }
`;

const StyledMarkdown = styled(Markdown)`
  // Code blocks
  pre {
    background-color: #1e1e2e;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }

  code {
    font-family: 'Fira Code', monospace;
    color: #a6e3a1;
  }

  // Tables
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }

  th, td {
    border: 1px solid #4c4958;
    padding: 0.5rem;
    text-align: left;
  }

  th {
    background-color: #2c2937;
  }

  // Lists
  ul, ol {
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }

  // Links
  a {
    color: #89b4fa;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  // Blockquotes
  blockquote {
    border-left: 4px solid #4c4958;
    margin: 1rem 0;
    padding-left: 1rem;
    color: #cdd6f4;
  }

  // Headers
  h1, h2, h3, h4, h5, h6 {
    color: #cdd6f4;
    margin: 1rem 0;
  }
`;

const LoadingIndicator = styled.div`
  padding: 1rem;
  color: #89b4fa;
  text-align: center;
`;

const ImagePreview = styled(IKImage)`
  max-width: 380px;
  border-radius: 8px;
  margin: 1rem 0;
`;

const EndChat = styled.div`
  padding-bottom: 100px;
`;

// Preserve the original form styling
const FormContainer = styled.form`
  width: 65%;
  position: fixed;
  bottom: 25px;
  margin:auto;
  background-color: #2c2937;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0px 20px;

  input {
    flex: 1;
    padding: 20px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #ececec;
  }

  button, label {
    border-radius: 50%;
    background-color: #605e68;
    border: none;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

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
  const isStreaming = useRef(false);

  // Rest of your existing logic remains unchanged
  useEffect(() => {
    if (data?.history) {
      const validRoles = ["user", "model", "function", "system"];
      const formattedHistory = data.history.map(({ role, parts }) => ({
        role: validRoles.includes(role) ? role : "user",
        parts: [{ text: parts[0]?.text || "" }],
      }));

      if (formattedHistory.length === 0) {
        formattedHistory.push({
          role: "user",
          parts: [{ text: "" }],
        });
      }

      const newChat = model.startChat({
        history: formattedHistory,
        generationConfig: {},
      });

      setChat(newChat);
    }
  }, [data]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
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
      });

      if (!response.ok) {
        throw new Error('Failed to update chat');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          if (!isStreaming.current) {
            formRef.current.reset();
            setQuestion("");
            setAnswer("");
            setImg({
              isLoading: false,
              error: "",
              dbData: {},
              aiData: {},
            });
          }
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
      isStreaming.current = true;
      setAnswer("");

      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(prevAnswer => accumulatedText);
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      isStreaming.current = false;
      mutation.mutate();

    } catch (err) {
      console.error("Chat Stream Error:", err);
      setAnswer("An error occurred while processing your request. Please try again.");
      isStreaming.current = false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text?.value || "";
    if (!text.trim()) return;
    add(text, false);
  };

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
  };

  return (
    <ChatContainer>
      {img.isLoading && <LoadingIndicator>Loading...</LoadingIndicator>}
      {img.dbData?.filePath && (
        <ImagePreview
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <MessageContainer className="user">{question}</MessageContainer>}
      {answer && (
        <MessageContainer className="assistant">
          <StyledMarkdown>{answer}</StyledMarkdown>
        </MessageContainer>
      )}
      <EndChat ref={endRef} />
      <FormContainer onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input
          type="text"
          name="text"
          placeholder="Type 'START' to start the learning session or choose option from the menu."
          disabled={isStreaming.current}
        />
        <button disabled={isStreaming.current}>
          <img src="/send.png" alt="Send" />
        </button>
        <MenuButton handleMenu={handleMenu} />
      </FormContainer>
    </ChatContainer>
  );
};

export default NewPrompt;
