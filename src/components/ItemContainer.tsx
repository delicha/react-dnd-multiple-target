import { Stack } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import { useState, FC, ChangeEvent } from "react";
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
  containers: IContainer[];
}

const ItemContainer: FC<ItemContainerProps> = ({
  items,
  onItemDrag,
  type,
  id,
  accept,
  getContainerId,
  containers,
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

  // const TagData: {
  //   name: string;
  // }[] = [];

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  
  const [showModal, setShowModal] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value);
  }

  const ShowModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setTitle("");
    setTags([]);
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
      tags:tags,
    };
    items.push(newTask);
    setTitle("");
    setTags([]);
    setShowModal(false);
    setShowTagInput(false);
  };

  const onAddTag = () => {
    if (!text) {
      return null;
    }
    const newTags = [...tags];
    newTags.push(text);
    setTags(newTags);
    setShowTagInput(false);
  };

  const onAddTagFromList = (e: any) => {
    const tagtext = e.currentTarget.dataset.item;;
    setTags([...tags, tagtext]);
    setShowTagInput(false);
  };

  const tagList = () => {
    return (containers.map((container) => (
      container.items.map((item) => {
        return (item.tags?.map((tag:string, i:number) => {
          return (
            <li onClick={onAddTagFromList} key={i} data-item={tag}>
              {tag}
            </li>
          )
        })
      )})
    )))
  };

  return (
    <Stack
      as={motion.div}
      ref={itemsRef}
      height="600px"
      minW="300px"
      spacing={0}
      bg={isOver ? "gray.100" : "gray.300"}
      align="center"
      justify="start"
      animate={{ width: isOver ? 320 : 300, y: isOver ? 0 : 0 }}
      border="1px"
      overflowY="auto"
      overflowX="hidden"
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
          <input 
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="modal-input"
          />
          <div className="modal-button">
            <button onClick={ShowTagInput}>+</button>
          </div>
          <div className="tag-input">
            <div className="tag-created">{tags?.join(" / ")}</div>
          {showTagInput ? (
            <div className="tag-container">
              <input 
                id="createdTag"
                type="text"
                onChange={onChangeText}
                className="modal-input"
              />
              <ul>
                 {tagList()}
              </ul>
              <button className="task-create-button" onClick={onAddTag}>作成</button>
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
