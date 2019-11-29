import React, { Component } from "react";
import moment from "moment";
import "moment/locale/ru";

const declension = (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
};
const stopsAmount = count => {
  return `${count} ${declension(count, [
    "пересадка",
    "пересадки",
    "пересадок"
  ])}`;
};
const priceFormat = price => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u2005");
};

export default class Ticket extends Component {
  state = {
    newPrice: ""
  };
  componentDidMount() {
    fetch("https://www.floatrates.com/daily/rub.json")
      .then(res => res.json())
      .then(data => {
        this.setState({
          rates: Object.values(data).reduce(
            (acc, n) => ((acc[n.code] = n.rate), acc),
            {}
          )
        });
      });
  }
  currency = price => {
    const { rates } = this.state;
    const { filter } = this.props;

    return `${(price * (filter === "RUB" ? 1 : rates[filter])).toFixed(0)} `;
  };

  render() {
    const { filter } = this.props;
    const dataParse = data => {
      return moment(data, "DD.MM.YY").format("D MMMM YYYY, dd");
    };
    return (
      <>
        {this.props.tickets.map((item, index) => {
          return (
            <div className='ticket' key={index}>
              <div className='ticket-bl-left'>
                <div className='ticket__logo'>
                  <img src={require(`./img/${item.carrier}.png`)} alt='' />
                </div>

                <a href='/' className='ticket__btn'>
                  <span className='ticket__btn-text'>
                    Купить <br />
                    за&nbsp;
                    <span className='ticket__price'>
                      {priceFormat(this.currency(item.price))}
                    </span>{" "}
                    {filter === "USD" ? "$" : filter === "RUB" ? `₽` : `€`}
                  </span>
                </a>
              </div>

              <div className='ticket-bl-right'>
                <div className='ticket-info'>
                  <span className='ticket-info__time'>
                    {item.departure_time}
                  </span>
                  <p className='ticket-info-union'>
                    <span className='ticket-info__origin'>{item.origin}</span>,
                    <span className='ticket-info__origin ticket-info__origin-name'>
                      {item.origin_name}
                    </span>
                  </p>
                  <span className='ticket-info__date'>
                    {dataParse(item.departure_date)}
                  </span>
                </div>

                <div className='stops'>
                  <p className='stops__amount'>{stopsAmount(item.stops)}</p>
                  <p className='stops-union'>
                    <span className='stops__line' />
                    <span className='stops__icon' />
                  </p>
                </div>

                <div className='ticket-info'>
                  <span className='ticket-info__time ticket-info__time--right'>
                    {item.arrival_time}
                  </span>
                  <p className='ticket-info-union'>
                    <span className='ticket-info__origin ticket-info__origin--name'>
                      {item.destination_name}
                    </span>
                    ,
                    <span className='ticket-info__origin'>
                      {item.destination}
                    </span>
                  </p>
                  <span className='ticket-info__date'>
                    {dataParse(item.arrival_date)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
