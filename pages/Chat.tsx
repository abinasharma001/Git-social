import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, MoreVertical, Phone, Video, Search, ArrowLeft, MessageCircle } from 'lucide-react';
import { MOCK_USERS, CURRENT_USER, INITIAL_MESSAGES } from '../services/mockData';
import { Message, User } from '../types';

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Initialize view based on URL
  useEffect(() => {
    if (userId) {
      const found = MOCK_USERS.find(u => u.id === userId);
      if (found) setActiveUser(found);
    } else {
      // Default to first user if none selected
      setActiveUser(null);
    }
  }, [userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeUser]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !activeUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: CURRENT_USER.id,
      receiverId: activeUser.id,
      text: inputValue,
      timestamp: new Date(),
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate Echo/Reply from bot
    setIsTyping(true);
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: activeUser.id,
        receiverId: CURRENT_USER.id,
        text: `This is a simulated real-time reply from ${activeUser.name}. In a real app, this would come via WebSocket/Socket.IO.`,
        timestamp: new Date(),
        read: false
      };
      setIsTyping(false);
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  // Helper to format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter messages for current conversation
  const currentMessages = activeUser 
    ? messages.filter(m => 
        (m.senderId === CURRENT_USER.id && m.receiverId === activeUser.id) ||
        (m.senderId === activeUser.id && m.receiverId === CURRENT_USER.id)
      ).sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime())
    : [];

  return (
    <div className="flex h-full bg-white overflow-hidden pb-16 md:pb-0">
      {/* Sidebar / Chat List */}
      <div className={`${activeUser ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-slate-200 h-full`}>
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search people..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {MOCK_USERS.map(user => {
             // Find last message for preview
             const userMsgs = messages.filter(m => m.senderId === user.id || m.receiverId === user.id);
             const lastMsg = userMsgs.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
             
             return (
              <div 
                key={user.id}
                onClick={() => navigate(`/chat/${user.id}`)}
                className={`p-4 flex items-start gap-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 ${userId === user.id ? 'bg-blue-50/50' : ''}`}
              >
                <div className="relative">
                  <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 rounded-full border border-slate-200" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-slate-900 truncate">{user.name}</h3>
                    {lastMsg && <span className="text-xs text-slate-400">{formatTime(lastMsg.timestamp)}</span>}
                  </div>
                  <p className={`text-sm truncate ${lastMsg?.senderId !== CURRENT_USER.id && !lastMsg?.read ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                    {lastMsg ? lastMsg.text : 'Start a conversation'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeUser ? (
        <div className="flex-1 flex flex-col h-full bg-slate-50/50">
          {/* Header */}
          <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/chat')} className="md:hidden text-slate-500">
                <ArrowLeft size={24} />
              </button>
              <img src={activeUser.avatarUrl} alt={activeUser.username} className="w-10 h-10 rounded-full border border-slate-200" />
              <div>
                <h3 className="font-bold text-slate-900 leading-none">{activeUser.name}</h3>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-blue-600 transition-colors"><Phone size={20} /></button>
              <button className="hover:text-blue-600 transition-colors"><Video size={20} /></button>
              <button className="hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {currentMessages.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-slate-400">
                 <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <MessageIcon />
                 </div>
                 <p>No messages yet. Say hello!</p>
               </div>
            ) : (
              currentMessages.map(msg => {
                const isMe = msg.senderId === CURRENT_USER.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm ${
                      isMe 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            
            {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white p-4 border-t border-slate-200">
            <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-100 border-0 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors shadow-sm flex items-center justify-center"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center flex-col bg-slate-50 text-slate-500">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
             <MessageCircle size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Your Messages</h3>
          <p className="max-w-xs text-center mt-2">Select a conversation from the sidebar to start chatting with developers.</p>
        </div>
      )}
    </div>
  );
};

// Simple Icon component for empty state
const MessageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export default Chat;