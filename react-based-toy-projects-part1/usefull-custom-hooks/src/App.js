import { useEffect, useRef } from 'react'
import useInput from './hooks/useInput'
import useTabs from './hooks/useTabs'
import useTitle from './hooks/useTitle'
import useClick from './hooks/useClick'
import useConfirm from './hooks/useConfirm'
import usePreventLeave from './hooks/usePreventLeave'
import useBeforeLeave from './hooks/useBeforeLeave'
import useFadeIn from './hooks/useFadeIn'
import useNetwork from './hooks/useNetwork'
import useScroll from './hooks/useScroll'
import useFullscreen from './hooks/useFullscreen'
import useAxios from './hooks/useAxios'

const content = [
  {
    tab:"Section 1",
    content:'1'
  },
  {
    tab:"Section 2",
    content:'2'
  }
]

function App() {
  // 1
  const maxLen = value => value.length <= 10
  const name = useInput('Mr.kim', maxLen)

  // 2
  const {currentItem, changeItem} = useTabs(0, content)

  // 3
  const titleUpdater = useTitle("Loading...")
  setTimeout(()=> titleUpdater('Home'), 1000)

  // 4
  const potato = useRef()
  useEffect(()=> {
    setTimeout(()=> potato.current.focus(), 5000)
  }, [])

  // 5
  const sayHello = () => { console.log('say hello')}
  const title =useClick(sayHello)

  // 6
  const deleteWorld = () => console.log('delete the world')
  const abort = () => console.log('aborted')
  const confirmDelete = useConfirm("Ae you sure?", deleteWorld, abort)

  // 7
  const {enablePrevent, disablePrevent} = usePreventLeave()

  // 8 
  const before = () => console.log('pls dont leave')
  useBeforeLeave(before)

  // 9
  const fadeInH1 = useFadeIn(3,2)
  const fadeInP = useFadeIn(5, 10)

  // 10
  const handleNetworkChange = (online) => {
    console.log(online?'we just wen online': 'we are offline')
  }
  const onLine = useNetwork(handleNetworkChange)

  // 11
  const { y } = useScroll()

  // 12
  const printIsFullscreen = (isFullscreen)=> { console.log(isFullscreen)}
  const { element, triggerFull, exitFull} =useFullscreen(printIsFullscreen) 


  //13
  const { loading, data, error, refetch } = useAxios({
    url:
      "https://jsonplaceholder.typicode.com/todos/1"
    });


  return (
    <div className="App" style={{height: "1000vh"}}>
      <input placehoder="Name" value={name.value} onChange={name.onChange} />

      {content.map((selction, index ) =>( 
         <button onClick={()=>changeItem(index)}>{selction.tab}</button>
      ))}

      <div>
        {currentItem.content}
      </div>

      <input ref={potato} placeholder="la" />

      <h1 ref={title}>title</h1>

      <button onClick={() => confirmDelete()}>Delete the world</button>

      <button onClick={enablePrevent}>Protect</button>
      <button onClick={disablePrevent}>UnProtect</button>

      <h1 {...fadeInH1}> hello </h1>
      <p {...fadeInP}>  lalalalalalalalalal</p>

      <h1>hello</h1>

      <h1>{onLine ? "OnLine" : "OffLine"}</h1>

      <h1 style={{position:'fixed',  color: y> 100 ? "red" : "blue"}}>HI</h1>

      <div ref={element}>
      <img alt="img" src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" />
      <button onClick={()=> triggerFull()}>Make fullscreen</button>
      <button onClick={()=> exitFull()}>Exit fullscreen</button>

      <button onClick={refetch}>refetch</button>

      </div>
    </div>
  );
}

export default App;
