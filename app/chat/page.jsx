import ChatBox from '@/app/components/chat/ChatBox';

export default function ChatPage() {
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ChatBox />
    </div>
  );
}
