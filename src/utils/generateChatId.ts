interface SenderReceiver {
  senderId: string;
  receiverId: string;
}

export const generateChatId = ({ senderId, receiverId }: SenderReceiver) => {
  return [senderId, receiverId].sort().join('-');
};
