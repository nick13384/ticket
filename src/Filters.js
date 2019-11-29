import React, { Component } from "react";

class Filters extends Component {
  buttons = [
    { name: "RUB", label: "RUB" },
    { name: "USD", label: "USD" },
    { name: "EUR", label: "EUR" }
  ];
  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const cls = isActive ? "active" : null;
      return (
        <button
          className={`btn__item ${cls}`}
          key={name}
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      );
    });
    return (
      <div className='filters'>
        <div className='currency'>
          <p className='currency__name'>Валюта</p>
          <div className='btn-group'>{buttons}</div>
        </div>

        <div className='stops-quantity'>
          <p className='currency__name'>Количество пересадок</p>

          {this.props.choise.map(item => {
            return (
              <div className='check' key={item.name}>
                <input
                  name={item.name}
                  className='stops__checked'
                  type='checkbox'
                  id={item.id}
                  checked={item.checked}
                  onChange={() => this.props.onHandleChange(item.value)}
                />
                <label className='stops__label' htmlFor={item.id}>
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Filters;
