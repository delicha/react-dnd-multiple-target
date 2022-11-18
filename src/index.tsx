import ReactDOM from "react-dom";
import App from "./App";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "./Index.css";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ChakraProvider>
  </DndProvider>,
  document.getElementById("root")
);
