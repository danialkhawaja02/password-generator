import { useState, useEffect, useCallback, useRef } from "react"


export default function Box() {

    const [length, setLength] = useState('8');
    const [numbersAllowed, setNumbersAllowed] = useState(false);
    const [charactersAllowed, setCharactersAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const passwordRef = useRef(null);

    const copyPassword = () => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText(password);
    }

    const passGenerator = useCallback(() => {
        let pass ="";
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let num ="1234567890"
        let specialChar = "@!._?-<>^%$#*";
        if(numbersAllowed) str += num;
        if(charactersAllowed) str +=specialChar;

        for(let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [numbersAllowed, charactersAllowed, length])

    useEffect(()=> {
        passGenerator();
    },[passGenerator])

    return(
        <>
            <div className="bg-[#fffbe8] border-2 border-[#020202] rounded-2xl p-10 w-[35%] flex flex-col gap-5">
                <div className="text-2xl font-bold bg-[#b7f4b1] w-4/6 flex justify-center rounded-[15px] py-1.5">Password Generator</div>
                <div className="bg-[#e9e9e9] rounded-[15px] px-3 py-12 flex flex-col gap-5">
                    <div className="flex gap-3 items-center">
                        <input type='text' readOnly className="bg-[transparent] text-[32px] font-extrabold w-full" value={password} ref={passwordRef}/>
                        <img src="src/assets/copy.png"  className="w-8 h-8 hover:cursor-pointer" onClick={copyPassword}/>
                    </div>
                    <button className="bg-[#020202] px-6 py-3 text-lg font-semibold text-[#fffbe8] text-center rounded-[10px] hover:cursor-pointer" onClick={passGenerator}>Generate New</button>
                </div>
            </div>
            <div className="flex justify-start w-2/6 mt-[-15px] pl-5">
            <div className="bg-[#fffbe8] border-2 border-[#020202] rounded-2xl p-10 w-5/6 flex flex-col gap-5">
                <div className="flex justify-between font-bold text-lg">
                    <label>Length</label>
                    <label>{length}</label>
                </div>
                <input type="range" className="range" min={8} max={16} value={length} onChange={(e)=> {setLength(e.target.value)}
                }/>
                <div className="flex gap-5 items-center">
                    <div className="flex gap-1">
                        <input type="checkbox" defaultChecked={numbersAllowed} onChange={() => {setNumbersAllowed(prev => !prev)}}/>
                        <label>Numbers</label>
                    </div>
                    <div className="flex gap-1 items-center">
                        <input type="checkbox" defaultChecked={charactersAllowed} onChange={() => {setCharactersAllowed(prev => !prev)}} />
                        <label>Special Characters</label>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}