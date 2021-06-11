import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from "./Header";
import Editor from "./Editor";
import Terminal from "./Terminal";
import "./App.css"
import { v4 as uuidv4 } from 'uuid';
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'
import 'react-reflex/styles.css'
function App(): JSX.Element {
  const endpointUrl=(process.env.NODE_ENV==="production") ? "https://codeit-backend.herokuapp.com/readcode" : "http://localhost:3001/readcode";
  const [htmlText, sethtmlText] = useState<string | undefined>
  ('<!--Write your html code here-->\n' +
  '<h1>\n' +
  '    Welcome to CodeIt\n' +
  '</h1>\n' +
  '<h3>\n' +
  '    Hello! This is a HTML/CSS/JS playground!\n' +
  '</h3>\n' +
  '<ul>\n' +
  '    <li>You can create a html/css/js project here</li>\n' +
  '    <li>Feel free to use it as your local development environment</li>\n' +
  '    <li>Customize your code in whatever way you like</li>\n' +
  '    <li>CodeIt is awesome! And you would love to use it!</li>\n' +
  '</ul>\n' +
  '<h3 id="dateid"></h3>\n' +
  '<p>\n' +
  '    This playground is created by Sayak China.\n' +
  '</p>')
  const [cssText, setcssText] = useState<string | undefined>
  ('/*Write your css code here*/\n' +
  'body{\n' +
  '    background-color: #39a6a3;\n' +
  '    font-size: 95%;\n' +
  '    color: #dddddd;\n' +
  "    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n" +
  '}\n' +
  'li{\n' +
  '    line-height: 3rem;\n' +
  '}\n' +
  'a{' +
  '    color:#dddddd;\n' +
  '}')
  const [jsText, setjsText] = useState<string | undefined>
  ('//Write your javascript code here\n' +
  'setInterval(function(){\n' +
  '     var date=new Date();\n' +
  '     document.getElementById("dateid").innerHTML = "Current Date and Time: "+date;\n' +
  '}, 1000);')
  const [srcDoc, setsrcDoc] = useState<string | undefined>("");
  const [currId, setcurrId] = useState<string | null>("");

 
  useEffect(() => {
    if(sessionStorage.getItem("currId"))
        setcurrId(sessionStorage.getItem("currId"));
    else
    {
        sessionStorage.setItem("currId",uuidv4());
        setcurrId(sessionStorage.getItem("currId"));
    }
     
  }, [])
  
  useEffect(()=>{
    if(currId)
    {
      axios.get(endpointUrl, {
        params: {
          id: currId
        }
      })
      .then(function (response) {
        setcssText(response.data.cssText);
        sethtmlText(response.data.htmlText);
        setjsText(response.data.jsText);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
   
  },[currId])
  useEffect(() => {
    const timer=setTimeout(()=> {
      setsrcDoc(`
      <html>
        <body>${htmlText}</body>
        <style>${cssText}</style>
        <script>${jsText}</script>
      </html>
      `)
    },300)
    return () => clearTimeout(timer)
  }, [htmlText,cssText,jsText])
  
  return (
    <div >
        <div>
          <Header />
        </div>
        <div>
          <ReflexContainer orientation="vertical">
            <ReflexElement className="left-pane" flex={0.7} >
              <div style={{height: "100vh"}}>
              <ReflexContainer orientation="horizontal" >
                    <ReflexElement className="left-top-pane scrollbar-setter" flex={0.55} >
                          <Editor 
                            currId={currId}
                            htmlText={htmlText}
                            sethtmlText={sethtmlText}
                            cssText={cssText}
                            setcssText={setcssText}
                            jsText={jsText}
                            setjsText={setjsText}
                          />
                    </ReflexElement>
                    <ReflexSplitter className="reflex-splitter-horizontal"   />
                    <ReflexElement className="left-bottom-pane scrollbar-setter" >
                      <Terminal />
                    </ReflexElement>
                </ReflexContainer>
                </div>
              </ReflexElement>
              <ReflexSplitter className="reflex-splitter-vertical"   />
              <ReflexElement className="right-pane scrollbar-setter" style={{height: "100vh"}} >
                     <iframe
                      srcDoc={srcDoc}
                      title="output" 
                      sandbox="allow-scripts" 
                      frameBorder="0" 
                      width="100%" 
                      height="100%"
                    /> 
              </ReflexElement>
            </ReflexContainer>
        </div>
    </div>


 
   
  );
}

export default App;
