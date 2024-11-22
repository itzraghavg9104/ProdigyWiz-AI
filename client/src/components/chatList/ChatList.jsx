import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Classroom</Link>
      <Link to="/">Explore ProdigyWiz AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">PREVIOUS CLASSROOMS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
            ? "No Classrooms!"
            : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo2.png" alt="" />
        <div className="texts">
          <span>ProdigyWiz AI </span>
          <span>Built by Raghav and Preeti</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
