import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker((showEmojiPicker) => !showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      <Container>
        <form className='input-container' onSubmit={(e) => sendChat(e)}>
          <div className='emoji'>
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
            {showEmojiPicker && (
              <div className="emoji-picker-react-wrapper">
                <Picker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder='Type your message here'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className='submit'><IoMdSend /></button>
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .input-container {
    flex: 1;
    display: flex;
    align-items: center;
    border-radius: 2rem;
    background-color: #ffffff34;
    position: relative;
    padding: 0.5rem;
    gap: 1rem;

    .emoji {
      position: relative;
      display: flex;
      align-items: center;

      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .emoji-picker-react-wrapper {
        position: absolute;
        bottom: 100%; /* Ensures it appears above the input */
        left: 0; /* Aligns it to the left of the input */
        z-index: 1; /* Ensures it appears above other elements */
        margin-bottom: 10px; /* Adds some space between the button and the picker */
        }
      }
    }

    input {
      flex: 1;
      height: 100%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;

        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
