import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("CONVERSATIONS : ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-y-auto max-h-[500px]">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1} //index of last conv just to be sure if it's the last
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;

//import Conversation from "./Conversation";

// const Conversations = () => {
//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//     </div>
//   );
// };

// export default Conversations;

// import { useSocketContext } from "../../context/SocketContext";
// import useConversation from "../../zustand/useConversation";

// const Conversation = ({ conversation, lastIdx }) => {
//   const { selectedConversation, setSelectedConversation } = useConversation();
//   const { onlineUsers } = useSocketContext();

//   const isSelected = selectedConversation?._id === conversation._id;
//   const isOnline = onlineUsers.includes(conversation._id);
//   return (
//     <>
//       <div
//         className={`flex gap-2 items-center  hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
//         ${isSelected ? "bg-sky-500" : ""}`}
//         onClick={() => setSelectedConversation(conversation)}
//       >
//         <div className={`avatar ${isOnline ? "online" : ""}`}>
//           <div className="w-12 rounded-full">
//             <img src={conversation.profile} alt="user avatar" />
//           </div>
//         </div>
//         <div className="flex flex-col flex-1">
//           <div className="flax gap-3 justify-between">
//             <p className="font-bold">{conversation.username}</p>
//           </div>
//         </div>
//       </div>

//       {!lastIdx && <div className="divider my-0 py-1 h-1" />}
//     </>
//   );
// };

// export default Conversation;
