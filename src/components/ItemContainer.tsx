import { Stack } from "@chakra-ui/layout";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useDrop } from "react-dnd";
import Item from "./Item";
import "./ItemContainer.css";

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
      boxShadow="xl"
      animate={{ width: isOver ? 320 : 300, y: isOver ? 0 : 0 }}
    >
      <AnimatePresence>
        {items.map((item, i) => (
          <Item
            index={i}
            onItemDrag={onItemDrag}
            type={type}
            item={item}
            key={item.id}
          >
          </Item>
        ))}
      </AnimatePresence>
      <button className="column-button">+</button>
      <div className="modal-container">
        <div>
          <input 
            id="title"
            type="text"
            className="modal-input"
          />
        </div>
        <div className="modal-button">
          <button>+</button>
        </div>

        <div className="modal-bottom-buttons">
          <button>Cancel</button>
          <button>OK</button>
        </div>
      </div>
    </Stack>
  );
};
export default ItemContainer;
