import { HStack } from "@chakra-ui/layout";
import { useState } from "react";
import Headers from "./components/Headers";
import ItemContainer from "./components/ItemContainer";
import SearchFilter from "./components/SearchFilter";

const App = () => {
  const cIds = ["container-1", "container-2", "container-3", "container-4"];

  const [containers, setContainers] = useState<IContainer[]>([
    {
      id: cIds[0],
      type: cIds[0],
      accept: cIds.filter((id) => id !== cIds[0]),
      items: [ 
        { id: "1", title: "課題アプリ作成", tags: ["仕事", "趣味"] },
        { id: "2", title: "企業に応募", tags: ["転職"] },
      ],
    },
    {
      id: cIds[1],
      type: cIds[1],
      accept: cIds.filter((id) => id !== cIds[1]),
      items: [
        { id: "3", title: "UdemyでReact勉強", tags: ["React", "Udemy"] },
      ],
    },
    {
      id: cIds[2],
      type: cIds[2],
      accept: cIds.filter((id) => id !== cIds[2]),
      items: [
        { id: "4", title: "TechpitでSPAの勉強", tags: ["SPA", "Techpit"] },
        { id: "5", title: "テーブル定義", tags: ["仕事"] },
        { id: "6", title: "要件定義", tags: ["仕事"] },
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
      <Headers heading="TODO管理アプリ" />
      <SearchFilter />
      <HStack justify="center" bg="antiquewhite">
        {containers.map((container) => (
          <ItemContainer
            getContainerId={getContainerId}
            accept={container.accept}
            id={container.id}
            onItemDrag={onItemDrag}
            type={container.type}
            items={container.items}
            key={container.id}
            containers={containers}
          />
        ))}
      </HStack>
    </>
  );
};

export default App;
