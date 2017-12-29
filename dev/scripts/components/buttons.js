import React from 'react';

class Buttons extends React.Component {
  render(){
    let eightyHeight = this.props.eighty;
    let twentyHeight = this.props.twenty;
    
    if (eightyHeight < 10){
      eightyHeight = 12;
      twentyHeight = 88;
    }

    if(twentyHeight < 10){
      eightyHeight = 88;
      twentyHeight = 12;
    }

    return (
      <section className="checkin-buttons">
        <a style={{height:`${eightyHeight}%`}} onClick={() => this.props.updateRatio('eighty')} id="eighty" href="#">🍎💪✅</a>
        <a style={{ height:`${twentyHeight}%` }} onClick={()=> this.props.updateRatio('twenty')} id="twenty" href="#">😐🎉🍷</a>
      </section>
    )
  }
}

export default Buttons;