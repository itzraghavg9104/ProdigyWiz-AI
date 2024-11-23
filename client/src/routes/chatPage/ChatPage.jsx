// import "./chatPage.css";
// import NewPrompt from "../../components/newPrompt/NewPrompt";
// import { useQuery } from "@tanstack/react-query";
// import { useLocation } from "react-router-dom";
// import Markdown from "react-markdown";
// import { IKImage } from "imagekitio-react";

// const ChatPage = () => {
//   const path = useLocation().pathname;
//   const chatId = path.split("/").pop();

//   const { isPending, error, data } = useQuery({
//     queryKey: ["chat", chatId],
//     queryFn: () =>
//       fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
//         credentials: "include",
//       }).then((res) => res.json()),
//   });

//   console.log(data);

//   return (
//     <div className="chatPage">
//       <div className="wrapper">
//         <div className="chat">
//           {isPending
//             ? "Loading..."
//             : error
//               ? "Something went wrong!"
//               : data?.history?.map((message, i) => (
//                 <>
//                   {message.img && (
//                     <IKImage
//                       urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
//                       path={message.img}
//                       height="300"
//                       width="400"
//                       transformation={[{ height: 300, width: 400 }]}
//                       loading="lazy"
//                       lqip={{ active: true, quality: 20 }}
//                     />
//                   )}
//                   <div
//                     className={
//                       message.role === "user" ? "message user" : "message"
//                     }
//                     key={i}
//                   >
//                     <Markdown>{message.parts[0].text}</Markdown>
//                   </div>
//                 </>
//               ))}

//           {data && <NewPrompt data={data} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// import React from "react";
// import styled from "styled-components";
// import NewPrompt from "../../components/newPrompt/NewPrompt";
// import { useQuery } from "@tanstack/react-query";
// import { useLocation } from "react-router-dom";
// import Markdown from "react-markdown";
// import { IKImage } from "imagekitio-react";

// const PageContainer = styled.div`
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   background-color: #1a1b26;
//   color: #ececec;
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   max-width: 1200px;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   position: relative;
// `;

// const ChatContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow-y: auto;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;

//   /* Webkit scrollbar styling */
//   &::-webkit-scrollbar {
//     width: 8px;
//   }

//   &::-webkit-scrollbar-track {
//     background: #2c2937;
//     border-radius: 4px;
//   }

//   &::-webkit-scrollbar-thumb {
//     background: #605e68;
//     border-radius: 4px;
//   }

//   &::-webkit-scrollbar-thumb:hover {
//     background: #7a7885;
//   }
// `;

// const MessageContainer = styled.div`
//   padding: 1rem;
//   border-radius: 12px;
//   max-width: 90%;
//   word-wrap: break-word;
//   line-height: 1.5;

//   &.user {
//     background-color: #2c2937;
//     align-self: flex-end;
//     margin-left: 2rem;
//   }

//   &:not(.user) {
//     background-color: #363342;
//     align-self: flex-start;
//     margin-right: 2rem;
//   }
// `;

// const StyledMarkdown = styled(Markdown)`
//   pre {
//     background-color: #1e1e2e;
//     padding: 1rem;
//     border-radius: 8px;
//     overflow-x: auto;
//   }

//   code {
//     font-family: 'Fira Code', monospace;
//     color: #a6e3a1;
//   }

//   table {
//     border-collapse: collapse;
//     width: 100%;
//     margin: 1rem 0;
//   }

//   th, td {
//     border: 1px solid #4c4958;
//     padding: 0.5rem;
//     text-align: left;
//   }

//   th {
//     background-color: #2c2937;
//   }

//   ul, ol {
//     padding-left: 1.5rem;
//   }

//   li {
//     margin: 0.5rem 0;
//   }

//   a {
//     color: #89b4fa;
//     text-decoration: none;
//     &:hover {
//       text-decoration: underline;
//     }
//   }

//   blockquote {
//     border-left: 4px solid #4c4958;
//     margin: 1rem 0;
//     padding-left: 1rem;
//     color: #cdd6f4;
//   }

//   h1, h2, h3, h4, h5, h6 {
//     color: #cdd6f4;
//     margin: 1rem 0;
//   }
// `;

// const StyledImage = styled(IKImage)`
//   max-width: 400px;
//   width: 100%;
//   height: auto;
//   border-radius: 12px;
//   margin: 1rem 0;
// `;

// const LoadingMessage = styled.div`
//   text-align: center;
//   padding: 2rem;
//   color: #89b4fa;
//   font-size: 1.2rem;
// `;

// const ErrorMessage = styled.div`
//   text-align: center;
//   padding: 2rem;
//   color: #f38ba8;
//   font-size: 1.2rem;
// `;

// const ChatPage = () => {
//   const path = useLocation().pathname;
//   const chatId = path.split("/").pop();

//   const { isPending, error, data } = useQuery({
//     queryKey: ["chat", chatId],
//     queryFn: () =>
//       fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
//         credentials: "include",
//       }).then((res) => res.json()),
//   });

//   return (
//     <PageContainer>
//       <Wrapper>
//         <ChatContainer>
//           {isPending ? (
//             <LoadingMessage>Loading...</LoadingMessage>
//           ) : error ? (
//             <ErrorMessage>Something went wrong!</ErrorMessage>
//           ) : (
//             data?.history?.map((message, i) => (
//               <React.Fragment key={i}>
//                 {message.img && (
//                   <StyledImage
//                     urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
//                     path={message.img}
//                     height="300"
//                     width="400"
//                     transformation={[{ height: 300, width: 400 }]}
//                     loading="lazy"
//                     lqip={{ active: true, quality: 20 }}
//                   />
//                 )}
//                 <MessageContainer className={message.role === "user" ? "user" : ""}>
//                   <StyledMarkdown>{message.parts[0].text}</StyledMarkdown>
//                 </MessageContainer>
//               </React.Fragment>
//             ))
//           )}
//           {data && <NewPrompt data={data} />}
//         </ChatContainer>
//       </Wrapper>
//     </PageContainer>
//   );
// };
// export default ChatPage;

import React from "react";
import styled from "styled-components";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import "./chatPage.css";

const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #1a1b26;
  color: #ececec;
  padding-top:85px
`;

const Wrapper = styled.div`
  width: 95%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2c2937;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #605e68;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7a7885;
  }
`;

const MessageContainer = styled.div`
  padding: 1rem;
  border-radius: 12px;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.5;
  position: relative;

  &.user {
    background-color: #2c2937;
    align-self: flex-end;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  &:not(.user) {
    background-color: #363342;
    align-self: flex-start;
    margin-right: 2rem;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: ${props => props.copied ? '#a6e3a1' : '#89b4fa'};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    color: ${props => props.copied ? '#a6e3a1' : '#cdd6f4'};
  }

  ${MessageContainer}:hover & {
    opacity: 1;
  }
`;

const CodeBlockContainer = styled.div`
  position: relative;
`;

const CodeCopyButton = styled(CopyButton)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  background-color: #2c2937;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;

  ${CodeBlockContainer}:hover & {
    opacity: 1;
  }
`;

const StyledMarkdown = styled(Markdown)`
  pre {
    background-color: #1e1e2e;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-top: 1rem;
  }

  code {
    font-family: 'Fira Code', monospace;
    color: #a6e3a1;
  }

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

  ul, ol {
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }

  a {
    color: #89b4fa;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 4px solid #4c4958;
    margin: 1rem 0;
    padding-left: 1rem;
    color: #cdd6f4;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #cdd6f4;
    margin: 1rem 0;
  }
`;

const StyledImage = styled(IKImage)`
  max-width: 400px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 1rem 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #89b4fa;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #f38ba8;
  font-size: 1.2rem;
`;

const CustomMarkdown = ({ children }) => {
  const [copiedCode, setCopiedCode] = React.useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const components = {
    pre: ({ children }) => {
      const codeContent = children.props.children;
      const codeId = Math.random().toString(36).substr(2, 9);

      return (
        <CodeBlockContainer>
          <pre>{children}</pre>
          <CodeCopyButton
            onClick={() => copyToClipboard(codeContent, codeId)}
            copied={copiedCode === codeId}
          >
            {copiedCode === codeId ? <FaCheck /> : <FaRegCopy />}
          </CodeCopyButton>
        </CodeBlockContainer>
      );
    },
  };

  return <StyledMarkdown components={components}>{children}</StyledMarkdown>;
};

const Message = ({ message, role }) => {
  const [copied, setCopied] = React.useState(false);

  const copyFullMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <MessageContainer className={role === "user" ? "user" : ""}>
      <CopyButton onClick={copyFullMessage} copied={copied}>
        {copied ? <FaCheck /> : <BiCopy />}
      </CopyButton>
      <CustomMarkdown>{message}</CustomMarkdown>
    </MessageContainer>
  );
};

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <PageContainer>
      <Wrapper>
        <ChatContainer>
          {isPending ? (
            <LoadingMessage>Loading...</LoadingMessage>
          ) : error ? (
            <ErrorMessage>Something went wrong!</ErrorMessage>
          ) : (
            data?.history?.map((message, i) => (
              <React.Fragment key={i}>
                {message.img && (
                  <StyledImage
                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                    path={message.img}
                    height="300"
                    width="400"
                    transformation={[{ height: 300, width: 400 }]}
                    loading="lazy"
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <Message
                  message={message.parts[0].text}
                  role={message.role}
                />
              </React.Fragment>
            ))
          )}
          {data && <NewPrompt data={data} />}
        </ChatContainer>
      </Wrapper>
    </PageContainer>
  );
};

export default ChatPage;