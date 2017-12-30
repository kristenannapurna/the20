import React from 'react';

class Dashboard extends React.Component {
  constructor(){
    super();
    this.state = {
      dailyData: {},
      weeklyData: {},
      allTimeData: {}
    }
    this.getDailyData = this.getDailyData.bind(this);
    this.getAllTimeData = this.getAllTimeData.bind(this);

  }
  componentWillReceiveProps(nextProps){
    const { data, today } = nextProps;

    if(data[today.yyyy]){
      // get all time data
      let allTimeEighty = 0;
      let allTimeTwenty = 0;
      for(let year in data){
        let years = data[year]
        for (let month in years){
          let days = years[month];
          for (let data in days){
            allTimeEighty = allTimeEighty + days[data].eighty;
            allTimeTwenty = allTimeTwenty + days[data].twenty;
          }
        }
      }  

      const allTimeTotal = allTimeEighty + allTimeTwenty;

      
      const allTimeData = {
        eighty: allTimeEighty,
        twenty: allTimeTwenty
      }

      this.setState({
        dailyData: data[today.yyyy][today.mm][today.dd],
        allTimeData
      })
    }
  }
  getDailyData(){
    const total = this.state.dailyData.eighty + this.state.dailyData.twenty;
    const eighty = Math.round((this.state.dailyData.eighty / total) * 100);
    const twenty = Math.round((this.state.dailyData.twenty / total) * 100);
    const markup = (
      <div>
        <p>😇 {eighty} % </p>
        <p>👹 {twenty} % </p>
      </div>
    )
    return markup;
  }
  getAllTimeData(){
    const total = this.state.allTimeData.eighty + this.state.allTimeData.twenty;
    const eighty = Math.round((this.state.allTimeData.eighty / total) * 100);
    const twenty = Math.round((this.state.allTimeData.twenty / total) * 100);
    const markup = (
      <div>
        <p>😇 {eighty} % </p>
        <p>👹 {twenty} % </p>
      </div>
    )
    return markup;
  }
  render(){
    return(
      <div className="dashboard">
        <h2>Dashboard</h2>
          {this.props.data[this.props.today.yyyy] ?

            (
            <div>
            <section>
              <h3>Daily</h3>
              {this.getDailyData()}
            </section>
            <section>
              <h3>Week To Date</h3>
            </section>
            <section>
              <h3>All Time</h3>
              {this.getAllTimeData()}
            </section>
            </div>
            )
            :
            <div>Start Tracking to see some data!</div>
          }

       
      </div>
    )
  }
}



export default Dashboard;