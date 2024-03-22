import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  width: 300px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  width: 20px;
  height: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const box = {
  initial: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  hover: (custom: string) => ({
    scale: 1.1,
    originX: custom === "1" || custom === "3" ? "right" : "0px",
    originY: custom === "1" || custom === "2" ? "bottom" : "0px",
  }),
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [toggle, setToggle] = useState(false);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            variants={box}
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            initial="initial"
            whileHover="hover"
            custom={n}
          >
            {n === "2" && !toggle ? <Circle layoutId="circle" /> : null}
            {n === "3" && toggle ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                width: 320,
                height: 210,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <button onClick={() => setToggle((prev) => !prev)}>Switch</button>
    </Wrapper>
  );
}

export default App;
