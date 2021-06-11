import { Button } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
//importing monaco editor
import MonacoEditor from '@monaco-editor/react';
//impoprting custom style sheet
import "./Editor.css";
// //fontawesome imports
import { faHtml5, faCss3, faJsSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios, { AxiosResponse } from "axios";
interface IProps{
    currId: string | null,
    htmlText: string | undefined,
    sethtmlText: React.Dispatch<React.SetStateAction<string | undefined>>,
    cssText: string | undefined,
    setcssText: React.Dispatch<React.SetStateAction<string | undefined>>,
    jsText: string | undefined,
    setjsText: React.Dispatch<React.SetStateAction<string | undefined>>
}
function Editor(props: IProps) : JSX.Element {
    const options = {
        selectOnLineNumbers: true,
        fontSize: 18
      };
      const endpointUrl=(process.env.NODE_ENV==="production") ? "https://codeit-backend.herokuapp.com/code" : "http://localhost:3001/code";
      const [currFile, setcurrFile] = useState<string>("HTML");
      useEffect(() => {
          const timeout: NodeJS.Timeout=setTimeout(()=>{
            if(props.currId){
                axios.post(endpointUrl, {
                   htmlText: props.htmlText,
                   cssText: props.cssText,
                   jsText: props.jsText,
                   currId: props.currId
                  })
                  .then(function (response: AxiosResponse<any>) {
                  })
                  .catch(function (error: any) {
                    console.log(error);
                  });
              }
          },3000);

          return() => clearTimeout(timeout);
         
      }, [props.currId,props.htmlText,props.cssText,props.jsText])
      
    return (
        <div>
            <div className="select-file">
                <Button 
                    size="large" 
                    name="HTML"
                    value={currFile}
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>setcurrFile(e.currentTarget.name)}
                    style={currFile==="HTML"?
                            {backgroundColor: "#454545",borderRight: "2px solid black",color: "white"}:
                            {backgroundColor: "#232323",borderRight: "2px solid black",color: "white"} }>
                    <FontAwesomeIcon className="fa-icon-btn" icon={faHtml5} />
                    HTML
                </Button>
                <Button 
                    size="large" 
                    name="CSS"
                    value={currFile}
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>setcurrFile(e.currentTarget.name)}
                    style={currFile==="CSS"?
                    {backgroundColor: "#454545",borderRight: "2px solid black",color: "white"}:
                    {backgroundColor: "#232323",borderRight: "2px solid black",color: "white"} }>
                    <FontAwesomeIcon className="fa-icon-btn" icon={faCss3} />
                    Css
                </Button>
                <Button 
                    size="large" 
                    name="JS"
                    value={currFile}
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>setcurrFile(e.currentTarget.name)}
                    style={currFile==="JS"?
                    {backgroundColor: "#454545",borderRight: "2px solid black",color: "white"}:
                    {backgroundColor: "#232323",borderRight: "2px solid black",color: "white"} }>
                    <FontAwesomeIcon className="fa-icon-btn" icon={faJsSquare} />
                    JS
                </Button>
            </div>
            <div className="editor">
             {currFile==="HTML" &&
              <MonacoEditor
                language="html"
                theme="vs-dark"
                value={props.htmlText}
                onChange={(value,event)=>props.sethtmlText(value)}
                options={options}
              
            />}
              {currFile==="CSS" &&
              <MonacoEditor
                language="css"
                theme="vs-dark"
                value={props.cssText}
                onChange={(value,event)=>props.setcssText(value)}
                options={options}
              
            />}
              {currFile==="JS" &&
              <MonacoEditor
                language="javascript"
                theme="vs-dark"
                value={props.jsText}
                onChange={(value,event)=>props.setjsText(value)}
                options={options}
              
            />}
            </div>
        </div>
    )
}
export default Editor;
