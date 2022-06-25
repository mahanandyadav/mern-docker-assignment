import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
const { ResizableBox } = require('react-resizable');
const { Resizable } = require('react-resizable');

function App() {
  const [userId, setUserId] = useState(0)
  const [width1, setWidth1] = useState(201)
  const [height1, setHeight1] = useState(200)

  const [width2, setWidth2] = useState(200)
  const [height2, setHeight2] = useState(200)

  const [width3, setWidth3] = useState(200)
  const [height3, setHeight3] = useState(200)

  useEffect(() => {
    const e1h = document.getElementById('container').clientHeight
    const e1w = document.getElementById('container').clientWidth
    setWidth1(e1w / 2)
    setHeight1(e1h / 2)
    setWidth2(e1w / 2)
    setHeight2(e1h / 2)
    setWidth3(e1w)
    setHeight3(e1h)
  }, [])

  const onResizeOne = (event, { element, size, handle }) => {
    // this.setState({width: size.width, height: size.height});
    setWidth1(size.width)
    setHeight1(size.height)
  };
  const onResizeTwo = (event, { element, size, handle }) => {
    // this.setState({width: size.width, height: size.height});
    setWidth2(size.width)
    setHeight2(size.height)
  };
  const onResizeThree = (event, { element, size, handle }) => {
    // this.setState({width: size.width, height: size.height});
    setWidth3(size.width)
    setHeight3(size.height)
  };

  const [inputValue, setInputValue] = useState({
    name: '',
    email: ''
  })
  const url = 'http://localhost:3001'
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value
    })
  }
  const handleOnAdd = (e) => {
    e.preventDefault()
    const addData = async () => {
      try {
        const res = await fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'credentials': 'same-origin',
            //  'withCredentials': false,
            // 'credentials': 'include',
          },
          body: JSON.stringify(inputValue)
        })
        if (res.ok) {
          let d = await res.json()
          console.log(d)
          setUserId(d.user._id)
        } else {
          alert('fetch add failed')
        }
      } catch (e) {
        console.log(e)
      }
    }
    addData()
    setInputValue({})
  }
  const handleOnUpdate = (e) => {
    e.preventDefault()
    console.log(inputValue)
    if (!userId) {
      alert("id not defined")
      return
    }
    const updateData = async () => {
      const res = await fetch(`${url}/?id=${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue)
      })
      if (res.ok) {
        let d = await res.json()
        console.log(d)
      } else {
        alert('fetch update failed')
      }
    }
    updateData()
    setInputValue({})
  }
  const handleOnCount = () => {
    // if (!userId) {
    //   alert("id not defined")
    //   return
    // }
    const updateCount = async () => {
      const res = await fetch(`${url}/`, {
        method: "GET",
        headers: {
          // 'credentials': 'same-origin',
          //  'withCredentials': 'true',
          // 'credentials': 'include',
        }

      })
      if (res.ok) {
        let d = await res.json()
        console.log(d)
        alert(d.count.add)

      } else {
        alert('fetch count failed')
      }
    }
    updateCount()
    // setInputValue({})
  }
  return (
    < div className='container' id='container'>
      <div style={{ border: " 3px solid black", display: 'flex', gap: 5 }}>
        <Resizable height={height1} width={width1}
          name="first"
          id='one'
          style={{ background: "red" }}
          resizeHandles={['s', 'e', 'n', 'w']}
          onResize={onResizeOne}>
          <div className="box" style={{ width: width1 + 'px', height: height1 + 'px' }}>
            <span>Contents1</span>

          </div>
        </Resizable>
        <Resizable height={height2} width={width2}
          // minConstraints={[10,20]}
          style={{ background: "blue" }}
          resizeHandles={['s', 'e', 'n', 'w']}
          onResize={onResizeTwo}>
          <div className="box" style={{ width: width2 + 'px', height: height2 + 'px' }}>
            <span>Contents2</span>

          </div>
        </Resizable>
      </div>

      <Resizable height={height3} width={width3}
        style={{ background: "green" }}
        resizeHandles={['s', 'e', 'n', 'w']}
        onResize={onResizeThree}>
        <div className="box" style={{ width: width3 + 'px', height: height3 + 'px' }}>
          <form className='form' >
            <input
              name='name'
              onChange={(e) => handleChange(e)}
              value={inputValue.name}
            />
            <input
              name='email'
              onChange={(e) => handleChange(e)}
              value={inputValue.email}
            />
            <button onClick={handleOnAdd}>Add</button>
            <button onClick={handleOnUpdate}>Update</button>
            <button type='button' onClick={handleOnCount}>Count</button>
            {/* <h3>{`count add: ${} count update ${}`}</h3> */}
          </form>

        </div>
      </Resizable>
    </div>
  );
}

export default App;
