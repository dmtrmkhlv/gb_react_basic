export const useMoveToLastMessage = ({chatId})=>{
    const moveToLastMessage = ()=>{
        let lastMessage = document.querySelector(`[data-chat='${chatId}']`);
        setTimeout(() => {lastMessage?.scrollIntoView({block: "end", behavior: "smooth"});}, 0);
    }
   
    return{
        moveToLastMessage
    }
  }