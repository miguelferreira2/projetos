import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

class NewDrugForm extends React.Component {
    state = {
      id: 0,
      name: "",
      price: 0.0,
      alternative: "",
    };

    compinentDidMount() {
        if (this.props.drug) {
            const { id, name, price, alternative} = this.props.drug;
            this.setState({ id, name, price, alternative});
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    };

    createDrug = e => {
        e.preventDefault();

        axios.post()
    }
}