import React from 'react'

class App extends React.Component {

  render() {
    return (
      <div className="home">
        <div className="home-centred">
          <h1>DropboxWeb</h1>
          <p>Publicá tu carpeta de Dropbox y configurá la web a tu medida</p>
          <div>
          <button>Ingresar con Dropbox</button>
          </div>
          <div>
            <a href="./admin/juan">Test Admin</a> | <a href="./site/catedra1">Test Site</a>
          </div>
        </div>
      </div>
    )
  }
}

export default App
