import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const { ResizableBox } = require('react-resizable');
const { Resizable } = require('react-resizable');

function App() {

  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(200)

  const onResize = (event, { element, size, handle }) => {
    // this.setState({width: size.width, height: size.height});
    setWidth(size.width)
    setHeight(size.height)
    console.log('===============')
    console.log( document.documentElement.clientHeight * 0.65)

  };

  return (
    < div className='container'>

      {/* <Resizable height={height} width={width}
        style={{ background: "pink" }}
        onResize={onResize}>
        <div className="box" style={{ width: width + 'px', height: height + 'px' }}>
          <span>Contents</span>

        </div>
      </Resizable> */}

      <div style={{border:" 3px solid black",display:'flex',gap:5}}>
      <ResizableBox width={500} height={400}
      // lockAspectRatio={true}
      resizeHandles={['s','e']}
        style={{ background: "grey" }}
      >
     {console.log( document.documentElement.clientHeight * 0.65)}
        <span>Contents</span>
      </ResizableBox>
      <ResizableBox  width={500} height={400}
        style={{ background: "red" }}
        ResizeHandleAxis ={"s"}
        // handleSize={[50,50]}
        resizeHandles={['s','e']}
         >
               {console.log( document.documentElement.clientHeight * 0.65)}

        <span>Contents</span>
      </ResizableBox>
      </div>

      <ResizableBox width={1000} height={200}
        style={{ background: "green" }}
        resizeHandles={['s','e']}
        >
        <span>Contents</span>
      </ResizableBox>
    </div>
  );
}

export default App;
