import { useEffect, useState, useRef, forwardRef, ForwardedRef } from 'react';
import Scrollbar from '../../../../components/scrollbar';
import Lightbox from '../../../../components/lightbox';
import ChatMessageItem from './ChatMessageItem';
import { useChatContext } from '../../../../utils/context/ChatContext';

const ChatMessageList = forwardRef<HTMLElement>( (props, scrollRef) => {

  const { messages } = useChatContext();

  const [selectedImage, setSelectedImage] = useState(-1);


  const imagesLightbox: Array<{ src: string }> = messages?.length ? messages
    ?.filter((message) => message?.image)
    .map((message) => ({ src: `${process.env.REACT_APP_API_URL}/${message.image.replace('\\', '/')}` })) : [];

  const handleOpenLightbox = (imageUrl: string) => {
    if (imagesLightbox.length) {
      const imageIndex = imagesLightbox.findIndex((image) => image.src === imageUrl);
      setSelectedImage(imageIndex);
    }
  };

  const handleCloseLightbox = () => {
    setSelectedImage(-1);
  };

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{
          ref: scrollRef,
        }}
        sx={{ p: 3, height: 1 }}
      >
        {messages?.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            onOpenLightbox={(url) => handleOpenLightbox(url)}
          />
        ))}
      </Scrollbar>

      {// @ts-ignore
        <Lightbox
          index={selectedImage}
          slides={imagesLightbox} disabledZoom disabledCaptions disabledFullscreen disabledVideo disabledThumbnails
          open={selectedImage >= 0}
          close={handleCloseLightbox} />}
    </>
  );
})

export default ChatMessageList