import React, { Component } from "react";
import Ticket from "./Ticket";
import Filters from "./Filters";
import Header from "./Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      newTickets: [],
      stops: [
        { id: 1, name: "Все", value: -1, checked: true },
        { id: 2, name: "Без пересадок", value: 0, checked: false },
        { id: 3, name: "1 пересадка", value: 1, checked: false },
        { id: 4, name: "2 пересадки", value: 2, checked: false },
        { id: 5, name: "3 пересадки", value: 3, checked: false }
      ],
      filter: "RUB"
    };
  }

  componentDidMount() {
    fetch("./tickets.json")
      .then(res => res.json())
      .then(data => {
        this.setState({
          tickets: data.tickets,
          newTickets: data.tickets
        });
      });
  }

  onHandleChange = value => {
    return this.setState(({ stops, tickets }) => {
      let stop = stops;
      if (value === -1) {
        const checked = !stop[0].checked;
        stop.forEach(item => (item.checked = checked));
      } else {
        let selectedStops = stop.find(item => item.value === value);
        let index = stop.indexOf(selectedStops);

        if (value > -1) {
          stop[index].checked = !stop[index].checked;
          stop[0].checked = false;
        }
      }

      let stopsArray = [];
      stop.forEach(item => {
        if (item.value > -1 && item.checked) {
          stopsArray.push(item.value);
        }
      });
      console.log(stopsArray);

      const newArr = tickets.filter(item => stopsArray.includes(item.stops));
      console.log(newArr);
      return {
        newTickets: newArr
      };
    });
  };

  onFilterChange = name => {
    this.setState({ filter: name });
  };

  render() {
    return (
      <div className='wrapper'>
        <Header />

        <div className='content'>
          <div className='sidebar-left'>
            <Filters
              onHandleChange={this.onHandleChange}
              choise={this.state.stops}
              filter={this.state.filter}
              onFilterChange={this.onFilterChange}
            />
          </div>

          <div className='sidebar-right'>
            <Ticket
              tickets={this.state.newTickets}
              filter={this.state.filter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
