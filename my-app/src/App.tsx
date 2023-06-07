import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { ExampleQueryDocument, ExampleQueryQuery, execute } from './.graphclient';

function App() {
  const [data, setData] = React.useState<ExampleQueryQuery>()
  const [images, setImages] = React.useState<any>()
  const address1 = "0x781d9eba479a21e79339d78ee2f4e555f4766eae"
  const address2 = "0xe918c668befb8140c7f4968bce6a7f5eae267e1d"

  useEffect(() => {
    execute(ExampleQueryDocument, {accountId: address1}).then((result) => {
      setData(result?.data)
      if (result) {
        const tokenUris: any[] = 
        [JSON.parse(JSON.stringify(result.data))].map((ele: any) => (
          ele['account']['ERC721tokens'].map((token: any) => (
            token['uri']
          ))
        ))
        getData(tokenUris[0])
      }
    })
  }, [setData])

  async function getData(tokenUris: any[]) {
    const uriList = []
    for (const uri of tokenUris) {
      const res = await fetch(uri)
      const json = await res.json()
      uriList.push(json['image'])
    }
    setImages(uriList)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Graph Client Example</p>
        <fieldset>
          {data && (
            <form>
              <label>Data</label>
              <br />
              <textarea value={JSON.stringify(data, null, 2)} readOnly rows={25} />
            </form>
          )}
        </fieldset>
      </header>
      <div>
        {images && (
          images.map((image: any, i: number) => (
            <img src={image} key={i} className="App-logo"></img>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
