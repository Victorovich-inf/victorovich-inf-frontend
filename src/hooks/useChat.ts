import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux';
import { getUserData } from '../store/reducers/userReducer';

export default function useChat() {
  const user = useSelector(getUserData)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [log, setLog] = useState(null)

  const { current: socket } = useRef(
    io(process.env.REACT_APP_API_URL as string, {
      query: {
        roomId: 0,
        userName: `${user.firstName} ${user.lastName}`
      }
    })
  )

  useEffect(() => {
    socket.emit('user:add', user)

    socket.emit('message:get')
    //
    // socket.on('log', (log) => {
    //   setLog(log)
    // })

    socket.on('user_list:update', (users) => {
      setUsers(users)
    })

    socket.on('message_list:update', (messages) => {
      setMessages(messages)
    })
  }, [])

  const sendMessage = (message: any) => {
    socket.emit('message:add', message)
  }

  const removeMessage = (message: any) => {
    socket.emit('message:remove', message)
  }

  return { users, messages, log, sendMessage, removeMessage }
}