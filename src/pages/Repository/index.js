import React, { Component } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default class Repository extends Component{

  async componentDidMount(){
    const {match} = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    // usando desestruturação
    // as posiçoes do array abaixo correspondem as possições que o array
    // da promise retorna.
    // Promise.all - serve para fazer multiplas requisições, sem esperar
    // uma acabar para começar outra
    const [ repository, issues ] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`)
    ]);

    console.log(repository);
    console.log(issues);
  }

  render(){
    return (
      <h1>Repository:</h1>
    );
  }
};
