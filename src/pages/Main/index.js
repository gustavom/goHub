import React, { Component } from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

export default class Main extends Component{

  state={
    newRepo:''
  }

  render(){
    return (
      <Container>
        <h1>
          <FaGithubAlt/>
          Repositórios
        </h1>
        <Form onSubmit={() =>{}}>
          <input
            type="text"
            placeholder="Adicionar repo"
          />

          <SubmitButton>
            <FaPlus color="#fff" size={14} />
          </SubmitButton>
        </Form>
      </Container>
      )
  }
};
