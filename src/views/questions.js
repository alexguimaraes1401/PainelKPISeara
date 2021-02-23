import React, { Component } from "react";

var names = ['Jake', 'Jon', 'Thruster'];
var namesList = names.map(function (name) {
    return <li>{name}</li>;
})

function Questions() {
    return (<ul>{namesList}</ul>)
}

export default Questions;