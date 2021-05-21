import React, { Component } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import './AddTask.css';
import {options_cities, options_categorie, options_frequency} from '../../Values';

const style = {
  control: base => ({
    ...base,
    border: 0,
    boxShadow: "none"
  })
};

class AddTask extends Component {
    state = {
        categorie: '',
        status: 'ongoing',
        task_name: '',
        frequency: '',
        city: '',
        price: null,
        phone: '',
        description: ''
    }

    isDataValid = () => {
        if (this.state.categorie !== '' && this.state.task_name !== '' && this.state.city !== '' && this.state.phone !== '') {
            return true;
        } else {
            return false;
        }
    }

    clickHandler = (event) => {
        event.preventDefault();
        const body = {
            task_name: this.state.task_name, 
            status: this.state.status, 
            categorie: this.state.categorie.label, 
            frequency: this.state.frequency.label, 
            city: this.state.city.label, 
            price: Number(this.state.price), 
            phone: this.state.phone,
            description: this.state.description
        }
        console.log(body)
        fetch('http://localhost:2121/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify(body),
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            this.props.history.push("/my-tasks");
        })
    }

    changeCategoryHandler = (newCategory) => {
        this.setState({categorie: newCategory})
    }

    changeTaskNameHandler = (event) => {
        this.setState({task_name: event.target.value})
    }

    changeCityHandler = (newCity) => {
        this.setState({city: newCity})
    }

    changeFrequencyHandler = (newFrequency) => {
        this.setState({frequency: newFrequency})
    }

    changePriceHandler = (event) => {
        this.setState({price: event.target.value})
    }

    changePhoneHandler = (event) => {
        this.setState({phone: event.target.value})
    }

    changeDescriptionHandler = (event) => {
        this.setState({description: event.target.value})
    }

    render() {
        let isActive = this.isDataValid()
        return (
            <div className="wrapper" >
                <div className="arrow">
                <Link to="/user-choice">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.27702 11.3338H19.3334C19.7015 11.3338 20 11.6322 20 12.0004C20 12.3686 19.7015 12.667 19.3334 12.667H6.27702L10.4727 16.8614C10.7334 17.122 10.7334 17.5447 10.4727 17.8053C10.2121 18.066 9.78944 18.066 9.52878 17.8053L4.19584 12.4724C4.07046 12.3473 4 12.1775 4 12.0004C4 11.8233 4.07046 11.6535 4.19584 11.5284L9.52878 6.19551C9.6974 6.02689 9.94316 5.96104 10.1735 6.02276C10.4038 6.08448 10.5837 6.26439 10.6455 6.49472C10.7072 6.72506 10.6413 6.97082 10.4727 7.13944L6.27702 11.3338Z" fill="#121924"/>
                        </svg>
                </Link>
                </div>
                <h1 className="page_title">Add Task</h1>
                <Link to='/my-tasks'className="my_tasks_button">My Tasks</Link>
                <h2 className="page_post_title">Please fill the form below</h2>
                <Select name="Categorie" value={this.state.categorie} placeholder="Category *" styles={style} className="registration_input input select" options={options_categorie} onChange={this.changeCategoryHandler} />
                <input name="TaskName" value={this.state.task_name} placeholder="Title *" className="registration_input input" onChange={this.changeTaskNameHandler}></input><br/>
                <Select name="CityOfTask" value={this.state.city}  placeholder="Location *" styles={style} className="registration_input input select" options={options_cities} onChange={this.changeCityHandler}/>
                <Select name="FrequencyOfServices" value={this.state.frequency}  placeholder="Frequency of Services" styles={style} className="registration_input input select" options={options_frequency} onChange={this.changeFrequencyHandler}/>
                <input name="PricePerHour" value={this.state.price}  placeholder="Price per hour, NIS" className="registration_input input" onChange={this.changePriceHandler}></input><br/>
                <input name="Phone" value={this.state.phone}  placeholder="Phone *" className="registration_input input" onChange={this.changePhoneHandler}></input><br/>
                <textarea name="AboutTask" value={this.state.description} placeholder="About task" className="textarea" onChange={this.changeDescriptionHandler}></textarea>
                <button className="adder" disabled={!isActive} onClick={isActive ? this.clickHandler : null}>Next</button>
            </div>
        )
    }
}

export default AddTask;