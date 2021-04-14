import React from 'react';
import 'primeicons/primeicons.css'
import Api from '../api/userApi'

const registerTexts = {
    // SelectRole: "Select a role",

}

class ListUserJxs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           users = []
        };
        // this.toast = React.createRef();
        // this.handleInputChange = this.handleInputChange.bind(this);
    }
    getUsers(event) {
        Api.get(user).then(r => {

        }).catch(e => {
     
        }).finally(() => {
         
        })
    }

    render() {
        const hi = "h1";
        return (
            <div> {hi} </div>
        );
    }
}

const ListUsers = () => {
    return <ListUserJxs />
};

export default ListUsers;