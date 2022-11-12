import { Container, HStack } from "@chakra-ui/layout";
import { useState } from "react";
import Headers from "./components/Headers";
import ItemContainer from "./components/ItemContainer";
const App = () => {
  const cIds = ["container-1", "container-2", "container-3", "container-4"];

  const [containers, setContainers] = useState<IContainer[]>([
    {
      id: cIds[0],
      type: cIds[0],
      accept: cIds.filter((id) => id !== cIds[0]),
      items: [
        { id: "red-1", title: "赤" },
        { id: "red-2", title: "赤" },
        { id: "green-3", title: "緑" },
      ],
    },
    {
      id: cIds[1],
      type: cIds[1],
      accept: cIds.filter((id) => id !== cIds[1]),
      items: [
        { id: "red-4", title: "赤" },
        { id: "red-5", title: "黄" },
        { id: "green-6", title: "緑" },
      ],
    },
    {
      id: cIds[2],
      type: cIds[2],
      accept: cIds.filter((id) => id !== cIds[2]),
      items: [
        { id: "green-7", title: "緑" },
        { id: "yellow-8", title: "黄" },
        { id: "yellow-9", title: "黄" },
      ],
    },
    {
      id: cIds[3],
      type: cIds[3],
      accept: cIds.filter((id) => id !== cIds[3]),
      items: [],
    },
  ]);
  const [containerId, setContainerId] = useState<string>();

  const getContainerId = (id: string) => {
    setContainerId(id);
  };

  const onItemDrag = (item: { title: string; type: string; id: string }) => {
    // const droppedToContainer = containers.find((container) => {
    //   return container.type === containerId;
    // });
    // const draggedFromContainer = containers.find((container) => {
    //   return container.type === item.type;
    // });

    setContainers((prev) => {
      return prev.map((container) => {
        if (container.id === item.type) {
          return {
            ...container,
            items: container.items.filter((data) => item.id !== data.id),
          };
        } else if (container.id === containerId) {
          return {
            ...container,
            items: [item, ...container.items],
          };
        } else {
          return container;
        }
      });
    });
  };

  return (
    <>
      <Container>
        <Headers heading="REACT DND MULTIPLE TARGET" />

        <HStack justify="center">
          {containers.map((container) => (
            <ItemContainer
              getContainerId={getContainerId}
              accept={container.accept}
              id={container.id}
              onItemDrag={onItemDrag}
              type={container.type}
              items={container.items}
              key={container.id}
            />
          ))}
        </HStack>
      </Container>
    </>
  );
};

export default App;
