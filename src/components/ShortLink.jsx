import {useEffect, useState} from "react";
import {saveLink} from "../firebase";

const ShortLink = () => {

    const [input, setInput] = useState("")
    const [result, setResult] = useState("")
    const [isShow, setIsShow] = useState(false)
    const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9","0"];

    const rand = (min, max) =>{
        return Math.floor(Math.random() * (max - min) + min);
    }

    const generateRandom = () =>{
        let str = ""
        for(let i = 0; i < 8; i++){
            str += characters[rand(0, characters.length)]
        }
        return str.toLowerCase()
    }

    const controlIsLink = link =>{
        let regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/, "gi")
        return regex.test(link)
    }

    const onSubmit = async e => {
        e.preventDefault()
        if(controlIsLink(input)){
            let isSaved = false
            let a = generateRandom()
            while (!isSaved){
                const b = await saveLink(a, input)
                switch (b.no){
                    case 0:
                        isSaved = true
                        setResult("An error corrupted")
                        setIsShow(true)
                        break
                    case 1:
                        isSaved = true
                        setResult(`https://honeylink.pages.dev/redirect/${b.code}`)
                        setIsShow(true)
                        break
                    case 2:
                        //retry
                        break
                }
            }
        }
    }

    useEffect(() =>{

        return () =>{

        }
    }, [])

    return (
        <div className={"bg-red-500 w-full h-full justify-center flex items-center"}>
            <div className={"h-2/4 w-2/4 bg-white rounded-lg flex flex-col"}>
                <h1 className={"text-center font-bold m-5 text-red-500 text-3xl"}>
                    Welcome to HoneyLink!
                </h1>
                <form onSubmit={onSubmit} className={"flex flex-col w-full h-full"}>
                    <input
                        className={"w-1/2 h-16 self-center border-2 border-red-500 rounded-lg focus:border-4 outline-none my-10"}
                        placeholder={"Please type the url you want to shorten"}
                        onChange={e => setInput(e.target.value)}
                    />
                    <div className={"mt-auto mb-auto flex flex-col"}>
                        <h1 className={"self-center"}>
                            {isShow && (
                                <span onClick={async () =>{
                                    await navigator.clipboard.writeText(result);
                                    alert("Link has successfully copied: " + result);
                                }}>
                                    {result}
                                </span>
                            )}
                        </h1>
                    </div>
                    <button className={"m-5 w-48 h-24 bg-red-500 rounded-lg text-white text-3xl self-center mt-auto"}>
                        Short my link
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ShortLink
