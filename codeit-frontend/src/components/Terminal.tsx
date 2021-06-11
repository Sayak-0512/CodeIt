import React,{useEffect,useState, useRef} from 'react'
import { XTerm } from 'xterm-for-react';
import "./Terminal.css";
import c from "ansi-colors";

function Terminal(): JSX.Element {

    const xtermRef = useRef<any>(null)
   const [currCommand, setcurrCommand] = useState<string>("$");
   useEffect(() => {
        xtermRef.current.terminal.writeln(c.bold.italic.whiteBright("Welcome to codeIt.")+" This is a local terminal especially designed for you. Here you can give some input and expect the terminal to calculate the result.  You can try any basic"+ c.bold.yellow.italic(" mathematical calculation/operation ")+ "and codeIt terminal will solve it for you. You can use the "+c.bold.yellow.italic("'clear'")+" command to clear the terminal.");
    }, [])
    return (
        <div >
            <XTerm className="terminal-xterm" 
            options={{ lineHeight: 2, cols: 126,rows:6, cursorStyle: "underline", cursorBlink: true}} 
            onLineFeed={()=>{
                xtermRef.current.terminal.write(c.bold.cyanBright('CodeIt-Terminal:~ $  '));
                if(currCommand!=="$" && currCommand!=="$clear")
                {
                try {
                xtermRef.current.terminal.writeln(JSON.stringify(eval(currCommand.substr(1,currCommand.length))));
                } catch (error) {
                xtermRef.current.terminal.writeln(c.bold.red("Command not found")) 
                }
                setcurrCommand("$");    
                }
                if(currCommand==="$clear")
                {
                    xtermRef.current.terminal.clear();
                    setcurrCommand("$");
                }
            }}
            onKey={(event: { key: string; domEvent: KeyboardEvent }) => {
               if (event.key.charCodeAt(0) === 13)
               {
                
                xtermRef.current.terminal.write('\n');
                
               }
               else if(event.domEvent.key === "Backspace")
               {
                if(currCommand.charAt(currCommand.length-1)!=='$')
                {
                 setcurrCommand(currCommand => currCommand.substr(0,currCommand.length-1));
                 xtermRef.current.terminal.write('\b \b');
               }
               }
               else
               {
                if(event.key.charCodeAt(0)!==27)
               setcurrCommand(currCommand => currCommand+event.key);
               }
               xtermRef.current.terminal.write(event.key)
            }} ref={xtermRef}  />
        </div>
    )
}

export default Terminal
