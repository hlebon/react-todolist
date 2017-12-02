import React from 'react'
import { Link } from 'react-router-dom'

class AddTask extends React.Component{
    state = {
        title: "",
        description: ""
    }

    handleAddTask = () => {
        console.log("New Task")
        this.props.addTask({
            title: this.state.title,
            description: this.state.description
        })
    }

    render(){
        return(
            <form onSubmit={() => this.handleAddTask()} className="cflex-column">
                <div className="form-group">
                    <h1 className="title">Add Task</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input value={this.state.title} type="text"
                        onChange={(e) => this.setState({title: e.target.value})} 
                        id="title"
                        className="form-control"
                        placeholder="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea value={this.state.descripcion} 
                        onChange={(e) => this.setState({description: e.target.value})} 
                        id="description"
                        className="form-control"
                        placeholder="Description" />
                </div>
                <div className="form-group">
                    <Link to="/" className="btn btn-secondary">
                        <span>Back</span>
                    </Link>
                    <button className="btn" type="submit">
                        <span>Create</span>
                    </button>
                </div>
            </form>
        )
    }
}

export default AddTask