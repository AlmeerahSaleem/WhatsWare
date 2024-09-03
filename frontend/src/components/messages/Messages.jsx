import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessage();
  const topMessageRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      topMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1  w-full overflow-auto flex flex-col-reverse">
      {loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : messages.length > 0 ? (
        [...messages].reverse().map((message, idx) => (
          <div
            key={message._id}
            ref={idx === 0 ? topMessageRef : null} // ref for the first item in the reversed list
          >
            <Message message={message} />
          </div>
        ))
      ) : (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
