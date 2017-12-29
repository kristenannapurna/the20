import React from 'react';
// TO DO: add failsafe for if the height gets lower than 10%

class Buttons extends React.Component {
  render(){
    return (
      <section className="checkin-buttons">
        <a style={{height:`${this.props.eighty}%`}} onClick={() => this.props.updateRatio('eighty')} id="eighty" href="#">🍎💪✅</a>
        <a style={{ height:`${this.props.twenty}%` }} onClick={()=> this.props.updateRatio('twenty')} id="twenty" href="#">😐🎉🍷</a>
      </section>
    )
  }
}

export default Buttons;