import React from 'react'

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        {/* This is a Comment */}
        <h2>Please enter a store</h2>
        <input type="text" required placeholder="Store Name" />
      </form>
    )
  }
}

export default StorePicker 
