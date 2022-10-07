import {Navigate, Outlet, Route, Routes, useNavigate, useParams} from "react-router-dom";
import ShortLink from "./components/ShortLink";
import {useEffect} from "react";
import {controlCode} from "./firebase";


const GoToMain = () =>{
    return <Navigate to={"/"} />
}

const RedirectPage = () =>{
    const params = useParams()
    const go = useNavigate()
    const code = params?.redirectCode

    useEffect(() =>{
        (async () =>{
            const control = await controlCode(code)
            console.log(control)
            switch (control.no){
                case 0:
                    go("/")
                    break
                case 1:
                    go("/")
                    break
                case 2:
                    window.location = control.target
                    break
            }
        })()
        return () =>{

        }
    })

    return <></>
}

const App = () =>{

    const navigate = useNavigate()
    useEffect(() =>{

        return () =>{

        }
    }, [])

  return (
    <div className="App">
     <Routes>
         <Route path={"/"} element={<ShortLink />} />
         <Route path={"/redirect"}>
             <Route index={true} element={<GoToMain />} />
             <Route path={":redirectCode"} element={<RedirectPage />} />
         </Route>
     </Routes>
    </div>
  );
}

export default App;
