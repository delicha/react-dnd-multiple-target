import { Box } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { FC } from "react";
import { useDrag } from "react-dnd";
interface ItemProps {
  item: IItem;
  type: string;
  index: number;
  onItemDrag: (item: { title: string, id: string; type: string }) => void;
}

const Item: FC<ItemProps> = ({ item, type, index, onItemDrag }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: type,
    item: () => ({ ...item }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      // if (item && dropResult && index === 0) {
        if (item && dropResult) {
        console.log(dropResult);

        onItemDrag({ ...item, type: type });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <Box
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0 }}
      as={motion.div}
      ref={dragRef}
      boxSize="300"
      h='100px'
      bg="white"
      border="1px solid #000"
      opacity={isDragging ? 0.5 : 1}
    >
      <p color="white">{item.title}</p>
    </Box>
  );
};
export default Item;
