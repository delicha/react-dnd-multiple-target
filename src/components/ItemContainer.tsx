import { Stack } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import { useState, FC } from "react";
import { useDrop } from "react-dnd";
import Item from "./Item";
import "./ItemContainer.css";
import uuid from 'react-uuid';

interface ItemContainerProps {
  items: IItem[];
  onItemDrag: (item: { title: string, id: string; type: string }) => void;
  type: string;
  id: string;
  accept: string[];
  getContainerId: (id: string) => void;
}

const ItemContainer: FC<ItemContainerProps> = ({
  items,
  onItemDrag,
  type,
  id,
  accept,
  getContainerId,
}) => {
  const [{ isOver }, itemsRef] = useDrop({
    drop: () => {
      getContainerId(id);
    },
    accept: accept,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);

  const ShowModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setShowTagInput(false);
  };
  const ShowTagInput = () => {
    setShowTagInput(true);
  };

  const onAddTask = () => {
    if (!title) {
      alert("タイトルを入力してください。");
      return null;
    }
    const newTask = {
      id: uuid(),
      title: title,
      tags:["宿題", "仕事"]
    };
    items.push(newTask);
    setTitle("");
  };

  const onAddTag = () => {
    if (!tags) {
      return null;
    }
    const newTag = {
      tags:tags,
    };
    // setTags([...tags, newTag]);
  };

  return (
    <Stack
      as={motion.div}
      ref={itemsRef}
      minH="600px"
      minW="300px"
      spacing={0}
      bg={isOver ? "gray.100" : "gray.300"}
      align="center"
      justify="start"
      animate={{ width: isOver ? 320 : 300, y: isOver ? 0 : 0 }}
      border="1px"
    >
      <AnimatePresence>
        {items.map((item, i) => (
          <Item
            index={i}
            onItemDrag={onItemDrag}
            type={type}
            item={item}
            key={item.id}
          />
        ))}
      </AnimatePresence>
      <button className="column-button" onClick={ShowModal}>+</button>
      {showModal ? (
        <div className="modal-container">
          <div>
            <input 
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
            />
          </div>
          <div className="modal-button">
            <button onClick={ShowTagInput}>+</button>
          </div>
          <div className="tag-input">
          {showTagInput ? (
            <div className="tag-container">
              <div>
                <input 
                  id="tags"
                  type="text"
                  value={tags}
                  // onChange={(e) => setTags(e.target.value)}
                  className="modal-input"
                />
              </div>
              <button onClick={onAddTag}>作成</button>
              {/* {tags.map((tag) => ( */}
                <p>宿題・仕事</p>
              {/* ))} */}
            </div>
            ) : (
              <>
                <br />
              </>
            )
          }
          </div>
          <div className="modal-bottom-buttons">
            <button onClick={closeModal}>Cancel</button>
            <button onClick={onAddTask}>OK</button>
          </div>
        </div>
        ) : (
          <></>
        )
      }
    </Stack>
  );
};
export default ItemContainer;
