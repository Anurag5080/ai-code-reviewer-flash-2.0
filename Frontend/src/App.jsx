import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import './App.css';

function App() {
  const [code, setCode] = useState(`function sum(){
  return 1+1} \n Paste your code here to review.`)
  const [review, setReview] = useState(``)

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoader(true);

    try {
      const response = await axios.post('https://ai-code-reviewer-flash-2-0.onrender.com/ai/get-review',{ code });
      setReview(response.data);
    } 
    catch (error) {
      console.error('Error fetching review:', error);
      setReview('❌ Error fetching review.');
    }

    setLoader(false);
  }


  return (
    <>
      <div className="main">
        {loader && (<div className="loader"></div>)}
        {loader || (<div onClick={reviewCode} className="review button">Review</div>)}
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          
        </div>
        <div className="right">
          <Markdown rehypePlugins={[ rehypeHighlight ]} >{review}</Markdown>
        </div>
      </div>
    </>
  )
}

export default App
