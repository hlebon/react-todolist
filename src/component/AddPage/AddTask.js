import React from 'react'

class AddTask extends React.Component{
    state = {
        title: "",
        description: ""
    }

    handleAddTask = () => {
        this.props.onAddTask({
            title: this.state.title,
            description: this.state.description
        })
    }

    render(){
        return(
            <form onSubmit={this.handleAddTask} className="container">
                <h1>Add Task</h1>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} id="title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea value={this.state.descripcion}  onChange={(e) => this.setState({description: e.target.value})} id="description" className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default AddTask